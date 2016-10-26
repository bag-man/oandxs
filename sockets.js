let socket = require('socket.io')

module.exports = (server) => {
  let io = socket.listen(server)

  io.sockets.on('connection', (socket) => {
    console.log(socket.id + ': client connected')
    socket.emit('foo', 'bar')

    socket.on('error', console.log)

    socket.on('foo', (data) => {
      console.log('foo: ' + data)
    })

    socket.on('disconnect', () => {
      console.log(socket.id + ': client disconnected')
    })
  })
}
