const io = require('socket.io-client');
const socket = io.connect("localhost:3001", {
    reconnection: true
});

console.log('SETUP CLIENT');

socket.on('connect', function () {
    console.log('CLIENT connected to localhost:3000');
});