import React, { useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { connectSocket, getSocket } from '../config/socket';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const ChatInput = () => {
  const [message, setMessage] = useState('');
  const selectedUser = useSelector((state)=>state.auth.selectedUser);
  let socket = getSocket();
  const typingTimeout = useRef(null);
  const isTyping = useRef(false);

  
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
 const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!isTyping.current) {
      isTyping.current = true;
      socket.emit('typing', { to: selectedUser });
    }

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      isTyping.current = false;
      socket.emit('stoptyping', { to: selectedUser });
    }, 1500); // user stopped typing after 1.5s
  };
  return (
    <form onSubmit={handleSend} className="p-3 border-top bg-white d-flex align-items-center">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Type a message"
        value={message}
        onChange={ handleTyping}
      />
      <button type="submit" className="btn btn-primary">
        <FiSend />
      </button>
    </form>
  );
};

export default ChatInput;
