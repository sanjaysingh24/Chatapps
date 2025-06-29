import React, { useRef, useState } from 'react';
import { FiSend,FiPaperclip, FiSmile, FiMic } from 'react-icons/fi';
import { connectSocket, getSocket } from '../config/socket';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';



const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
   
    setMessage('');
  };


useEffect(()=>{
socket.on('receivemessage', (data) => {

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
  // onClick={handleEmojiClick}
const handleEmojiSelect = (emoji) => {
  console.log(emoji);
  setMessage((prev) => prev + emoji.native);
  setShowEmojiPicker(false);
};

  return (
    <>
    <form onSubmit={handleSend} className="p-3 border-top bg-white d-flex align-items-center">
      <button type="button" className="btn btn-link p-0 me-2"   onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
    <FiSmile size={22} />
  </button>

  <label className="btn btn-link p-0 me-2 mb-0">
    <FiPaperclip size={22} />
    {/* <input type="file" onChange={handleFileChange} style={{ display: 'none' }} /> */}
  </label>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Type a message"
        value={message}
        onChange={ handleTyping}
      />
      <button type="submit" className="btn btn-primary">
       {message.trim() ? <FiSend size={20} /> : <FiMic size={20} />}
      </button>
    </form>
  
  {/* {showEmojiPicker && (
  <div className="position-absolute" style={{ bottom: '60px', left: '10px', zIndex: 999 }}>
   <Picker onEmojiSelect={handleEmojiSelect} />
  </div>
)} */}
  </>
  );
};

export default ChatInput;
