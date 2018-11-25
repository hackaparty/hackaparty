import playground from "../playground";

const dimX = 800;
const dimY = 600;

const speed = 5;
const playerSize = 50;

const obstacleSize = 20;
const obstacleStartSpeed = 7;
const obstacleSpeedIncrease = 0.002;

class reaction extends playground {
  constructor() {
    super()
    this.direction1 = 0;
    this.direction2 = 0;
    this.obstacleSpeed = obstacleStartSpeed;
    this.scoreRed = 0;
    this.scoreBlue = 0;
  }

  initDisplay() {
    let app = new PIXI.Application(dimX, dimY, {backgroundColor: 0x1099bb});
    document.body.appendChild(app.view);

    app.renderer.backgroundColor = 0x2E2E2E;

    this.players = new PIXI.Container();
    this.obstacles = new PIXI.Container();

    this.addPlayer(2 * playerSize, 0xFE6A6A);
    this.addPlayer(dimY - 2 * playerSize, 0x72D7D1);

    let scoreRedText = new PIXI.Text(0,{fontFamily : 'Helvetia', fontSize: 48, fill : 0xFE6A6A, align : 'center'});
    let scoreBlueText = new PIXI.Text(0,{fontFamily : 'Helvetia', fontSize: 48, fill : 0x72D7D1, align : 'center'});

    scoreRedText.anchor.x = 1;

    scoreRedText.y = 10;
    scoreBlueText.y = 10;
    scoreRedText.x = dimX / 2 - 20;
    scoreBlueText.x = dimX / 2 + 20;

    app.stage.addChild(this.players);
    app.stage.addChild(this.obstacles);

    app.stage.addChild(scoreBlueText);
    app.stage.addChild(scoreRedText);

    app.ticker.add(function (delta) {
      this.obstacleSpeed += obstacleSpeedIncrease * delta;

      this.players.children[0].y -= speed * this.direction1 * delta;
      this.players.children[0].y = Math.max(playerSize / 2, Math.min(dimY - playerSize / 2, this.players.children[0].y));
      this.players.children[1].y -= speed * this.direction2 * delta;
      this.players.children[1].y = Math.max(playerSize / 2, Math.min(dimY - playerSize / 2, this.players.children[1].y));

      // Spawn obstacles
      if(this.obstacles.children.length < 10){
        let r = Math.random();
        if(r < delta / 30){
          let y = obstacleSize + (Math.random() * (dimY - obstacleSize));
          this.addObstacle(y, this.obstacleSpeed, obstacleSize);
        }
      }

      // Remove passed obstacles
      this.obstacles.children.forEach((obstacle) => {
        obstacle.x -= obstacle.speed * delta;
        if(obstacle.x < -obstacleSize * 2){
          this.obstacles.removeChild(obstacle);
        }
      });

      // Collision detection.
      this.obstacles.children.forEach((obstacle) => {
        let player1 = this.players.children[0];
        let player2 = this.players.children[1];
        if(Math.abs(obstacle.x - player1.x) < (obstacleSize + playerSize) / 2){
          let collision = false
          if(Math.abs(obstacle.y - player1.y) < (obstacleSize + playerSize) / 2){
            collision = true;
            this.scoreRed -= 1;
            scoreRedText.text = this.scoreRed;
          }
          if(Math.abs(obstacle.y - player2.y) < (obstacleSize + playerSize) / 2){
            collision = true;
            this.scoreBlue -= 1;
            scoreBlueText.text = this.scoreBlue;
          }

          if(collision){
            this.obstacles.removeChild(obstacle);
          }
        }
      });

      // Score


    }.bind(this));
  }

  addPlayer(y, color){
    let player = new PIXI.Graphics();

    player.lineStyle(2, color, 1);
    player.beginFill(color, 0.5);
    player.drawRect(-playerSize / 2, -playerSize / 2, playerSize, playerSize);
    player.endFill();

    player.x = 100;
    player.y = y;

    this.players.addChild(player);
  }

  addObstacle(y, speed, size){
    let obstacle = new PIXI.Graphics();

    obstacle.lineStyle(2, 0xFBF34C, 1);
    obstacle.beginFill(0xFBF34C, 0.5);
    obstacle.drawRect(-size / 2, -size / 2, size, size);
    obstacle.endFill();

    obstacle.x = dimX + size * 2;
    obstacle.y = y;

    obstacle.speed = this.obstacleSpeed;

    this.obstacles.addChild(obstacle);
  }

  receiveMessage(messageStr){
    let message = JSON.parse(messageStr.data);
    let dir = message.message;
    let team = message.player.team === "red" ? 0 : 1;
    console.log(message);

    if(dir === 'up'){
      team === 0 ? this.direction1 = 1 : this.direction2 = 1;
    }
    else if(dir === 'down'){
      team === 0 ? this.direction1 = -1 : this.direction2 = -1;
    }
  }
}

export default reaction;