class server {
    constructor (playgroundSocket) {
        this.playgroundSocket = playgroundSocket
        this.controllerSockets = new Map();
        playgroundSocket.on('close', () =>{
            playgroundSocket && playgroundSocket.destroy && playgroundSocket.destroy();
        });
    }

    addControllerSocket(controllerSocket) {
        if(this.controllerSockets.has(controllerSocket)) {
            return;
        }
        const id = Math.ceil(Math.random() * 10000000)
        this.controllerSockets.set(controllerSocket, id)
        controllerSocket.on('message', this.onControllerMessage(controllerSocket));
        controllerSocket.on('close', () =>{
            this.controllerSockets.delete(controllerSocket)
            controllerSocket && controllerSocket.destroy && controllerSocket.destroy();
        });
    }

    onControllerMessage(controllerSocket)  {
        return (message) => {
            console.log(message)
            var msg = {
                player : this.controllerSockets.get(controllerSocket),
                message: `${message}`
            }

            if(this.playgroundSocket){
                this.playgroundSocket.send(JSON.stringify(msg));
            }
        }
    }
}


module.exports =  server