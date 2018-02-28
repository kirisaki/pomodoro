import { app, BrowserWindow } from 'electron' 

const createWindow = options => {
  return new Promise( ( resolve, _ ) => {
    app.on( 'ready', () => {
      const window = new BrowserWindow( options )
      resolve( window )
    } )
  } )
}

createWindow({width: 800, height: 600, frame: false})
  .then( window => {
      window.loadURL( `file://${__dirname}/index.html` )
} )
