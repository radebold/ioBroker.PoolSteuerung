
const { hhmm, parseTimes } = require("../utils/time");
const { calcPoolVolumeL } = require("../utils/poolMath");
class PhController {
  constructor(adapter){ this.adapter=adapter; this.running=false; this.last={}; }
  calc(ph){
    const delta = Number(ph) - (Number(this.adapter.config.phTarget) || 7.2);
    if (isNaN(delta) || delta <= Number(this.adapter.config.phMinDelta || 0)) return { ml:0, sec:0, g:0 };
    const volumeL = calcPoolVolumeL(this.adapter.config.poolVolumeM3, this.adapter.config.poolDiameterM, this.adapter.config.poolWaterHeightM);
    const base = Math.max(0, delta * 10 * Math.max(0, volumeL / 100));
    const ml = Math.round(base * ((Number(this.adapter.config.phLiquidFactorPercent) || 100) / 100));
    const g = Math.round(base * ((Number(this.adapter.config.phGranulateFactorPercent) || 100) / 100));
    const sec = Math.min(Number(this.adapter.config.phMaxRuntimeSec) || 300, Math.round((ml / Math.max(0.1, Number(this.adapter.config.phPumpFlowMlMin) || 16)) * 60));
    return { ml, sec, g };
  }
  async preview(){
    const ph = await this.adapter.getForeignNumber(this.adapter.config.phStateId);
    if (ph === null) return;
    const r = this.calc(ph);
    await this.adapter.setStateAsync("status.ph.previewMl", r.ml, true);
    await this.adapter.setStateAsync("status.ph.previewRuntimeSec", r.sec, true);
    await this.adapter.setStateAsync("status.ph.previewGranulateG", r.g, true);
  }
  async tick(){
    if (!this.adapter.config.phEnabled || this.running) return;
    const now = hhmm();
    for (const t of parseTimes(this.adapter.config.phDoseTimes)) {
      if (t === now && !this.last[t]) {
        this.last[t] = Date.now();
        await this.dose(`Automatik ${t}`);
      }
    }
  }
  async dose(reason){
    const ph = await this.adapter.getForeignNumber(this.adapter.config.phStateId);
    if (ph === null) return;
    const rel = await this.adapter.getForeignBoolean(this.adapter.config.phDoseEnableStateId, true);
    if (!rel) return;
    const pump = await this.adapter.getForeignBoolean(this.adapter.config.circulationPumpSocketStateId, false);
    if (!pump && this.adapter.config.phOnlyWhenPumpRunning) return;
    const r = this.calc(ph);
    if (r.sec <= 0 || r.ml <= 0) return;
    this.running = true;
    await this.adapter.setForeignStateAsync(this.adapter.config.phPumpSocketStateId, true);
    await this.adapter.setStateAsync("status.ph.lastAction", `${reason} gestartet`, true);
    await this.adapter.setStateAsync("status.ph.lastDoseMl", r.ml, true);
    this.adapter.setTimeout(async () => {
      await this.adapter.setForeignStateAsync(this.adapter.config.phPumpSocketStateId, false);
      this.running = false;
      await this.adapter.setStateAsync("status.ph.lastAction", `${reason} beendet`, true);
    }, r.sec * 1000);
  }
}
module.exports = { PhController };
