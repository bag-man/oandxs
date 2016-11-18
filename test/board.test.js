const assert = require('assert')
    , Board = require('../app/board')

describe('Board', () => {

  let board

  beforeEach((done) => {
    board = new Board(0)
    done()
  })

  describe('playMove', () => {
    it('should place a marker in the middle', (done) => {
      board = new Board(0)
      board.playMove([4], 'x')
      assert(board.board[4] === 'x', 'marker was not placed correctly')
      done()
    })

    it('should place a marker in the middle, of a 2 layer board', (done) => {
      board = new Board(1)
      board.playMove([7, 4], 'x')
      assert(board.subBoards[7].board[4] === 'x', 'marker was not placed correctly')
      done()
    })

    it('should place a marker in the middle, of a 3 layer board', (done) => {
      board = new Board(2)
      board.playMove([2, 7, 4], 'x')
      assert(board.subBoards[2].subBoards[7].board[4] === 'x', 'marker was not placed correctly')
      done()
    })
  })

  describe('winBoard', () => {
    it('Should win board with x', (done) => {
      board.playMove([0], 'x')
      board.playMove([1], 'x')
      board.playMove([2], 'x')
      assert(board.winBoard(), 'x', 'x did not win')
      done()
    })

    it('Should win board with O', (done) => {
      board.playMove([4], 'O')
      board.playMove([5], 'O')
      board.playMove([3], 'O')
      assert(board.winBoard(), 'x', 'x did not win')
      done()
    })
  })

  describe('updateBoard', () => {
    it('Should have cell set by lower board', (done) => {
      board = new Board(1)
      board.playMove([0, 0], 'x')
      board.playMove([0, 1], 'x')
      board.playMove([0, 2], 'x')
      board.updateBoard()
      assert(board.board[0], 'x', 'value from lower board was not passed up')
      done()
    })
  })

  describe('Visual', () => {
    it('Should show three layers of boards', (done) => {
      board = new Board(2)
      board.playMove([0, 0, 0], 'x')
      board.playMove([0, 0, 1], 'x')
      board.playMove([0, 0, 2], 'x')

      board.playMove([0, 1, 0], 'x')
      board.playMove([0, 1, 1], 'x')
      board.playMove([0, 1, 2], 'x')

      board.playMove([0, 2, 0], 'x')
      board.playMove([0, 2, 1], 'x')
      board.playMove([0, 2, 2], 'x')

      board.updateBoard()

      console.log('\nLayer 2: ')
      board.printBoard()

      console.log('\nLayer 1: ')
      board.subBoards[0].printBoard()

      console.log('\nLayer 0: ')
      board.subBoards[0].subBoards[1].printBoard()
      done()
    })
  })
})

