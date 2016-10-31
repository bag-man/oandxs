let socket = require('socket.io')

module.exports = (server) => {
  let io = socket.listen(server)

  io.sockets.on('connection', (socket) => {
    console.log(socket.id + ': client connected')

    socket.on('error', console.log)

    socket.on('movePlayed', (data) => {
      console.log('received move: ' + data)
    })

    socket.on('disconnect', () => {
      console.log(socket.id + ': client disconnected')
    })
  })
}
