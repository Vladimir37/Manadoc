const fs = require('fs');
const dialog = require('electron').remote.dialog;

class ConfigUtility {
    constructor() {
        this.base_addr = './app';

        this.readConfig = this.readConfig.bind(this);
        this.writeConfig = this.writeConfig.bind(this);
    }

    readConfig() {
        var config = fs.readFileSync(this.base_addr + '/app.json', 'utf8');
        config = JSON.parse(config);
        return config;
    }

    writeConfig(config) {
        config = JSON.stringify(config);
        try {
            fs.writeFileSync(this.base_addr + '/app.json', config);
        } catch (err) {
            var windowOprtions = {
                type: 'error',
                buttons: ['OK'],
                message: JSON.stringify(err)
            };
            dialog.showMessageBox(windowOprtions);
        }
    }
}

let ConfigUtilityApp = new ConfigUtility();

export default ConfigUtilityApp;