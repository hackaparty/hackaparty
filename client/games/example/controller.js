import controller from '../controller'
import registerGyroskop from './controller.events.gyro'

class example extends controller {
    constructor() {
        super()
    }

    setTitle() {
        this.title = 'example'
    }

    initControls() {
        document.querySelector('.button.up').onmousedown = () => this.sendMessage('up')
        document.querySelector('.button.down').onmousedown = () => this.sendMessage('down')
        document.querySelector('.button.left').onmousedown = () => this.sendMessage('left')
        document.querySelector('.button.right').onmousedown = () => this.sendMessage('right')

        registerGyroskop(this.socket);
    }

    receiveMessage(message) {
        let data = JSON.parse(message.data)
        console.log(data)
    }
}

export default  example