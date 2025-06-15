import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
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
