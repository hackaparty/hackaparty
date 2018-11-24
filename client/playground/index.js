import example from './example/example'
import reaction from './reaction/reaction'

let currentGame = reaction;

var exampleSocket = new WebSocket("ws://" + location.hostname + ":3001/playground");
exampleSocket.onopen = function () {
  exampleSocket.send('Ping'); // Send the message 'Ping' to the server
};
exampleSocket.onmessage = function (msg) {
  currentGame.onmessage(msg)
};

currentGame.run();