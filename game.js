const Board = require('./board')

/**
 * Class that represents a game between two players
 */
class Game {

  /** @member {Board} Game#board the top level board of the game */
  /** @member {Position} Game#lastMove the position of the last move, or empty list of no moves have been made */

  /**
   * @constructor
   * @param {!number} layers the number of layers in the board
   */
  constructor (layers) {
    this.board = new Board(layers)
    this.lastMove = []
  }

  /**
   * Get the position of the board that has to be played in next
   * @return {Position} The position of the next move
   */
  nextAvailableMove () {
    let nextMove = this.lastMove.slice(0)
    nextMove.splice(0, 1)
    return nextMove
  }

  /**
   * Make a move as a player
   * @param {Position} pos the position to make the move in
   * @param {Player} the Player to make the move as
   */
  doMove (pos, marker) {
    this.lastMove = pos
    this.board.playMove(pos.slice(0), marker)
  }

}

module.exports = Game
