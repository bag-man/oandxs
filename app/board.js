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
      if (((i + 1) % 3) === 0) console.log()
    }
  }

  updateBoard (data) {
      if (this.layer !== 0) {
        for (let i = 0; i < 9; i++) {
          if (this.subBoards[i].updateBoard(data)) {
            this.board[i] = data.winner
            data.box.push(i)
          }
        }
      }

      let win = false

      if (this.winner === '_') {
        if (this.winBoard(data)) {
          this.winner = data.winner
          win = true
        }
      }

      this.touched = false

    return win
  }

  winBoard (data) {
    if (this.touched) {
      let winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        , marker = '_'

      for (let i = 0; i < 8; i++) {
        let condition = winConditions[i]

        if (this.board[condition[0]] === 'X') {
          marker = 'X'
        }

        if (this.board[condition[0]] === 'O') {
          marker = 'O'
        }

        if (marker !== '_' && this.board[condition[1]] === marker && this.board[condition[2]] === marker) {
          data.location.push(condition)
          data.winner = marker
          return true
        }
      }
    }
    return false
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
