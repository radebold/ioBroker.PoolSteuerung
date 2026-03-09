'use strict';

const utils = require('@iobroker/adapter-core');

class Poolsteuerung extends utils.Adapter {
    constructor(options) {
        super({ ...options, name: 'poolsteuerung' });
        this.on('ready', this.onReady.bind(this));
        this.on('unload', this.onUnload.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
    }

    async onReady() {
        this.log.info('PoolSteuerung adapter started');

        await this.setObjectNotExistsAsync('info.connection', {
            type: 'state',
            common: {
                name: 'If adapter is connected',
                type: 'boolean',
                role: 'indicator.connected',
                read: true,
                write: false,
                def: false
            },
            native: {}
        });

        await this.setStateAsync('info.connection', true, true);
    }

    onStateChange(id, state) {
        if (!state || state.ack) {
            return;
        }
        this.log.debug(`stateChange ${id} = ${JSON.stringify(state.val)}`);
    }

    onUnload(callback) {
        this.setState('info.connection', false, true, () => callback());
    }
}

if (require.main !== module) {
    module.exports = options => new Poolsteuerung(options);
} else {
    new Poolsteuerung();
}
