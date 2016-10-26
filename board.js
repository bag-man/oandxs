class Board {

  constructor (layer) {
    this.layer = layer
    this.board = Array.apply(null, Array(9)).map(() => { return '_' })
    if (this.layer !== 0) {
      this.subBoards = Array.apply(null, Array(9)).map(() => { return new Board(this.layer - 1) })
    }
    this.winner = '_'
    this.touched = false
  }

  printBoard () {
    for (let i = 0; i < 9; i++) {
      process.stdout.write(this.board[i])
      if (((i+1) % 3) === 0) console.log()
    }
  }

  updateBoard () {
    if (this.touched) {
      if (this.layer !== 0) {
        for (let i = 0; i < 9; i++) {
          this.board[i] = this.subBoards[i].updateBoard()
        }
      }
      this.winner = this.winBoard()
      this.touched = false
    }
    return this.winner
  }

  winBoard () {
    let winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
      , marker = '_'

    for (let i = 0; i < 8; i++) {
      let condition = winConditions[i]

      if (this.board[condition[0]] === 'x') {
        marker = 'x'
      }
      if (this.board[condition[0]] === 'O') {
        marker = 'O'
      }

      if (marker !== '_' && this.board[condition[1]] === marker && this.board[condition[2]] === marker) {
        return marker
      }
    }
    return '_'
  }

  playMove (pos, marker) {
    this.touched = true
    if (this.layer !== 0) {
      let currentPos = pos[0]
      pos.splice(0, 1)
      this.subBoards[currentPos].playMove(pos, marker)
    } else {
      this.board[pos[0]] = marker
    }
  }
}

module.exports = Board
