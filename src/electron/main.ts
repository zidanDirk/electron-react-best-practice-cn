import { app, BrowserWindow, Menu } from 'electron'
import { ipcMainHandle, isDev } from './util.js'
import { getStaticData, pollResourse } from './resourceManager.js'
import { getPreloadPath, getUIPath } from './pathResolver.js'
import { createTray } from './tray.js'
import { createMenu } from './menu.js'


Menu.setApplicationMenu(null);

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        }
    })
    if(isDev()) {
        mainWindow.loadURL("http://localhost:5123")
    } else {
        mainWindow.loadFile(getUIPath())
    }

    pollResourse(mainWindow)

    ipcMainHandle("getStaticData", () => {
        return getStaticData()
    });

    createTray(mainWindow)

    handleCloseEvents(mainWindow);

    createMenu(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
    let willClose  =false;
    mainWindow.on("close", (e) => {
        if(willClose) {
            return
        }
        e.preventDefault();
        mainWindow.hide()
        if(app.dock) {
            app.dock.hide()
        }
    });

    app.on('before-quit', () => {
        willClose = true;
    });

    mainWindow.on("show", () => {
        willClose = false;
    })
}

