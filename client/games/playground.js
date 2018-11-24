import controller from "./controller";

class playground {

    constructor() {
        this.teams = []
        this.initSocket()
        this.initDisplay()
        this.initControls()
    }


    initSocket() {
        this.socket = new WebSocket("ws://" + location.hostname + ":3001/controller");
        this.socket.onopen = this.sendMessage;
        this.socket.onmessage = this.receiveMessage
    }

    sendMessage({key, value}) {
        this.socket.send()
    }

    receiveMessage(message) {

    }

    initControls() {}

    initDisplay() {}

}

export default playground