const Socket = require('socket.io')
    , Game = require('./game')
    , LAYERS = 1

module.exports = (server) => {
  let io = Socket.listen(server)

  io.sockets.on('connection', (socket) => {

    console.log(socket.id + ': client connected')

    let game = new Game(LAYERS)

    socket.on('error', console.log)

    socket.on('join', function (room) {
      if (io.sockets.adapter.rooms[room] && io.sockets.adapter.rooms[room].length < 2) {
        socket.join(room)
        socket.room = room
        io.sockets.in(room).emit('joined', socket.id + ' has joined')
      } else {
        socket.emit('joined', 'Room full :(')
       }
    })

    socket.on('movePlayed', (data) => {
      game.doMove(data, 'x')
      io.sockets.in(socket.room).emit('playedMove',
        { move: data
        , next: game.nextAvailableMove()
        }
      )
    })

    socket.on('disconnect', () => {
      io.sockets.in(socket.room).emit('left', socket.id + ' has left')
      console.log(socket.id + ': client disconnected')
    })
  })
}
