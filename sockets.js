const Socket = require('socket.io')
    , Game = require('./game')

module.exports = (server) => {
  let io = Socket.listen(server)

  io.sockets.on('connection', (socket) => {

    console.log(socket.id + ': client connected')

    let game = new Game(2)

    socket.on('error', console.log)

    socket.on('join', function (room) {
      if (io.sockets.adapter.rooms[room] && io.sockets.adapter.rooms[room].length < 2) {
        socket.join(room)
        io.sockets.in(room).emit('joined', socket.id + ' has joined')
      } else {
        socket.emit('joined', 'Room full :(')
       }
    })

    socket.on('movePlayed', (data) => {
      console.log('received move: ' + data)
      game.doMove(data, 'x')
      socket.emit('nextMove', game.nextAvailableMove())
    })

    socket.on('disconnect', () => {
      console.log(socket.id + ': client disconnected')
    })
  })
}
