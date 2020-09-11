/*extended lib*/
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001", { reconnection: true });

socket.on('connect', () => {
    console.log('CLIENT connected to SERVER')

    socket.on('sequence', (data: string) => {
        console.log('data => ', data);
    });
});