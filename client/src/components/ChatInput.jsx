import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { connectSocket, getSocket } from '../config/socket';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const ChatInput = () => {
  const [message, setMessage] = useState('');
  const selectedUser = useSelector((state)=>state.auth.selectedUser);
  let socket = getSocket();

  
  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    let data ={
      to: selectedUser,
      message: message.trim(),
    }
 
    socket.emit('sendmessage', { data });
    
    console.log("Send:", message);
    setMessage('');
  };


useEffect(()=>{
socket.on('receivemessage', (data) => {
  console.log(data?.content,'new message');
})
},[])

  return (
    <form onSubmit={handleSend} className="p-3 border-top bg-white d-flex align-items-center">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        <FiSend />
      </button>
    </form>
  );
};

export default ChatInput;
