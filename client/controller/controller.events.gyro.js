export default function(server) {
    window.addEventListener("deviceorientation", handleOrientation, true);
    var gyroa = document.getElementById("gyro-a");
    var gyrob = document.getElementById("gyro-b");
    var gyroc = document.getElementById("gyro-c");
    var gyrod = document.getElementById("gyro-d");
    var lastGamma = 0.0,
    lastBeta = 0.0,
    lastBeta = 0.0,
    lastAlpha = 0.0,
    minDiff = 2;

    function handleOrientation(event) {

    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;

    gyroa.innerHTML = Math.abs(lastGamma - gamma) > minDiff;

    gyrob.innerHTML = ""+Math.abs(lastGamma - gamma) // "alpha: "+Math.round(alpha);
    gyroc.innerHTML = lastGamma//"beta: "+Math.round(beta);
    gyrod.innerHTML = "gamma:"+Math.round(gamma);

    if (Math.abs(lastGamma - gamma) > minDiff) {
        server.send({"gamma":gamma});
    }
    lastGamma = gamma;

    if (Math.abs(lastBeta - beta) > minDiff) {
        server.send({"beta":beta});
    }
    lastBeta = beta;

    if (Math.abs(lastAlpha - alpha) > minDiff) {
        server.send({"alpha":alpha});
    }
    lastAlpha = alpha;
}

}

