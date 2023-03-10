'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const odbc = require('odbc')
const moment = require('moment')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 450,
    height: 640,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// FUNCION QUE GUARDA LOS DATOS EN LAS TABLAS DE ACCESS

async function queryAccess(datos) {

  if (datos.cargo == 'pastor') {

    try {
      // let IDCPhotoField1 = datos.foto
      let IDCNOMBRES = datos.nombres
      let IDCAPELLIDOS = datos.apellidos
      let IDCTextField1 = datos.iglesia // nombre de iglesia
      let IDCTextField2 = datos.pais
  
      const connection = await odbc.connect(`DSN=carnets_pastores`);
      
      await connection.query(`
                      insert into IDProjectData 
                          (IDCNOMBRES, IDCAPELLIDOS, IDCTextField1, IDCTextField2) 
                          values
                              ('${IDCNOMBRES}', '${IDCAPELLIDOS}', '${IDCTextField1}', '${IDCTextField2}')
                          `);
  
      //await connection.close();
      
    } catch (error) {
      const dialogOpts = {
        type: 'info',
        buttons: ['Entendido'],
        title: 'Error',
        message: `Error`,
        detail: error
      }

      dialog.showMessageBox(dialogOpts).then(({ response }) => {
        if (response === 0) {
          
        }
      })
    }


  }else{

    try {
      
      // let IDCPhotoField1 = datos.foto
      let IDCNOMBRE = datos.nombres
      let IDCAPELLIDO = datos.apellidos
      let IDCDEPARTAMENT = datos.iglesia // nombre de iglesia
      let IDCPAIS = datos.pais
  
      const connection = await odbc.connect(`DSN=carnets_obreros`);
      
      await connection.query(`
                      insert into IDProjectData 
                          (IDCNOMBRE, IDCAPELLIDO, IDCDEPARTAMENT, IDCPAIS) 
                          values
                              ('${IDCNOMBRE}', '${IDCAPELLIDO}', '${IDCDEPARTAMENT}', '${IDCPAIS}')
                          `);
  
      //await connection.close();
    } catch (error) {
      const dialogOpts = {
        type: 'info',
        buttons: ['Entendido'],
        title: 'Error',
        message: `Error`,
        detail: error
      }

      dialog.showMessageBox(dialogOpts).then(({ response }) => {
        if (response === 0) {

        }
      })
    }

  }

}




ipcMain.handle('informacion', async(event, args)=>{
  
  //console.log(args)
  await queryAccess(args)
  return {message: 'Datos guardados!'}
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
