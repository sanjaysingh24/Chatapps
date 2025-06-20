import React from 'react';

import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const ChatBox = () => {

const selectedUser = useSelector((state)=>state.auth.selectedUser);
const username = useSelector((state)=>state.auth.username);





const userDetails = async()=>{}






 return (
    selectedUser ? (
      <div className="flex-grow-1 d-flex flex-column bg-light">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
          <h6 className="mb-0 text-capitalize">{username}</h6>
          <span className="text-muted">Online</span>
        </div>

        {/* Messages */}
        <div className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
          <div className="mb-2 text-end">
            <span className="badge bg-primary">Hi there 👋</span>
          </div>
          <div className="mb-2 text-start">
            <span className="badge bg-secondary">Hello! How are you?</span>
          </div>
        </div>

        {/* Input */}
        <ChatInput />
      </div>
    ) : (
      <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
  <div className="text-center animate__animated animate__fadeIn">
    <img
      src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
      alt="No Chat"
      className="img-fluid mb-3"
      style={{ width: '120px', opacity: 0.6 }}
    />
    <h5 className="text-muted">Select a user to start chatting</h5>
    <p className="text-muted small">Your conversations will appear here once you start a chat.</p>
  </div>
</div>

    )
  );
};

export default ChatBox;
