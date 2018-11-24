import playground from '../playground'
import controller from "../controller";

class snake extends playground {
    constructor() {
        super()
    }

    initControls() {
        console.log('snake');

        $('body').css({margin:0,padding:0});
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        var canvas = document.getElementById('snakeCanvas');
        var ctx = canvas.getContext('2d');
        canvas.width = screenWidth;
        canvas.height = screenHeight;

        var segmentSize;

        var isRunning;

        var colors = {
            'green':'#00ff00',
            'red':'#ff0000',
            'blue':'#0000ff',
            'yellow':'#ffff00',
            'lila':'#ff00ff',
            'cyan':'#00ffff'
        };

        var Grid = function(width,height){
            this.width = width;
            this.height = height;
        };

        Grid.prototype.render = function(){

            segmentSize = Math.round(screenHeight / this.height);

            if (canvas.getContext) {
                for (var x = 0; x < this.width; x++) {
                    for (var y = 0; y < this.height; y++) {
                        ctx.strokeRect(x * segmentSize, y * segmentSize, segmentSize, segmentSize);
                    }
                }

            }
        };



        var Snake = function(length,color,startX,startY,startDirection) {
            this.length = length;
            this.color  = colors[color];
            this.points = 0;
            this.startDirection = startDirection;
            this.x = startX;
            this.y = startY;
            this.segments = [];
        }

        Snake.prototype.go = function() {
            // Rotate wheels
        }

        Snake.prototype.stop = function() {
            // Apply brake pads
        }

        Snake.prototype.getPoints = function() {
            return this.points;
        }


        Snake.prototype.birth = function(){
            for (var i = 0; i < this.length; i++) {
                switch (this.startDirection) {
                    case 0:
                        this.segments.push(
                            {
                                'x': this.x,
                                'y': this.y + i,
                                'altX': this.x,
                                'altY': this.y + i

                            });
                        break;
                    case 90:
                        this.segments.push(
                            {
                                'x': this.x - i,
                                'y': this.y,
                                'altX': this.x - i,
                                'altY': this.y

                            });
                        break;
                    case 180:
                        this.segments.push(
                            {
                                'x': this.x,
                                'y': this.y - i,
                                'altX': this.x,
                                'altY': this.y - i

                            });
                        break;
                    case 270:
                        this.segments.push(
                            {
                                'x': this.x + i,
                                'y': this.y,
                                'altX': this.x + i,
                                'altY': this.y

                            });
                        break;
                }
            }
        }

        Snake.prototype.render = function(){
            ctx.fillStyle=this.color;
            for(var i = 0; i < this.segments.length; i++) {
                ctx.fillRect(this.segments[i].x * segmentSize, this.segments[i].y * segmentSize,
                    segmentSize,segmentSize);
            }
        }

        var schlangen = [];

        var initSchlangen = function(teams,grid) {

            var abstand = Math.round(grid.width / (teams.length+1));
            var vertikale = Math.round(grid.height/2);
            console.log(teams.length);
            for(var t = 0; t < teams.length; t++) {
                //console.log('x');
                //console.log(2,teams[i].color,abstand*(i+1),vertikale,0);
                let schlange = new Snake(2,teams[t].color,(abstand*(t+1)),vertikale,0);
                schlange.birth();
                schlange.render();
                schlangen.push(schlange);
            }
            console.log(schlangen);
        }

        Snake.prototype.grow()
        {
            //Kopf bewegen und neues Segment einfügen
            var kopf = this.segments[0];
            switch (kopf.direction) {
                case 0:
                    kopf.y += 1;
                    this.segments.splice(1, 0, {
                        'x': this.x,
                        'y': this.y - 1,
                        'altX': this.x,
                        'altY': this.y - 1
                    });
                    break;
                case 90:
                    kopf.x += 1;
                    this.segments.splice(1, 0, {
                        'x': this.x - 1,
                        'y': this.y,
                        'altX': this.x - 1,
                        'altY': this.y
                    });
                    break;
                case 180:
                    kopf.y -= 1;
                    this.segments.splice(1, 0, {
                        'x': this.x,
                        'y': this.y + 1,
                        'altX': this.x,
                        'altY': this.y + 1
                    });
                    break;
                case 270:
                    kopf.x -= 1;
                    this.segments.splice(1, 0, {
                        'x': this.x + 1,
                        'y': this.y,
                        'altX': this.x + 1,
                        'altY': this.y
                    });
                    break;
            }
        }

        Snake.prototype.move()
        {
            //Kopf bewegen
            var kopf = this.segments[0];
            switch (kopf.direction) {
                case 0:
                    kopf.y += 1;
                    break;
                case 90:
                    kopf.x += 1;
                    break;
                case 180:
                    kopf.y -= 1;
                    break;
                case 270:
                    kopf.x -= 1;
                    break;
            }
            //Alle Teile außer Kopfbewegen
            for(var i = 1; i < this.segments.length; i++) {
                this.segments[i].x = this.segments[i-1].altX;
                this.segments[i].y = this.segments[i-1].altY;
                //Neue "Alt" Pos setzten
                this.segments[i].altX = this.segments[i].x;
                this.segments[i].altY = this.segments[i].y;
            }
            //Neue "Alt" Pos für Kopf setzten
            schlangen[s].segments[0].altX = schlangen[s].segments[0].x;
            schlangen[s].segments[0].altY = schlangen[s].segments[0].y;
        }

        var fruechte = [];
        var frucht = new function (x,y,punkte) {
            this.x = x;
            this.y = y;
            this.punkte = punkte;
        }

        var fruechteErstellen = function() {
            if(fruechte.length < 10) {
                lat x = Math.random()*(meinSpielfeld.width+1);
                lat y = Math.random()*(meinSpielfeld.height+1);
                lat punkte = Math.random()*41;
                fruechte.push(new Frucht(x, y, punkte));
            }
        }

        var isSnakeOnCoordinates = function (x, y){
            schlangen.forEach (schlange => {
                schlange.segmente.forEach (segment => {
                    if (segment.x == x && segment.y == y) {
                        return true;
                    }
                });

            });
            return false;
        }

        var gameLoop = function () {
            if (!isRunning) {
                clearInterval(gameLoopIntervalId)
            }
            updateSnakes();
            if (Math.random() < 0.2) {
                fruechteErstellen ()
            }

            meinSpielfeld.render();
        }

        var updateSnakes = function ()
        {
            // TODO : implement
        }


        var meinSpielfeld = new Grid(60,40);
        console.log('height'+meinSpielfeld.height);
        isRunning = true
        var stopGameIntervalID = setInterval(function (){isRunning=false;},60000)
        var gameLoopIntervalID = setInterval(gameLoop(), 1000);

        var teams = [
            { color:'yellow'},
            {color:'red'},
            {color:'blue'}
        ];

        initSchlangen(teams,meinSpielfeld);
    }
}

export default  snake