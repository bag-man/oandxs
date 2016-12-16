const Board = require('./board')

class Game {

  constructor (layers) {
    this.board = new Board(layers)
    this.lastMove = []
    this.players = []
    this.tick = 1
  }

  nextAvailableMove () {
    let nextMove = this.lastMove.slice(0)
    nextMove.splice(0, 1)
    return nextMove
  }

  doMove (pos, marker) {
    this.lastMove = pos
    this.board.playMove(pos.slice(0), marker)
    this.tick ^= 1
    return this.players[this.tick]
  }

  addPlayer (playerId) {
    this.players.push(playerId)
  }

}

module.exports = Game
