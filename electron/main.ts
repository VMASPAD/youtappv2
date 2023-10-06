import { app, BrowserWindow, dialog, Menu } from 'electron';
import path from 'node:path';

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
// Display native system dialogs for opening and saving files, alerting, etc.
//
// For more info, see:
// https://electronjs.org/docs/api/dialog

function testDialog() {
  return new Promise((resolve, reject) => {
    app.whenReady().then(() => {
      const mainWindow = new BrowserWindow({ height: 600, width: 600 });

      // Show an "Open File" dialog and attempt to open
      // the chosen file in our window.
      dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
      })
        .then((result) => {
          if (result.canceled) {
            console.log('Dialog was canceled');
            resolve(null); // Resuelve con null si se cancela el diálogo
          } else {
            const fileUrlDir = result.filePaths[0];
            console.log(fileUrlDir);
            mainWindow.loadURL(`file://${fileUrlDir}`);
            resolve(fileUrlDir); // Resuelve con la ruta del archivo seleccionado
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err); // Rechaza la promesa en caso de error
        });
    });
  });
}

export { testDialog };

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, 
      contextIsolation: false,
      webSecurity: false,// Habilitar Node.js en el proceso de renderizado
    },
  });

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }

  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'Hello From Electron!',
      submenu: [
        {
          label: 'I have a custom handler',
          click () {
            testDialog()
          }
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

