// NPM Modules
const electron = require('electron');

// Variables
const { Tray, app, Menu } = electron;

// create class
class TrayIcon extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;
    this.setToolTip('Timer App');
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  }

  onClick(event, bounds) {
    // capture click event bounds
    const { x, y } = bounds;
    // capture window current bounds
    const { height, width } = this.mainWindow.getBounds();
    // on click show and hide the mainWindow
    if (this.mainWindow.isVisible() === true) {
      this.mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;
      // dynamically inject trayIcon placement on OSX
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width
      });
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => {
          app.quit();
        }
      }
    ]);
    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TrayIcon;
