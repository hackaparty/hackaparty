export default function(server) {
    window.addEventListener("deviceorientation", handleOrientation, true);
    var gyroa = document.getElementById("gyro-a");
    var gyrob = document.getElementById("gyro-b");
    var gyroc = document.getElementById("gyro-c");
    var gyrod = document.getElementById("gyro-d");
    setInterval(function(){ debounceEvents(); }, 50);

    function debounceEvents() {
        sendEvents = true;
    }

    var     minDiff = 20,
    minDiff2 = 30,
    minDiff3 = 40;

    var offsetGamma = 0.0,
    offsetBeta = 0.0,
    offsetAlpha = 0.0;

    var syncRequested = false;
    var sendEvents = false;
    var notSynced = false;

    function handleOrientation(event) {

        if(syncRequested) {
            syncPosition(event);
            notSynced=false;
        }

        if(!sendEvents || notSynced) {
            
            return;
        }
        sendEvents = false;

        var alpha    = event.alpha - offsetAlpha;
        var beta     = event.beta - offsetBeta;
        var gamma    = event.gamma - offsetGamma;
        var eventCount = 1;
        

        if (Math.abs(gamma) > minDiff) {
            if(Math.abs(gamma) > minDiff2){
                eventCount++;
            }
            
            if(Math.abs(gamma) > minDiff3){
                eventCount++;
            }
            
            for (var i = 0; i < eventCount; i++) {
                
                gamma > 0 ? server.send('up') : server.send('down');
            } 
        }

        if (Math.abs(beta) > minDiff) {
            if(Math.abs(beta) > minDiff2){
                eventCount++;
            }
            
            if(Math.abs(beta) > minDiff3){
                eventCount++;
            }

            for (var i = 0; i < eventCount; i++) {
                beta > 0 ? server.send('right') : server.send('left');
            } 
        }
    }

    window.onSyncStartPosition =  function() { 
        syncRequested = true;
    }

    function syncPosition(event) {
        syncRequested = false;
        offsetAlpha  = event.alpha;
        offsetBeta = event.beta;
        offsetGamma = event.gamma;
    }
}



