class Socket {
  constructor (io) {
    this.socket = io.connect('/')

    this.socket.on('foo', (data) => {
      console.log('foo: ', data)
    })
  }

  ping (data) {
    this.socket.emit('foo', data)
  }
}

module.exports = Socket
