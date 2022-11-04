const { app, BrowserWindow, Tray, Menu, Notification } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // frame: false,
    // transparent: true,
    // backgroundColor: "#fff", // 窗口的背景颜色为十六进制值
    // titleBarStyle: "hidden", //窗口标题栏的样式 (no support linux)
    //网页功能的设置
    // devTools: true, //是否开启 DevTools
    // webSecurity: false//是否禁用同源策略
    width: 1200,
    height: 800,
    center: true, // 是否出现在屏幕居中的位置
    useContentSize: true,
    frame: true, //设置为 false 时可以创建一个无边框窗口
    resizable: true, //窗口是否可以改变尺寸
    autoHideMenuBar: true, //是否隐藏菜单栏
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      // preload: path.join(__dirname, "notify.js"),
    },
  });

  const NOTIFICATION_TITLE = "neotw-app";
  const NOTIFICATION_BODY = "🛸 Hello, neotw-app";

  function showNotification() {
    new Notification({
      title: NOTIFICATION_TITLE,
      body: NOTIFICATION_BODY,
    }).show();
  }

  const trayMenuTemplate = [
    {
      label: " open",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: " exit",
      click: () => {
        app.quit();
        app.quit(); //因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      },
    },
  ];

  function traysetup() {
    let tray = null;
    tray = new Tray("static/images/icon.ico");
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    tray.setContextMenu(contextMenu);
  }

  app.whenReady().then(traysetup).then(showNotification);

  // and load the index.html of the app.
  // mainWindow.loadURL("https://bing.com");
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  const INCREMENT = 0.03;
  const INTERVAL_DELAY = 100; // ms

  /* let c = 0;
  progressInterval = setInterval(() => {
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    mainWindow.setProgressBar(c);

    // increment or reset progress bar
    if (c < 2) {
      c += INCREMENT;
    } else {
      c = -INCREMENT * 5; // reset to a bit less than 0 to show reset state
    }
  }, INTERVAL_DELAY); */

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
