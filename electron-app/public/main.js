/* eslint-disable promise/catch-or-return */
/* eslint-disable no-param-reassign */
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    // width: 1024,
    // height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    icon: './favicon.ico'
  });

  if (isDev) {
    win.loadURL('http://localhost:3000/');
  } else {
    win.loadURL(`file://${__dirname}/index.html`);
  }

  // wait until webpack build html page
  win.webContents.on('did-finish-load', () => {
    win.maximize();
    win.show();
    win.focus();
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
    win = null;
  });
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('get-result', (event, arg) => {
  event.returnValue = `electron-${arg.name}`;
});
