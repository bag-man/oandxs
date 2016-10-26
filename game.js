const Board = require('./board')

class Game {

  constructor (layers) {
    this.board = new Board(layers)
    this.lastMove = []
  }

  nextAvailableMove () {
    return this.lastMove.splice(0, 1)
  }

  doMove (pos, marker) {
    this.lastMove = pos
    this.board.playMove(pos, marker)
  }

}

module.exports = Game
