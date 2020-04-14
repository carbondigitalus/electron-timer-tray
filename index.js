// Core Modules
const path = require('path');

// NPM Modules
const electron = require('electron');

// Custom Modules
const TrayIcon = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

// Variables
const { app, ipcMain } = electron;
let mainWindow;
let trayIcon;

app.on('ready', () => {
  // hide taskbar or dock icon
  app.dock.hide();
  // create new window
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  trayIcon = new TrayIcon(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
  trayIcon.setTitle(timeLeft);
});
