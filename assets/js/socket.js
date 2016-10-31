class Socket {
  constructor (io) {
    this.socket = io.connect('/')
  }

  move (data) {
    this.socket.emit('movePlayed', data)
  }
}

module.exports = Socket
