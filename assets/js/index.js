const Socket = require('./socket')
const Action = require('./actions')

let socket = new Socket(window.io)
  , action = new Action(socket)

$('.vertical-0').on('click', (cell) => {
  action.move(cell.target)
})

const createApp = require('canvas-testbed')
const World = require('./world')

let world = new World()

createApp(
  world.render
  , world.start
  , { context: 'webgl'
    , onResize: world.resize
    }
)

