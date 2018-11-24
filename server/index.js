const express = require('express');
const WebSocket = require('ws');
const QRCode = require('qrcode');
const app = express();

global.users = [];
global.teams = [];

//initialize the WebSocket server instance
const wss = new WebSocket.Server({port: 3001});
let server;

wss.on('connection', (ws, req) => {
  if(req.url === '/playground'){
    server = ws;
  }
  else if(req.url === '/controller') {
    ws.on('message', (message) => {
      if(server){
        server.send(`${message}`);
      }
    });
  }
  else if(req.url === '/startup') {
    server = ws;
    server.send("James");
  }
  else {
    ws.destroy();
  }
});


app.use('/controller', express.static('controller'));
app.use('/playground', express.static('playground'));
app.use('/startup',    express.static('client/startup'));

app.use('/qrcode.png', function(req, resp) {
    resp.type("png");
    QRCode.toFileStream(resp, process.argv[2], {
      scale: 10
    });
});

var login = require('./login');
login.setWS(wss);
app.use('/login', login.router);


app.listen(3000, function(){
  console.log('Listening on port 3000.');
});
