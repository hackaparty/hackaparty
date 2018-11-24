window.addEventListener("deviceorientation", handleOrientation, true);
 

var gyroa = document.getElementById("gyro-a");
var gyrob = document.getElementById("gyro-b");
var gyroc = document.getElementById("gyro-c");
var gyrod = document.getElementById("gyro-d");
function handleOrientation(event) {
 
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;
  
  gyroa.innerHTML = ""+absolute;
  gyrob.innerHTML = ""+Math.round(alpha);
  gyroc.innerHTML = ""+Math.round(beta);
  gyrod.innerHTML = ""+Math.round(gamma);
  if(Math.abs(lastZ - gamma) > minDiff){
      clearTimeout(tm);
      if (gamma < 0) {
        server.send(`right`);
      }
      if (gamma > 0) {
        server.send(`left`);
      }
    }
    
    lastZ = gamma;
}
var lastZ = 0,
lastY = 0,
minDiff = 2,
tm = null,
wip = 0,
wipDivizor = 12;
 