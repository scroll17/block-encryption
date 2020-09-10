/*extended lib*/
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

/*constants*/
const PORT = 3001;

const app = express();
const server = http.createServer(app);

const io = socketIO(http);
io.on('connection', (socket) => {

})

server.listen(PORT, () => console.log(`SERVER listening on ${PORT}`))