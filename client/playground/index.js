import bunnyImage from './bunny.png'

var exampleSocket = new WebSocket("ws://" + location.hostname + ":3001/playground");
exampleSocket.onopen = function () {
  exampleSocket.send('Ping'); // Send the message 'Ping' to the server
};
exampleSocket.onmessage = function (e) {
  console.log(e.data);
  if(e.data === 'left'){
    bunny.x -= 10;
  }
  else if(e.data === 'right'){
    bunny.x += 10;
  }
  else if(e.data === 'up'){
    bunny.y -= 10;
  }
  else if(e.data === 'down'){
    bunny.y += 10;
  }
};

var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

// create a new Sprite from an image path
var bunny = PIXI.Sprite.fromImage(bunnyImage)

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

// Listen for animate update
app.ticker.add(function(delta) {
  // just for fun, let's rotate mr rabbit a little
  // delta is 1 if running at 100% performance
  // creates frame-independent transformation

  bunny.rotation += 0.1 * delta;
});