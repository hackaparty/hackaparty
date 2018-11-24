class controller {

    constructor() {
        this.setTitle()
        this.initSocket()
        this.initControls()
    }

    setTitle() {
        this.title = 'default'
    }

    initSocket() {
        this.socket = new WebSocket("ws://" + location.hostname + ":3001/controller");
        this.socket.onopen = function() {
            this.socket.onmessage = this.receiveMessage
        }.bind(this)

    }

    sendMessage(message) {
        this.socket.send(message)
    }

    receiveMessage(message) {

    }

    initControls() {}
}

export default controller