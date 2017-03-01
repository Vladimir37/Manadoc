const {app, dialog} = require('electron').remote;

class ErrorUtility {
    constructor() {
        this.throwErrorGen = this.throwErrorGen.bind(this);
        this.throwUncriticalErrorGen = this.throwUncriticalErrorGen.bind(this);
        this.throwUncriticalError = this.throwUncriticalError.bind(this);
        this.generateText = this.generateText.bind(this);
    }

    throwErrorGen(err) {
         var windowOprtions = {
            type: 'error',
            buttons: ['OK'],
            message: this.generateText(err)
        };
        dialog.showMessageBox(windowOprtions);
        app.exit(1);
    }

    throwTabError(text) {
        var windowOprtions = {
            type: 'error',
            buttons: ['OK'],
            message: text
        };
        dialog.showMessageBox(windowOprtions);
        // TODO - закрытие вкладки
    }

    throwUncriticalErrorGen(err) {
        var windowOprtions = {
            type: 'error',
            buttons: ['OK'],
            message: this.generateText(err)
        };
        dialog.showMessageBox(windowOprtions);
    }

    throwUncriticalError(text) {
        var windowOprtions = {
            type: 'error',
            buttons: ['OK'],
            message: text
        };
        dialog.showMessageBox(windowOprtions);
    }

    generateText(err) {
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