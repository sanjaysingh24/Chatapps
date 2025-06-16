import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { connectSocket, getSocket } from '../config/socket';
import { useEffect } from 'react';
const ChatInput = () => {
  const [message, setMessage] = useState('');
   let socket = getSocket();
  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    socket.emit('check', { content: message });
    
    console.log("Send:", message);
    setMessage('');
  };




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
