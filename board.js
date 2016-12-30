
/**
 * Enum of player values
 * @readonly
 * @enum {string} player
 */
const player = {
  // This looks Ugly! https://github.com/jsdoc3/jsdoc/issues/446

     /** An Unclaimed Cell */            UNCLAIMED: '_' 
   , /** A Cell claimed by player 'x' */ X: 'x'         
   , /** A Cell clained by player 'o' */ O: 'O'         
}

/**
 * @typedef {(number[])} Position
 * A position in an n-deep board, where the length of the array is n. Each element in the array denotes a cell with in a board. Valid cell index is between 0 and 9 as shown;
 * <pre>
 * +---|---|---|
 * | 0 | 1 | 2 |
 * +---+---+---+
 * | 4 | 5 | 6 |
 * +---+---+---+
 * | 7 | 8 | 9 |
 * +---+---+---+
 * </pre>
 */

/**
 * Class representing a n-layered board
 */
class Board {

  /**
   * @constructor
   * @param {!number} layer Number of layers deep
   */
  constructor (layer) {
    
    /**
     * @member {number} Board#layer the number of layers deep the board is
     */
    this.layer = layer

    /**
     * @member {player[]} Board#board the board array, holding win positions.
     */
    this.board = Array.apply(null, Array(9)).map(() => { return Board.player.UNCLAIMED })

    /**
     * @member {Board[]} Board#subBoards an array containing the boards in the next layer down
     */
    if (this.layer !== 0) {
      this.subBoards = Array.apply(null, Array(9)).map(() => { return new Board(this.layer - 1) })
    }

    /**
     * @member {boolean} Board#winner the winning player.
     */
    this.winner = Board.player.UNCLAIMED

    /**
     * @member {boolean} Board#touched if the board has been touched
     */
    this.touched = false
  }

  /**
   * Get the player Enum for comparison
   * @return {player} the Player Enum
   */ 
  static get player () {
    return player
  }

  /**
   * Print an ASCII representation of the board
   */
  printBoard () {
    for (let i = 0; i < 9; i++) {
      process.stdout.write(this.board[i])
      if (((i + 1) % 3) === 0) console.log()
    }
  }

  /**
   * Update the board (and sub boards) to find a winner
   * @return {string} the winning player as a string of either 'x', 'O' or '_'
   */ 
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

  /**
   * check win conditions for each cell in this (and only this) level
   */
  winBoard () {
    let winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
      , marker = '_'

    for (let i = 0; i < 8; i++) {
      let condition = winConditions[i]

      if (this.board[condition[0]] === Board.player.X) {
        marker = Board.player.X
      }
      if (this.board[condition[0]] === Board.player.O) {
        marker = Board.player.O
      }

      if (marker !== Board.player.UNCLAIMED && this.board[condition[1]] === marker && this.board[condition[2]] === marker) {
        return marker
      }
    }
    return Board.player.UNCLAIMED
  }

  /**
   * Play a move in a cell as a player
   * @param {Position} pos the position to play in
   * @param {player} marker the player to play as
   */
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
