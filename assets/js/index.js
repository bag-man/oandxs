const Socket = require('./socket')
const Action = require('./actions')

let socket = new Socket(window.io)
  , action = new Action(socket)

$('.vertical-0').on('click', (cell) => {
  action.move(cell.target)
})
