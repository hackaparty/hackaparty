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
var figureSize = 100;
var targetSize = 200;
var speed = 5;
var fontsize = 100;

var pointsA = 0;
var pointsB = 0;

class rabbitHead extends playground {
  constructor() {
    super()
  }

  initDisplay() {
    var app = new PIXI.Application(width, height, {backgroundColor: 0x1099bb});
    document.body.appendChild(app.view);

    app.renderer.backgroundColor = 0x2E2E2E;

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
    
    this.pointsAText = new PIXI.Text('0',{fontFamily : 'Arial', fontSize: fontsize, fill : 0xff1010, align : 'center'});
    this.pointsAText.x = width / 2 - fontsize / 2 - 20;
    this.pointsAText.y = 10;

    this.pointsBText = new PIXI.Text('0',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0000FF, align : 'center'});
    this.pointsBText.x = width / 2 + fontsize / 2 + 20;
    this.pointsBText.y = 10;

    // center the sprite's anchor point
    this.bunny.anchor.set(0.5);

    // move the sprite to the center of the screen

    this.resetToDefaultPositions(app);

    app.stage.addChild(this.bunny);
    app.stage.addChild(this.goalTeamA);
    app.stage.addChild(this.goalTeamB);
    app.stage.addChild(this.pointsAText);
    app.stage.addChild(this.pointsBText);


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
      
      this.informWinner(blueTeamWon, redTeamWon, app);

   //   this.detectCollition(this.goalTeamB, this.bunny);
    }.bind(this));
  }

    informWinner(blueTeamWon, redTeamWon, app){
      if (blueTeamWon)
      {
        blueTeamWon = false;
        pointsB++;
        this.pointsBText.setText(""+pointsB);
        this.resetToDefaultPositions(app); 
      }
      else if (redTeamWon){
        redTeamWon = false;
        pointsA++;
        this.pointsAText.setText(""+pointsA);
        this.resetToDefaultPositions(app); 
      }
    }

    resetToDefaultPositions(app){
      angleA = 0;
      angleB = 180;
      this.bunny.x = app.screen.width / 2;
      this.bunny.y = app.screen.height / 2;
      this.goalTeamA.x = width - 200;
      this.goalTeamA.y = app.screen.height / 2;
    
      this.goalTeamB.x = 200;
      this.goalTeamB.y = app.screen.height / 2;
    }

  detectCollition(objA, bunny) {
    var bunnyX = bunny.x - bunny.width  / 2;
    var bunnyY = bunny.y - bunny.height / 2;
    if ((objA.x < bunnyX + bunny.width) &&
      (objA.x + objA.width > bunnyX) &&
      (objA.y <bunnyY + bunny.height) &&
      (objA.height + objA.y > bunnyY)) {
        return true;
   }
   return false;
  }

  receiveMessage(message) {
    let dir = JSON.parse(message.data).message;
    console.log(dir)
    if(dir === 'left'){
      if(this.bunny.x>0) {
        this.bunny.x -= speed;
      }
    }
    else if(dir === 'right'){
      if(this.bunny.x < width) {
        this.bunny.x += speed;
      }
    }
    else if(dir === 'up'){
      if(this.bunny.y > 0) {
        this.bunny.y -= speed;
      }
    }
    else if(dir === 'down'){
      if(this.bunny.y < height) {
        this.bunny.y += speed;
      }
    }
  }
}

export default  rabbitHead