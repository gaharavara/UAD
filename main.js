const electron = require('electron');

const url = require('url');
const path = require('path');
const fs = require('fs');
const {app, BrowserWindow} = electron;
const ipc = require('electron').ipcMain;

const express = require('express');
const app = express();
const http = require("http");

app.getAppMetrics("/", function(req, res){
    
})

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // Base html doc
    mainWindow.loadFile('public/index.html')
    mainWindow.removeMenu();

}

app.on('ready', createWindow)
