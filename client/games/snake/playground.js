import playground from '../playground'
import controller from "../controller";
import $ from 'jquery'

class snake extends playground {
    constructor() {
        super()
    }

    initControls() {
        console.log('snake');

        $('body').css({margin:0,padding:0});

        var elem = document.createElement('canvas');
        elem.id = 'snakeCanvas';
        document.body.appendChild(elem);

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
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0,0,segmentSize*this.width,segmentSize*this.height);
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
            this.segments[0].direction = this.startDirection;
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
                let schlange = new Snake(2,teams[t].color,(abstand*(t+1)),vertikale,0);
                schlange.birth();
                schlange.render();
                schlangen.push(schlange);
            }
            console.log(schlangen);
        }

        Snake.prototype.grow = function ()
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

        Snake.prototype.move = function()
        {
            //Kopf bewegen
            var kopf = this.segments[0];
            var movePossible = false;
            switch (kopf.direction) {
                case 0:
                    if(kopf.y - 1 >= 0) {
                        kopf.y -= 1;
                        movePossible = true;
                    }
                    break;
                case 90:
                    if(kopf.x + 1 < meinSpielfeld.width) {
                        kopf.x += 1;
                        movePossible = true;
                    }
                    break;
                case 180:
                    if(kopf.y + 1 < meinSpielfeld.height) {
                        kopf.y += 1;
                        movePossible = true;
                    }
                    break;
                case 270:
                    if(kopf.x - 1 >= 0) {
                        kopf.x -= 1;
                        movePossible = true;
                    }
                    break;
            }
            if(movePossible) {
                //Alle Teile außer Kopfbewegen
                for (var i = 1; i < this.segments.length; i++) {
                    this.segments[i].x = this.segments[i - 1].altX;
                    this.segments[i].y = this.segments[i - 1].altY;
                    //Neue "Alt" Pos setzten
                    this.segments[i].altX = this.segments[i].x;
                    this.segments[i].altY = this.segments[i].y;
                }
                //Neue "Alt" Pos für Kopf setzten
                this.segments[0].altX = this.segments[0].x;
                this.segments[0].altY = this.segments[0].y;
            }
        }

        var fruechte = [];
        var Frucht = function (x,y,punkte) {
            this.x = x;
            this.y = y;
            this.punkte = punkte;
        }

        var fruechteErstellen = function() {
            if(fruechte.length < 10) {
                let x = parseInt(Math.random()*(meinSpielfeld.width + 1));
                let y = parseInt(Math.random()*(meinSpielfeld.height + 1));
                var punkte = Math.random();
                if(punkte < 0.3) {
                    punkte = 10;
                } else if(punkte < 0.6) {
                    punkte = 20;
                } else {
                    punkte = 30;
                }
                fruechte.push(new Frucht(x, y, punkte));
            }
        }

        Frucht.prototype.render = function() {
            if(this.punkte == 10) {
                ctx.fillStyle = "#000000";
            } else if(this.punkte == 20) {
                ctx.fillStyle = "#00FFF0";
            } else {
                ctx.fillStyle = "#f0db00";
            }

            let appleSize = segmentSize*(this.punkte/40)
            ctx.fillRect(this.x * segmentSize, this.y*segmentSize ,
                segmentSize, segmentSize);


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
                clearInterval(gameLoopIntervalID);
                console.log("Test");
                gameEnded();
            }

            if (Math.random() < 0.2) {
                fruechteErstellen ()
            }

            updateSnakes();


            meinSpielfeld.render();
            for(var s = 0; s < schlangen.length; s++) {
               schlangen[s].render();
            }
            for(var f = 0; f < fruechte.length; f++) {
                fruechte[f].render();
            }

        }

        var updateSnakes = function () {
            schlangen.forEach (function(schlange) {
                var hasGrown = fruchtKollision(schlange);
                if (!hasGrown) {                        // move the snake only if it hasn't eaten a fruit
                    moveSnake(schlange);
                }
            });
        }

        var moveSnake = function (schlange) {
            // TODO : fetch inputs and move snakes
            schlange.move();
        }

        var gameEnded = function () {
            // TODO : getWinner and forward to winning screen

            let maxPoints = 0;
            let maxPointsSnake = schlangen[0];
            schlangen.forEach( function(schlange){
                if(schlange.points > maxPoints) // TODO : fix multiple winners
                {
                    maxPoints = schlange.points;
                    maxPointsSnake = schlange;
                }
            });

            //Win screen
            ctx.fillStyle = maxPointsSnake.color;
            ctx.fillRect(0,0,screenWidth,screenHeight);
            ctx.fillStyle = 'black';
            ctx.font = "60px Arial";
            let text = "Winner: Team "+maxPointsSnake.color;
            ctx.fillText(text,screenWidth/2 - ctx.measureText(text).width/2, screenHeight/2);
        }


        //Schaut ob eine Frucht auf einem Schlangenkopf ist
        //Fügt die Punkte hinzue und löscht die Frucht
        //führt grow aus
        var fruchtKollision = function (schlange) {

            for(var f = 0; f < fruechte.length; f++) {
                if(schlange.segments[0].x == fruechte[f].x
                && schlange.segments[0].y == fruechte[f].y) {
                    schlange.punkte += fruechte[f].punkte;
                    fruechte.splice(f,1);
                    schlange.grow();
                    return true;
                }
            }


        }



        var meinSpielfeld = new Grid(60,40);
        console.log('height'+meinSpielfeld.height);
        isRunning = true;
        var stopGameIntervalID = setInterval(function (){isRunning=false;},60000);
        var gameLoopIntervalID = setInterval(function () {gameLoop()}, 1000);


        var teams = [
            {color:'red'},
            {color:'blue'}
        ];

        initSchlangen(teams,meinSpielfeld);




    }
}

export default  snake
