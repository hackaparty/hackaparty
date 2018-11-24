const dimX = 800;
const dimY = 600;

const speed = 5;
const playerSize = 50;

const obstacleSize = 20;
const obstacleSpeed = 10;

export default {
  direction: 0,
  run: function() {
    let app = new PIXI.Application(dimX, dimY, {backgroundColor: 0x1099bb});
    document.body.appendChild(app.view);

    app.renderer.backgroundColor = 0x000;

    this.players = new PIXI.Container();
    this.obstacles = new PIXI.Container();

    this.addPlayer(2 * playerSize, 0xff0000);
    this.addPlayer(dimY - 2 * playerSize, 0x0000ff);

    app.stage.addChild(this.players);
    app.stage.addChild(this.obstacles);

    app.ticker.add(function (delta) {
      this.players.children.forEach((player) => {
        player.y -= speed * this.direction * delta;
        player.y = Math.max(playerSize / 2, Math.min(dimY - playerSize / 2, player.y));
      });

      if(this.obstacles.children.length < 10){
        let r = Math.random();
        if(r < delta / 30){
          let y = obstacleSize + (Math.random() * (dimY - obstacleSize));
          this.addObstacle(y, obstacleSpeed, obstacleSize);
        }
      }

      this.obstacles.children.forEach((obstacle) => {
        obstacle.x -= obstacle.speed * delta;
        if(obstacle.x < -obstacleSize * 2){
          this.obstacles.removeChild(obstacle);
        }
      });


    }.bind(this));
  },

  addPlayer: function(y, color){
    let player = new PIXI.Graphics();

    player.lineStyle(2, color, 1);
    player.beginFill(color, 0.25);
    player.drawRect(-playerSize / 2, -playerSize / 2, playerSize, playerSize);
    player.endFill();

    player.x = 100;
    player.y = y;

    this.players.addChild(player);
  },

  addObstacle: function(y, speed, size){
    let obstacle = new PIXI.Graphics();

    obstacle.lineStyle(2, 0x00ff00, 1);
    obstacle.beginFill(0x00ff00, 0.25);
    obstacle.drawRect(-size / 2, -size / 2, size, size);
    obstacle.endFill();

    obstacle.x = dimX + size * 2;
    obstacle.y = y;

    obstacle.speed = obstacleSpeed;

    this.obstacles.addChild(obstacle);
  },

  onmessage: function(msg){
    console.log(msg.data);

    if(msg.data === 'up'){
      this.direction = 1;
    }
    else if(msg.data === 'down'){
      this.direction = -1;
    }
  }
}