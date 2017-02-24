const {app, BrowserWindow, dialog} = require('electron');
const path = require('path');
const url = require('url');

let win

function CreateWindow() {
    win = new BrowserWindow({
        width: 960,
        height: 600
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'client/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.webContents.openDevTools();

    win.setMenu(null);

    win.on('closed', () => {
        win = null
    });

    // console.log(dialog.showOpenDialog({properties: ['openFile', 'multiSelections']}))
}

app.on('ready', CreateWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});