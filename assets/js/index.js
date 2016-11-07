const Socket = require('./socket')

let socket = new Socket(window.io)

function getPosition (cell) {
  let position = []
  getCell(cell)

  function getCell (cell) {
    position.push($(cell).attr('cell'))
    cell = $(cell).parent().closest('.vertical')
    if ($(cell).attr('class') === undefined) return
    getCell(cell)
  }

  return position
}

$('.vertical-0').on('click', (cell) => {
  $(cell.target).append('<p>X</p>')
  let position = getPosition(cell.target)
  socket.move(position)
})
