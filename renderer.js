// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

require('electron').ipcRenderer.on('timerControl', (evt, msg) => {
  console.log(msg)
  if (msg == 'START') {
    window.TIMER.startOrEnd()
  }
  if (msg == 'PAUSE') {
    window.TIMER.pause()
  }
  if (msg == 'RESET') {
    window.TIMER.reset()
  }
  if (msg == 'CANCEL') {
    window.TIMER.cancel()
  }
})