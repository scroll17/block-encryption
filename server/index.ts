import Server from 'socket.io';

import { IO } from "../utils/IO";
import { SocketUtils } from "../utils/socket";

(async () => {
    const io = new IO(process.stdin, process.stdout);
    const username = await io.getUsername();

    const ioSocket = new Server(3636);

    console.log('\n----------- SERVER STARTED -----------');
    ioSocket.on('connection',  socket => {
        console.log('----------- NEW CONNECTION -----------\n')

        /** After send "name" need send RSA public key */

        let nick!: string;
        socket.on('join', (data: string) => {
            nick = data.trim();

            io.write('red', 'system',`${nick} join to chat!.`)
        });
        socket.emit('join', username);

        SocketUtils.getMessageStrategy(socket, io, nick)

        SocketUtils.sendMessageStrategy(socket, io);
    })
})()