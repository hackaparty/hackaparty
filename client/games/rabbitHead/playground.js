import controller from '../controller'
import bunnyImage from './images/pony-icon.png'
import targetDummyA from './images/target-dummy-red.png'
import targetDummyB from './images/target-dummy-blue.png'
import playground from '../playground'


var width = 2000;
var height = 2000;
var radius = 600;
var angleA = 0;
var angleB = 180;
var angleDelta = 0.5;
var figureSize = 200;
var targetSize = 200;


class rabbitHead extends playground {
  constructor() {
    super()
  }

  initDisplay() {
    var app = new PIXI.Application(width, height, {backgroundColor: 0x1099bb});
    document.body.appendChild(app.view);

    // create a new Sprite from an image path
    this.bunny = PIXI.Sprite.fromImage(bunnyImage)
    this.bunny.width = figureSize;
    this.bunny.height = figureSize;

    
    this.goalTeamA = PIXI.Sprite.fromImage(targetDummyA)
    this.goalTeamA.width = targetSize;
    this.goalTeamA.height = targetSize;
    
    this.goalTeamB = PIXI.Sprite.fromImage(targetDummyB)
    this.goalTeamB.width = targetSize;
    this.goalTeamB.height = targetSize;
    

    // center the sprite's anchor point
    this.bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    this.bunny.x = width / 2;
    this.bunny.y = app.screen.height / 2;

    this.goalTeamA.x = width - 200;
    this.goalTeamA.y = app.screen.height / 2;
    
    this.goalTeamB.x = 200;
    this.goalTeamB.y = app.screen.height / 2;

    app.stage.addChild(this.bunny);
    app.stage.addChild(this.goalTeamA);
    app.stage.addChild(this.goalTeamB);


    // Listen for animate update
    app.ticker.add(function (delta) { 
      angleA += angleDelta
      angleB += angleDelta; 

      this.goalTeamA.x = width / 2 + radius * Math.cos(angleA * Math.PI / 180);
      this.goalTeamA.y = height / 2 + radius * Math.sin(angleA * Math.PI / 180);

      this.goalTeamB.x = width / 2  + radius * Math.cos(angleB * Math.PI / 180);
      this.goalTeamB.y = height / 2 + radius * Math.sin(angleB * Math.PI / 180);
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
    //  this.goalTeamA.x = 50
      this.bunny.rotation += 0.03 * delta;

      var redTeamWon = this.detectCollition(this.goalTeamA, this.bunny);
      var blueTeamWon = this.detectCollition(this.goalTeamB, this.bunny);
      
      this.informWinner(blueTeamWon, redTeamWon);

   //   this.detectCollition(this.goalTeamB, this.bunny);
    }.bind(this));
  }
    informWinner(blueTeamWon, redTeamWon){
      if (blueTeamWon)
      {
      alert("Blue team won");
      blueTeamWon = false;
      }
      else if (redTeamWon){
      alert("Red team won");
      redTeamWon = false;
      }
    }

  detectCollition(objA,objB) {
    if (objA.x < objB.x + objB.width &&
      objA.x + objA.width > objB.x &&
      objA.y < objB.y + objB.height &&
      objA.height + objA.y > objB.y) {
        return true;
   }
   return false;
  }

  receiveMessage(message) {
    let dir = JSON.parse(message.data).message;;
    if(dir === 'left'){
      if(this.bunny.x>0) {
        this.bunny.x -= 6;
      }
    }
    else if(dir === 'right'){
      if(this.bunny.x < width) {
        this.bunny.x += 6;
      }
    }
    else if(dir === 'up'){
      if(this.bunny.y > 0) {
        this.bunny.y -= 6;
      }
    }
    else if(dir === 'down'){
      if(this.bunny.y < height) {
        this.bunny.y += 6;
      }
    }
  }
}

export default  rabbitHead