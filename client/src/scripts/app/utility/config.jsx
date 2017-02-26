import store from '../store/store.jsx';
import ErrUtility from './error.jsx';

const fs = require('fs');

class ConfigUtility {
    constructor() {
        this.base_addr = './app';

        this.readConfig = this.readConfig.bind(this);
        this.writeConfig = this.writeConfig.bind(this);
    }

    readConfig() {
        let config;
        try {
            config = fs.readFileSync(this.base_addr + '/app.json', 'utf8');
            config = JSON.parse(config);
        } catch (err) {
            ErrUtility.throwErrorGen(err);
        }
        return config;
    }

    writeConfig(config) {
        config = JSON.stringify(config);
        try {
            fs.writeFileSync(this.base_addr + '/app.json', config);
        } catch (err) {
            ErrUtility.throwErrorGen(err);
        }
    }
}

let ConfigUtilityApp = new ConfigUtility();

export default ConfigUtilityApp;