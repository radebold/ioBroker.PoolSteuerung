
class HeatpumpController {
  constructor(adapter){ this.adapter=adapter; }
  async tick(){
    if (!this.adapter.config.heatpumpEnabled) return;
  }
}
module.exports = { HeatpumpController };
