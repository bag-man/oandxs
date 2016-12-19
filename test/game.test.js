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
      game.doMove({ position: [4, 4], marker: 'X' })
      assert(game.nextAvailableMove(), [4], 'Incorrect next move location')
      done()
    })
  })

  describe('update', () => {
    let data = { winner: '_'
          , location: []
          , box: []
          }
    it('Should return data with variable X as winner', (done) => {
      game.doMove({ position: [4, 4], marker: 'X' })
      game.doMove({ position: [4, 5], marker: 'X' })
      game.doMove({ position: [4, 3], marker: 'X' })
      game.update(data)
      assert(data.winner, 'X', 'Incorrect next move location')
      done()
    })
  })
})
