const ipc = require('electron').ipcRenderer;
const fs = require('fs');
// To play selected videos

(function localFileVideoPlayer() {
    'use strict'
    var URL = window.URL || window.webkitURL
    var displayMessage = function (message, isError) {
        var element = document.querySelector('#message')
        element.innerHTML = message
        element.className = isError ? 'error' : 'info'
    }
    var playSelectedFile = function (event) {
    var file = this.files[0]
    var path = this.files[0].path;
    console.log(path);

    //Ping main process
    console.log(ipc.send('send-path', path));
    
    var type = file.type
    var videoNode = document.querySelector('video')
    var canPlay = videoNode.canPlayType(type)
    if (canPlay === '') canPlay = 'no'
    var message = 'Can play type "' + type + '": ' + canPlay
    var isError = canPlay === 'no'
    displayMessage(message, isError)

    if (isError) {
    return
    }

    var fileURL = URL.createObjectURL(file)
    videoNode.src = fileURL
    }
    var inputNode = document.querySelector('input')
    inputNode.addEventListener('change', playSelectedFile, false)   
})()


/*


const {dialog} = require('electron').remote;
console.log("Inside renderer");
document.querySelector('#upload').addEventListener('click', function (event) {
    console.log(dialog);
    dialog.showOpenDialog(function(filenames){
        if(filenames == undefined){
            console.log("Undefined file");
        } else {
            console.log("Success");
        }
    });
});


*/


const buttonCreated = document.getElementById('upload');

buttonCreated.addEventListener('click', function (event) {
    console.log("Button Clicked")
    ipc.send('open-file-dialog-for-file')
});

ipc.on('selected-file', function (event, path) {
    console.log('Full path: ', path);
});