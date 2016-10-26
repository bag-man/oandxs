const Socket = require('./socket')

let socket = new Socket(window.io)

socket.ping('bar')
