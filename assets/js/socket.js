class Socket {
  constructor (io) {
    this.socket = io.connect('/')

    this.socket.on('nextMove', (data) => { console.log(data) })
    this.socket.on('joined', (data) => { console.log(data) })

    this.socket.on('connect', () => {
      if (window.location.hash) {
        let room = window.location.hash.substring(1)
        this.socket.emit('join', room)
      } else {
        let room = this.socket.io.engine.id
        window.location.hash = room
        this.socket.emit('join', room)
      }
    })
  }

  move (data) {
    this.socket.emit('movePlayed', data)
  }
}

module.exports = Socket
