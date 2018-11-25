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

        const idMatch = window.location.search.match(/client_id=([^&]+)/)
        if(idMatch) {
            this.socket = new WebSocket("ws://" + location.hostname + ":3001/controller");

            this.socket.onopen = function () {
                this.sendMessage(JSON.stringify({init:idMatch[1]}))
                this.socket.onmessage = this.receiveMessage.bind(this)
            }.bind(this)
        }
    }

    sendMessage(message) {
        this.socket.send(message)
    }

    receiveMessage(message) {

    }

    initControls() {}
}

export default controller