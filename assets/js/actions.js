class Actions {

  constructor (socket) {
    this.socket = socket.socket
    this.socket.on('playedMove', this.playedMove)
    this.socket.on('joined', this.joined)
  }

  joined (data) {
    console.log(data)
  }

  playedMove (data) {
    console.log(111, data)
  }

  move (data) {
    this.socket.emit('movePlayed', this.getPosition(data))
  }

  getPosition (cell) {
    let position = []
    getCell(cell)

    function getCell (cell) {
      position.push($(cell).attr('cell'))
      cell = $(cell).parent().closest('.vertical')
      if ($(cell).attr('class') === undefined) return
      getCell(cell)
    }

    return position.reverse()
  }

}

module.exports = Actions
