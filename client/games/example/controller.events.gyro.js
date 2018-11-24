"use strict"
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

    var minDiff = 10,
    minDiff2 = 20,
    minDiff3 = 30;

    var offsetGamma = 0.0,
    offsetBeta = 0.0,
    offsetAlpha = 0.0;

    var syncRequested = false;
    var sendEvents = false;

    function handleOrientation(event) {

        if(syncRequested) {
            syncPosition(event);
        }

        if(!sendEvents || offsetAlpha == 0.0) {
            
            return;
        }
        sendEvents = false;

        var alpha    = event.alpha - offsetAlpha;
        var beta     = event.beta -  offsetBeta;
        var gamma    = event.gamma - offsetGamma;

    //    gyroa.innerHTML = Math.round(alpha)+ " : " +Math.round(event.alpha) +" :  "+Math.round(offsetAlpha);
        gyrob.innerHTML = Math.round(beta)+ " : " +Math.round(event.beta) +" :  "+Math.round(offsetBeta);
        gyroc.innerHTML = Math.round(gamma)+ " : " +Math.round(event.gamma) +" :  "+Math.round(offsetAlpha);
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
    window.onOpenFullscreen =  function() { 
        var elem = document.getElementById("play");

        /* When the openFullscreen() function is executed, open the video in fullscreen.
        Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    function syncPosition(event) {
        syncRequested = false;
        offsetAlpha  = event.alpha;
        offsetBeta = event.beta;
        offsetGamma = event.gamma;
    }
}



