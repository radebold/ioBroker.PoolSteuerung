
'use strict';

/*
 Basic starter adapter logic – integrate existing ioBroker scripts
 PH dosing + pump/chlorinator logic placeholders
*/

const utils = require('@iobroker/adapter-core');

class Poolsteuerung extends utils.Adapter {

    constructor(options) {
        super({ ...options, name: 'poolsteuerung' });
        this.on('ready', this.onReady.bind(this));
    }

    async onReady() {
        this.log.info('Poolsteuerung adapter started');

        // TODO integrate logic from scripts
    }
}

if (require.main !== module) {
    module.exports = (options) => new Poolsteuerung(options);
} else {
    new Poolsteuerung();
}
