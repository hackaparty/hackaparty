import controller from "./controller";

class playground {

    constructor() {
        this.teams = []
        this.initSocket()
        this.initDisplay()
        this.initControls()
    }


    initSocket() {
        this.socket = new WebSocket("ws://" + location.hostname + ":3001/playground");
        this.socket.onopen = function () {
            this.socket.onmessage = this.receiveMessage.bind(this)
        }.bind(this)
    }

    sendMessage(message) {
        this.socket.send(message);
    }

    receiveMessage(message) {
        console.log(message)
    }

    initControls() {

    }

    initDisplay() {}




}

export default playground