const electron = require("electron")

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics: (callback) =>{
        electron.ipcRenderer.on("statistics", (_, data) => {
            callback(data)
        })
        
    },
    getStaticData: () => electron.ipcRenderer.invoke('getStaticData')
} satisfies Window['electron'])