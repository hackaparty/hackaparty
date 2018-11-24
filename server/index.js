const express = require('express');
const WebSocket = require('ws');
const QRCode = require('qrcode');
const app = express();

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
  else {
    ws.destroy();
  }
});


app.use('/controller', express.static('controller'));
app.use('/playground', express.static('playground'));
app.use('/startup',    express.static('startup'));

app.use('/qrcode.png', function(req, resp) {
    resp.type("png");
    QRCode.toFileStream(resp, 'I am a pony!', {
      scale: 10
    });
});


app.listen(3000, function(){
  console.log('Listening on port 3000.');
});
