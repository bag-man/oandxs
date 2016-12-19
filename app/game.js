const Board = require('./board')

class Game {

  constructor (layers) {
    this.board = new Board(layers)
    this.lastMove = []
  }

  nextAvailableMove () {
    let nextMove = this.lastMove.slice(0)
    nextMove.splice(0, 1)
    return nextMove
  }

  doMove (data) {
    this.lastMove = data.position
    this.board.playMove(data.position.slice(0), data.marker)
  }

  update (data) {
    this.board.updateBoard(data)
  }

}

module.exports = Game
