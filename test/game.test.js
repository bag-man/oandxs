const assert = require('assert')
    , Game = require('../game')

describe('Game', () => {

  let game

  beforeEach((done) => {
    game = new Game(0)
    done()
  })

  describe('nextAvailableMove', () => {
    it('Should return array of available moves', (done) => {
      game.doMove([4, 4], 'x')
      assert(game.nextAvailableMove(), [4], 'Incorrect next move location')
      done()
    })
  })
})
