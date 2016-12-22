const assert = require('assert')
    , Board = require('../app/board')

describe('Board', () => {

  let board
    , winData = { winner: '_', location: [], box: [] }

  beforeEach((done) => {
    board = new Board(0)
    winData = { winner: '_', location: [], box: [] }
    done()
  })

  describe('playMove', () => {
    it('should place a marker in the middle', (done) => {
      board = new Board(0)
      board.playMove([4], 'X')
      assert(board.board[4] === 'X', 'marker was not placed correctly')
      done()
    })

    it('should place a marker in the middle, of a 2 layer board', (done) => {
      board = new Board(1)
      board.playMove([7, 4], 'X')
      assert(board.subBoards[7].board[4] === 'X', 'marker was not placed correctly')
      done()
    })

    it('should place a marker in the middle, of a 3 layer board', (done) => {
      board = new Board(2)
      board.playMove([2, 7, 4], 'X')
      assert(board.subBoards[2].subBoards[7].board[4] === 'X', 'marker was not placed correctly')
      done()
    })
  })

  describe('winBoard', () => {
    it('Should win board with X', (done) => {
      let winData = { winner: '_', location: [], box: [] }

      board.playMove([0], 'X')
      board.playMove([1], 'X')
      board.playMove([2], 'X')
      board.updateBoard(winData)
      assert(winData.winner, 'X', 'X did not win')
      done()
    })

    it('Should win board with O', (done) => {
      let winData = { winner: '_', location: [], box: [] }

      board.playMove([4], 'O')
      board.playMove([5], 'O')
      board.playMove([3], 'O')
      board.updateBoard(winData)
      assert(winData.winner, 'X', 'X did not win')
      done()
    })
  })

  describe('updateBoard', () => {
    it('Should have cell set by lower board', (done) => {
      board = new Board(1)
      board.playMove([0, 0], 'X')
      board.playMove([0, 1], 'X')
      board.playMove([0, 2], 'X')
      board.updateBoard(winData)
      assert(board.board[0], 'X', 'value from lower board was not passed up')
      done()
    })
  })

  describe('Visual', () => {
  let winData = { winner: '_'
                , location: []
                , box: []
                }
    it('Should show three layers of boards', (done) => {
      board = new Board(2)
      board.playMove([0, 0, 0], 'X')
      board.playMove([0, 0, 1], 'X')
      board.playMove([0, 0, 2], 'X')

      board.playMove([0, 1, 0], 'X')
      board.playMove([0, 1, 1], 'X')
      board.playMove([0, 1, 2], 'X')

      board.playMove([0, 2, 0], 'X')
      board.playMove([0, 2, 1], 'X')
      board.playMove([0, 2, 2], 'X')

      board.updateBoard(winData)

      console.log('\nLayer 2: ')
      board.printBoard()

      console.log('\nLayer 1: ')
      board.subBoards[0].printBoard()

      console.log('\nLayer 0: ')
      board.subBoards[0].subBoards[1].printBoard()
      done()
    })
  })

    describe('updateBoard', () => {
      it('check update data is correct', (done) => {
        board = new Board(2)
        board.playMove([1, 0, 0], 'X')
        board.playMove([1, 0, 1], 'X')
        board.playMove([1, 0, 2], 'X')
        let winData = { winner: '_'
                  , location: []
                  , box: []
                  }
        board.updateBoard(winData)

        board.playMove([1, 3, 0], 'X')
        board.playMove([1, 3, 1], 'X')
        board.playMove([1, 3, 2], 'X')
        winData = { winner: '_'
                  , location: []
                  , box: []
                  }
        board.updateBoard(winData)

        board.playMove([1, 6, 0], 'X')
        board.playMove([1, 6, 1], 'X')
        board.playMove([1, 6, 2], 'X')
        winData = { winner: '_'
                  , location: []
                  , box: []
                  }
        board.updateBoard(winData)

        assert(winData.winner, 'X', 'marker does not match update data')
        done()
      })
            it('check update data is correct', (done) => {
        board = new Board(2)
        board.playMove([1, 0, 0], 'X')
        board.playMove([1, 0, 1], 'X')
        board.playMove([1, 0, 2], 'X')
        let winData = { winner: '_'
                  , location: []
                  , box: []
                  }
        board.updateBoard(winData)

        board.playMove([1, 3, 0], 'X')
        board.playMove([1, 3, 1], 'X')
        board.playMove([1, 3, 2], 'X')
        winData = { winner: '_'
                  , location: []
                  , box: []
                  }
        board.updateBoard(winData)

        board.playMove([1, 6, 0], 'X')
        board.playMove([1, 6, 1], 'X')
        board.playMove([1, 6, 2], 'X')
        winData = { winner: '_'
                  , location: []
                  , box: []
                  }
        board.updateBoard(winData)
        console.log(232, winData)
        // let testArray = [[0, 1, 2], [0, 3, 6]]
        assert(winData.location, [[0, 1, 2], [0, 3, 6]], 'location does not match update data')
        done()
      })
            it('check update data is correct', (done) => {
        board = new Board(2)
        board.playMove([1, 0, 0], 'X')
        board.playMove([1, 0, 1], 'X')
        board.playMove([1, 0, 2], 'X')
        let winData = { winner: '_'
                  , location: []
                  , box: []
                  }
        board.updateBoard(winData)

        board.playMove([1, 3, 0], 'X')
        board.playMove([1, 3, 1], 'X')
        board.playMove([1, 3, 2], 'X')
        winData = { winner: '_'
                  , location: []
                  , box: []
                  }
        board.updateBoard(winData)

        board.playMove([1, 6, 0], 'X')
        board.playMove([1, 6, 1], 'X')
        board.playMove([1, 6, 2], 'X')
        winData = { winner: '_'
                  , location: []
                  , box: []
                  }
        board.updateBoard(winData)
        console.log(232, winData)
        let compareData = []
        compareData.push(6)
        compareData.push(1)
        assert(compareData, winData.box, 'box does not match update data')
        done()
      })
    })
})

