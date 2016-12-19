const Socket = require('socket.io')
    , Game = require('./game')
    , LAYERS = 1

module.exports = (server) => {
  let io = Socket.listen(server)

  io.sockets.on('connection', (socket) => {

    console.log(socket.id + ': client connected')

    socket.on('error', console.log)

    socket.on('join', function (roomId) {
      let room = io.sockets.adapter.rooms[roomId]
      if (room && room.length < 2) {

        socket.join(roomId)
        socket.room = roomId

        if (room.length === 1) {
          room.game = new Game(LAYERS)
        }

        io.sockets.in(roomId).emit('joined', room.length)
      } else {
        socket.emit('joined', 'Room full :(')
      }
    })

    socket.on('movePlayed', (data) => {
      let room = io.sockets.adapter.rooms[socket.room]
      room.game.doMove(data)

      io.to(socket.room).emit('playedMove',
        { move: data.position
        , next: room.game.nextAvailableMove()
        }
      )
    })

    socket.on('disconnect', () => {
      io.sockets.in(socket.room).emit('left', socket.id + ' has left')
      console.log(socket.id + ': client disconnected')
    })
  })
}
