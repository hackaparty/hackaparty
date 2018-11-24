import registerGyroskop from './controller.events.gyro'

var exampleSocket = new WebSocket("ws://" + location.hostname + ":3001/controller");
  exampleSocket.onopen = function () {
    exampleSocket.send('Ping'); // Send the message 'Ping' to the server
  };

  var elem = document.getElementById("play");
  registerGyroskop(exampleSocket);
/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
window.onOpenFullscreen =  function() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
