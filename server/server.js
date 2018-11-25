class server {

    constructor (playgroundSocket) {
        this.playgroundSocket = playgroundSocket
        this.controllerSockets = new Map();
        this.teams = new Map();
        playgroundSocket.on('close', () =>{
            playgroundSocket && playgroundSocket.destroy && playgroundSocket.destroy();
        });
    }

    reconnect (playgroundSocket) {
        this.playgroundSocket && this.playgroundSocket.close()
        this.playgroundSocket = playgroundSocket
    }

    addControllerSocket(controllerSocket) {
        if(this.controllerSockets.has(controllerSocket)) {
            return;
        }

        this.controllerSockets.set(controllerSocket, {id: ''})
        controllerSocket.on('message', this.onControllerMessage(controllerSocket));
        controllerSocket.on('close', () =>{
            this.controllerSockets.delete(controllerSocket)
            controllerSocket && controllerSocket.destroy && controllerSocket.destroy();
        });
    }

    initUser (controllerSocket, id) {
        let user = (global.users || []).filter((user) => user.client_id === id)[0]
        this.controllerSockets.set(controllerSocket, user)
        controllerSocket.send(JSON.stringify(user))
    }

    onControllerMessage(controllerSocket)  {
        return (message) => {
            try {
                let msg = JSON.parse(message)
                if(msg.init) {
                    this.initUser(controllerSocket, msg.init)
                    return
                }
            } catch(e){

            }
            var msg = {
                player : this.controllerSockets.get(controllerSocket),
                message: `${message}`
            }

            if(this.playgroundSocket){
                this.playgroundSocket.readyState === 1 && this.playgroundSocket.send(JSON.stringify(msg));
            }
        }
    }
}

module.exports =  server