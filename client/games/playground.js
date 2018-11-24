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
        this.socket.onmessage = this.receiveMessage.bind(this);
    }

    sendMessage(message) {
        this.socket.send(message);
    }

    receiveMessage(message) {}

    initControls() {}

    initDisplay() {}

}

export default playground