import Server from 'socket.io';

const io = new Server(3001);

io.on('connection', (socket) => {
    console.log('CLIENT connected to SERVER')

    socket.emit('sequence', '123456');
});