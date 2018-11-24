import example from './example/example'

var exampleSocket = new WebSocket("ws://" + location.hostname + ":3001/playground");
exampleSocket.onopen = function () {
  exampleSocket.send('Ping'); // Send the message 'Ping' to the server
};
exampleSocket.onmessage = function (msg) {
  example.onmessage(msg)
};

example.run();