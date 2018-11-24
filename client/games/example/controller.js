import controller from '../controller'

class example extends controller {
    constructor() {
        super()
    }

    setTitle() {
        this.title = 'example'
    }

    initControls() {
        document.querySelector('.button.up').onmousedown = () => this.sendMessage.bind(this, 'up')
        document.querySelector('.button.down').onmousedown = () => this.sendMessage('down')
        document.querySelector('.button.left').onmousedown = () => this.sendMessage('left')
        document.querySelector('.button.right').onmousedown = () => this.sendMessage('right')


    }
}

export default  example