import osUtils from 'os-utils';
import fs from 'fs'
import os from 'os'
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './util.js';

const POLLING_INTERVAL = 500;

export function pollResourse(mainWindow: BrowserWindow) {
    setInterval(async () => {
        const cupUsage = await getCpuUsage()
        const ramUsage = getRamUsage()
        const storageData = getStorageData()
        ipcWebContentsSend("statistics", mainWindow.webContents , {
                cupUsage,
                ramUsage,
                storageData: storageData.usage
            })
        console.log({cupUsage, ramUsage, storageData: storageData.usage})
    }, POLLING_INTERVAL)
}

export function getStaticData () {
    const totalStorage = getStorageData().total;
    const cupModel = os.cpus()[0].model
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);
    return {
        totalStorage,
        cupModel,
        totalMemoryGB
    }
}

function getCpuUsage (): Promise<number> {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve)    
    })
}

function getRamUsage() {
    return 1- osUtils.freememPercentage()
}

function getStorageData() {
    // 需要 node 18
    const stats = fs.statfsSync(process.platform === 'win32' ? "C://": "/");
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree
    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1- free/total
    }
}