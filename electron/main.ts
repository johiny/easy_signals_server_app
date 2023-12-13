import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import StartServer from '../src/api/index'
import { convertToBase64 } from '../src/api/utils/os'
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}




// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// sockets section
const {io} = StartServer()

ipcMain.on('get_screens', async (event, arg) => {
  updateSockets();
}
)

const updateSockets = async () => {
  let sockets = await io.fetchSockets()
  sockets = sockets.map(socket => socket.id)
  win?.webContents.send('screens_change', sockets)
}

io.on('connection',  async (socket) => {
  console.log('socket conectado', socket.id)
  await updateSockets()
  socket.on('disconnect', async () => {
    console.log('socket desconectado', socket.id)
    await updateSockets()
  })
})

ipcMain.on('send_file', (event, {screen_id, file}) => {
  io.to(screen_id).emit('file_change', file)
})

app.whenReady().then(createWindow)