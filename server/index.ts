import Server from 'socket.io';

import { IO } from "../utils/IO";
import { SocketUtils } from "../utils/socket";
import {Crypto} from "../utils/crypto";

(async () => {
    const io = new IO(process.stdin, process.stdout);
    const username = await io.getUsername();

    const ioSocket = new Server(3636);

    const appData: Crypto.AppData = {};

    console.log('\n----------- SERVER STARTED -----------');
    ioSocket.on('connection',  socket => {
        console.log('----------- NEW CONNECTION -----------\n')

        socket.on('disconnect', () => {
            io.write('red', 'system',`"${appData.nick}" leave from chat!.`)
            io.rl.pause()
        });

        /** After send "name" need send RSA public key */

        socket.on('join', (data: string) => {
            appData.nick = data.trim();

            io.write('red', 'system',`"${appData.nick}" join to chat!.`)
        });
        socket.emit('join', username);

        SocketUtils.getMessageStrategy(socket, io, appData)

        SocketUtils.sendMessageStrategy(socket, io);
    })
})()