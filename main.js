// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')

const fs = require('fs')

const getConfig = () => {
  let path = app.getAppPath()
  console.log(path)
  let configPath = `${path}/config.json`

  let config

  try {
    config = JSON.parse(fs.readFileSync(configPath))
  } catch (e) {
    config = null
  }

  if (!config) {
    config = {
      WINDOW_WIDTH: 1000,
      WINDOW_HEIGHT: 300,
    
      KEY_START: 'CommandOrControl+1',
      KEY_PAUSE: 'CommandOrControl+2',
      KEY_RESET: 'CommandOrControl+3',
      KEY_CANCEL: 'CommandOrControl+4'
    }
  }

  fs.writeFileSync(configPath, JSON.stringify(config, ' ', 2))

  return config
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  let CONFIG = getConfig()

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: CONFIG.WINDOW_WIDTH,
    height: CONFIG.WINDOW_HEIGHT,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('html/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  globalShortcut.register(CONFIG.KEY_START, () => {
    console.log('START')
    mainWindow.webContents.send('timerControl', 'START')
  })

  globalShortcut.register(CONFIG.KEY_PAUSE, () => {
    console.log('PAUSE')
    mainWindow.webContents.send('timerControl', 'PAUSE')
  })

  globalShortcut.register(CONFIG.KEY_RESET, () => {
    console.log('RESET')
    mainWindow.webContents.send('timerControl', 'RESET')
  })

  globalShortcut.register(CONFIG.KEY_CANCEL, () => {
    console.log('CANCEL')
    mainWindow.webContents.send('timerControl', 'CANCEL')
  })

  // 调试
  // mainWindow.webContents.openDevTools()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
