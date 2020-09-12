/*extended lib*/
import socketio from 'socket.io-client';

import { IO } from "../utils/IO";
import { SocketUtils } from "../utils/socket";

(async () => {
    const io = new IO(process.stdin, process.stdout);
    const username = await io.getUsername();

    const socket = socketio.connect("http://localhost:3636", { reconnection: true });

    console.log('\n--------- CLIENT STARTED ---------');
    socket.on('connect',  () => {
        console.log('------- CONNECTED TO SERVER ------\n')

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