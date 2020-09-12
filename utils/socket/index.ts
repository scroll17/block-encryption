import { Socket } from 'socket.io';

import { Crypto } from "../crypto";
import { IO } from "../IO";

export namespace SocketUtils {
    export type MainSocket = Socket | SocketIOClient.Socket;

    export function sendMessageStrategy(socket: MainSocket, io: IO) {
        io.onLine(message => {
            const { table, blockSize, encryptedString } = Crypto.encrypt(message, 1);

            socket.emit('pre', JSON.stringify({ blockSize, table }));
            socket.emit('message', encryptedString)
        })
    }

    export function getMessageStrategy(socket: MainSocket, io: IO, appData: Crypto.AppData) {
        let decryptData: string;

        socket.on('pre', (data: string) => (decryptData = data))
        socket.on('message', (msg: string) => {
            if(!decryptData) throw new Error('No decrypted data.')

            const { table, blockSize } = JSON.parse(decryptData);

            if(appData.options.includes('--origin-msg')) {
                io.write('yellow', 'msg', msg);
            }

            const decryptMessage = Crypto.decrypt(msg, table, blockSize);

            io.write('green', appData.nick ?? '<empty>', decryptMessage);
        })
    }
}