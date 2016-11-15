const socket = require('socket.io')
    , Game = require('./game')

module.exports = (server) => {
  let io = socket.listen(server)
    , rooms = []

  io.sockets.on('connection', (socket) => {
    if (rooms.length <= 3) {
      let room = rooms.push(rooms.length + 1)
      console.log('roomname ' + room)
      socket.join(room)
      socket.emit('room', { room })
    } else {
      socket.emit('room', { room: 'Server Full :(' })
    }

    console.log(socket.id + ': client connected')
    let game = new Game(2)

    socket.on('error', console.log)

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
