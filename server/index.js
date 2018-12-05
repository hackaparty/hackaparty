const express = require('express');
const WebSocket = require('ws');
const QRCode = require('qrcode');
const app = express();
const GamesServer = require('./server');
const ip = require("ip");
var favicon = require('serve-favicon');
var path = require('path');

let gamesServer = null;

const getGamesServer = (ws) => {
    if(gamesServer) {
        gamesServer.reconnect(ws)
    } else {
        gamesServer = new GamesServer(ws)
    }
}

if(process.argv[2] == undefined) {
//  throw new Error('Must pass URL to login page');
}

global.users = [];
global.teams = [];



//initialize the WebSocket server instance
const wss = new WebSocket.Server({port: 3001});
let server;

wss.on('connection', (ws, req) => {

    if(req.url === '/playground'){
      getGamesServer (ws)
  }
  else if(req.url === '/controller') {
      if(gamesServer){
          gamesServer.addControllerSocket(ws);
      }
  }
  else if(req.url === '/startup') {

  }
  else {
    console.log("Unknown WS connection URL: " + req.url);
    ws.destroy();
  }
});


'use strict';


app.use('/controller', express.static('controller'));
app.use('/playground', express.static('playground'));
app.use('/startup',    express.static('client/startup'));

app.use('/qrcode.png', function(req, resp) {
    resp.type("png");
    QRCode.toFileStream(resp, getUrl(), {
      scale: 10
    });
});

const url = getUrl()
console.log('Startup and show QR-Code at: ' + url.replace(/login$/, 'startup'))
console.log('Login at: ' + url)

function getUrl() {
    let url = ''
    if(process.argv[2] !== 'local') {
	    url =  process.argv[2]
    } else {
	    const address = ip.address()
	    url = `http://${address}:8080/login`
    }

    return url
}

var login = require('./login');
login.setWS(wss);
app.use('/login', login.router);

app.use(favicon(path.join(__dirname, 'favicon.ico')));


app.listen(3000, function(){
  console.log('Listening for websocket connections on port 3000.');
});
