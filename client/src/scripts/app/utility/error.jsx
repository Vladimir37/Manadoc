const {app, dialog} = require('electron').remote;
// const app = require('electron').remote.app;
// const dialog = require('electron').remote.dialog;

class ErrorUtility {
    constructor() {
        this.throwError = this.throwError.bind(this);
        this.generateText = this.generateText.bind(this);
    }

    throwError(err) {
         var windowOprtions = {
            type: 'error',
            buttons: ['OK'],
            message: this.generateText(err)
        };
        dialog.showMessageBox(windowOprtions);
        app.exit(1);
    }

    generateText(err) {
        console.log(app);
        switch (err.code) {
            case 'ENOENT':
                return 'File not found: ' + err.path;
            default:
                return err.message || JSON.stringify(err);
        }
    }
}

let ErrorUtilityApp = new ErrorUtility();

export default ErrorUtilityApp;