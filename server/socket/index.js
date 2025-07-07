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
// as a middleware it works
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) return next(new Error('Authentication failed'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.user.id;
      let senderid = decoded.user.id;
     
       onlineUsers.set(socket.userId, socket.id);
      // Save socketId and online status to DB
      await User.findByIdAndUpdate(socket.userId, {
        socketId: socket.id,
        isOnline: true
      });
      const undeliveredMessages = await Message.find({
        receiver: socket.userId,
        status: 'sent'
      });
    
      for (const msg of undeliveredMessages) {
        // Mark them delivered

        await Message.findByIdAndUpdate(msg._id, { status: 'delivered' });
      
        // Emit to this user
        socket.emit('receivemessage', { ...msg.toObject(), status: 'delivered' });
      
        // Also tell sender they are now delivered
        const senderSocketId = onlineUsers.get(msg.sender);
    
        
      }
      next();
    } catch (err) {
      return next(new Error('Token invalid'));
    }
  });

  io.on('connection', (socket) => {

    // Typing event
socket.on('typing', ({ to }) => {
  const receiverSocketId = onlineUsers.get(to);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('typing', { from: socket.userId });
  }
});

// Stop typing event
socket.on('stoptyping', ({ to }) => {
  const receiverSocketId = onlineUsers.get(to);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('stoptyping', { from: socket.userId });
  }
});


// socket.on('messageRead',async({from,to})=>{
  
//   await Message.updateMany(
//     {sender:from,receiver:to, isRead: false},
//     { $set: { isRead: true, delivered: true } }
//   )

//   const receiverSocketId = onlineUsers.get(to);
//   if(receiverSocketId) {
//     io.to(receiverSocketId).emit('messageRead', {by:from });
//   }
// })

    socket.on("sendmessage",async({data})=>{
     
      const{to,message} = data;
   
     

      try{
      const newmsg = await Message.create({
      sender: socket.userId,
      receiver: to,
      content:message,
      status: 'sent'
    });
    const receiverSocketId = onlineUsers.get(to);

    const senderSocketId = onlineUsers.get(socket.userId);

    if (receiverSocketId) {
      await Message.findByIdAndUpdate(newmsg._id, { status: 'delivered' });
      
      io.to(receiverSocketId).emit("receivemessage", newmsg); // 👈 emit to receiver
      io.to(senderSocketId).emit("messageDelivered", newmsg); // 👈 emit to
     
      
      
    }

   
     
    

    // Optionally: also emit back to sender to update own chat UI instantly
    socket.emit("mymessage", newmsg); // 👈 emit to sender
  
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
