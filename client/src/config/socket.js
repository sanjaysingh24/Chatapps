import {io} from 'socket.io-client';
let socket;
export const connectSocket = (token)=>{
    socket = io('http://localhost:3000',{
        auth:{
            token: token
        },
        transports: ['websocket'],
    });

    socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
    });
 socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });

}
export const getSocket = () => socket;
