class Socket {
  constructor (io) {
    this.socket = io.connect('/')

    this.socket.on('nextMove', (data) => { console.log(data) })
    this.socket.on('room', (data) => { console.log(data) })
  }

  move (data) {
    this.socket.emit('movePlayed', data)
  }
}

module.exports = Socket
