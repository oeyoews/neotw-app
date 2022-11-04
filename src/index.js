const { app, BrowserWindow, Tray, Menu } = require("electron");
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
    width: 1200,
    height: 800,
    center: true, // 是否出现在屏幕居中的位置
    useContentSize: true,
    frame: true, //设置为 false 时可以创建一个无边框窗口
    resizable: true, //窗口是否可以改变尺寸
    autoHideMenuBar: true, //是否隐藏菜单栏
    // backgroundColor: "#fff", // 窗口的背景颜色为十六进制值
    titleBarStyle: "hidden", //窗口标题栏的样式
    //网页功能的设置
    // devTools: true, //是否开启 DevTools
    // webSecurity: false//是否禁用同源策略
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadURL("https://bing.com");
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

let tray = null;
app.whenReady().then(() => {
  var trayMenuTemplate = [
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

  tray = new Tray("static/images/icon.ico");
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  /* const contextMenu = Menu.buildFromTemplate([
    { label: "Item2", type: "radio" },
    {
      label: "exit",
      click: () => {
        win.destroy();
      },
    },
  ]); */
  // contextMenu.items[1].checked = false;
  tray.setContextMenu(contextMenu);
  tray.setToolTip("neotw-app");
});

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
