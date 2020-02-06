const electron = require('electron');

const url = require('url');
const path = require('path');
const fs = require('fs');
const os = require('os');
const {app, BrowserWindow} = electron;
const ipc = require('electron').ipcMain;
const {dialog} = require('electron')                 

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
        }
    })

    // Base html doc
    console.log("Loading index.html");
    mainWindow.loadFile('public/index.html')
    // Omit default menu bar
    mainWindow.removeMenu();
 
    // Waiting for the path of the video from the user
    ipc.on('send-path', (event, args) => {


        console.log("Request from GUI recieved." + args);
        
        // Passing path of the video/footage to python script
        var python = require('child_process').spawn('python', ['./yolo/realtime_detect.py', args], {shell: true, detached: true});
        console.log("args: ", args);

        // Recieving the output from python script
        python.stdout.on('data',function(data){
           console.log("data: ",data.toString('utf8'));
        });
    })

}


app.on('ready', createWindow)

