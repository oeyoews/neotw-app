const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  Notification,
  globalShortcut,
} = require("electron");
const path = require("path");

const BaseWebPreferences = {
  nodeIntegration: true,
  // preload: path.resolve(__dirname, "js/window.js"),
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: __dirname + "/static/images/user.png",
    title: "neotw-app",
    minHeight: 400,
    minWidth: 600,
    fullscreen: true,
    fullscreenable: true,
    // frame: false,
    titleBarStyle: "hiddenInset",
    show: true,
    width: 1200,
    height: 800,
    center: true, // 是否出现在屏幕居中的位置
    useContentSize: true,
    resizable: true, //窗口是否可以改变尺寸
    autoHideMenuBar: true, //是否隐藏菜单栏
    webPreferences: BaseWebPreferences,
  });

  const NOTIFICATION_TITLE = "neotw-app";
  const NOTIFICATION_BODY = "🛸 Hello, neotw-app";

  function vimElectron() {
    globalShortcut.register("ESC", function () {
      mainWindow.setFullScreen(false);
    });

    globalShortcut.register("Q", function () {
      mainWindow.setFullScreen(false);
    });

    globalShortcut.register("F", function () {
      if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
      } else {
        mainWindow.setFullScreen(true);
      }
    });
  }

  function showNotification() {
    new Notification({
      title: NOTIFICATION_TITLE,
      body: NOTIFICATION_BODY,
    }).show();
  }

  // vim shortcuts
  vimElectron();

  const trayMenuTemplate = [
    /* {
      label: "打开新窗口",
      click: () => {
        let child = new BrowserWindow({
          parent: BrowserWindow.getFocusedWindow(),
        });
        child.loadURL("https://electronjs.org");
        child.show();
      },
    }, */
    {
      label: " About",
      icon: __dirname + "/static/images/user.png",
      click: () => {},
    },
    {
      label: " Setup",
      icon: __dirname + "/static/images/icon.ico",
      click: () => {},
    },
    {
      label: " Toggle",
      icon: __dirname + "/static/images/contrast.png",
      // click: () => {
      //   mainWindow.show();
      // },
      click: function () {
        return mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      },
    },
    {
      label: " Exit",
      icon: __dirname + "/static/images/question-mark.png",
      click: () => {
        app.quit();
      },
    },
  ];

  function traysetup() {
    let tray = null;
    // tray = new Tray("static/images/icon.ico");
    tray = new Tray(path.join(__dirname, "/static/images/icon.ico"));
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    tray.setContextMenu(contextMenu);
  }

  // app.whenReady().then(traysetup).then(showNotification);
  app.whenReady().then(traysetup).then();

  // and load the index.html of the app.
  // mainWindow.loadURL("https://bing.com");
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
