import controller from '../controller'
import bunnasdyImage from './images/bunny.png'
import bunnyImage from './images/pony-icon.png'
import targetDummy from './images/target-dummy.png'
import playground from '../playground'


var width = 1800;
var height = 1400;
var radius = 800;
var angle = 5;


class rabbitHead extends playground {
  constructor() {
    super()
  }

  initDisplay() {
    var app = new PIXI.Application(width, height, {backgroundColor: 0x1099bb});
    document.body.appendChild(app.view);

    // create a new Sprite from an image path
    this.bunny = PIXI.Sprite.fromImage(bunnyImage)

    
    this.goalTeamA = PIXI.Sprite.fromImage(bunnyImage)
    
    this.goalTeamB = PIXI.Sprite.fromImage(bunnyImage)

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

      this.bunny.x = width / 2 + radius * Math.cos(angle * Math.PI / 180);
      this.bunny.y = height / 2 + radius * Math.sin(angle * Math.PI / 180);

    //  this.goalTeamB.x = this.goalTeamB.x + radius * Math.cos(angle * Math.PI / 180);
    //  this.goalTeamB.y = this.goalTeamB.y + radius * Math.sin(angle * Math.PI / 180);
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
    //  this.goalTeamA.x = 50
   //   this.bunny.rotation += 0.03 * delta;
    }.bind(this));
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