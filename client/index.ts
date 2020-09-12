/*extended lib*/
import socketio from 'socket.io-client';

import { IO } from "../utils/IO";
import { SocketUtils } from "../utils/socket";
import { Crypto } from "../utils/crypto";

(async () => {
    const io = new IO(process.stdin, process.stdout);
    const username = await io.getUsername();

    const socket = socketio.connect("http://176.215.29.207:3636", { reconnection: true });

    const appData: Crypto.AppData = {};

    console.log('\n--------- CLIENT STARTED ---------');
    socket.on('connect',  () => {
        console.log('------- CONNECTED TO SERVER ------\n')

        /** After send "name" need send RSA public key */

        socket.on('join', (data: string) => {
            appData.nick = data.trim();

            io.write('red', 'system',`"${appData.nick}" join to chat!.`)
        });
        socket.emit('join', username);

        SocketUtils.getMessageStrategy(socket, io, appData)

        SocketUtils.sendMessageStrategy(socket, io);
    })

    socket.on('disconnect', () => {
        io.write('red', 'system',`"${appData.nick}" leave from chat!.`)
        io.rl.pause();
    });
})()