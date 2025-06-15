import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


let io;
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