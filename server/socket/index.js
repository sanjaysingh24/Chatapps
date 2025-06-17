import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.js";


let io;
const onlineUsers = new Map();
//initialize socket
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    }
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) return next(new Error('Authentication failed'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.user.id;
       onlineUsers.set(socket.userId, socket.id);
      // Save socketId and online status to DB
      await User.findByIdAndUpdate(socket.userId, {
        socketId: socket.id,
        isOnline: true
      });

      next();
    } catch (err) {
      return next(new Error('Token invalid'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.userId}`);
   
    socket.on("sendmessage",async({to,content})=>{
      try{
      const newmsg = await Message.create({
      sender: socket.userId,
      receiver: to,
      content,
    });
    const receiverSocketId = onlineUsers.get(to);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receivemessage", newmsg); // 👈 emit to receiver
    }

    // Optionally: also emit back to sender to update own chat UI instantly
    socket.emit("receivemessage", newmsg);
      }catch(err){
        console.error("Error sending message:", err);
      }
    })

    socket.on('disconnect', async () => {
      console.log(`❌ User disconnected: ${socket.userId}`);
      await User.findByIdAndUpdate(socket.userId, {
        socketId: '',
        isOnline: false
      });
    });
  });
};

export { io };