var fs = require('fs');

class ConfigUtility {
    constructor() {
        this.base_addr = './app';

        this.readConfig = this.readConfig.bind(this);
    }

    readConfig() {
        var config = JSON.parse(fs.readFileSync(this.base_addr + '/app.json', 'utf8'));
        return config;
    }
}

let ConfigUtilityApp = new ConfigUtility();

export default ConfigUtilityApp;