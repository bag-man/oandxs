class Actions {

  constructor (socket) {
    this.socket = socket.socket
    this.turn = false
    this.start = false
    this.marker = 'O'
    this.opponent = 'X'
    this.socket.on('playedMove', this.playedMove.bind(this))
    this.socket.on('joined', this.joined.bind(this))
    this.socket.on('left', this.left.bind(this))
  }

  joined (data) {
    if (data < 2) {
      console.log('Send this URL to your opponent: ' + window.location.href)
      this.turn = true
      this.marker = 'X'
      this.opponent = 'O'
    } else {
      console.log('Player 2 joined, make your move')
      this.start = true
    }
  }

  left (data) {
    console.log(data)
  }

  playedMove (data) {
    let selector = ''

    data.move.forEach((item) => {
      let x = (item % 3) + 1
        , y = (Math.floor(item / 3)) + 1
      selector += ' > div > div:nth-child(' + y + ') > div:nth-child(' + x + ')'
    })

    let mark = this.turn ? this.marker : this.opponent
    $('body > main > div ' + selector).append('<p>' + mark + '</p>')
    this.turn = !this.turn
  }

  move (data) {
    if (this.turn && this.start) {
      this.socket.emit('movePlayed', { marker: this.marker, position: this.getPosition(data) })
    }
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
