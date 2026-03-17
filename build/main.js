'use strict';
const utils = require('@iobroker/adapter-core');
function toNumber(val){ if (val === null || val === undefined) return 0; return Number(String(val).replace(',', '.')); }
class Poolsteuerung extends utils.Adapter {
  constructor(options={}){ super({...options,name:'poolsteuerung'}); this.on('ready',this.onReady.bind(this)); }
  calcVolume(){ const d=toNumber(this.config.poolDiameterM); const h=toNumber(this.config.poolWaterHeightM); if(!d||!h) return 0; return Number((Math.PI*Math.pow(d/2,2)*h).toFixed(2)); }
  async onReady(){ const v=this.calcVolume(); this.log.info('poolsteuerung 0.2.6-clean started'); this.log.info('Berechnetes Poolvolumen: '+v+' m3'); }
}
if(require.main!==module){ module.exports=options=>new Poolsteuerung(options); } else { (()=>new Poolsteuerung())(); }
