class Actions {

  constructor (socket) {
    this.socket = socket.socket
    this.socket.on('playedMove', this.playedMove)
    this.socket.on('joined', this.joined)
    this.socket.on('left', this.left)
  }

  joined (data) {
    console.log(data)
  }

  left (data) {
    console.log(data)
  }

  playedMove (data) {
    let selector = ''

    data.move.forEach((item) => {
      let x = (item % 3) +1
        , y = (Math.floor(item / 3)) + 1
      selector += ' > div > div:nth-child(' + y + ') > div:nth-child(' + x + ')'
    })

    $('body > main > div ' + selector).append('<p>x</p>')
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
