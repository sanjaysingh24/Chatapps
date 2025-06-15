import React from 'react';

import ChatInput from './ChatInput';
const ChatBox = () => {
  return (
    <div className="flex-grow-1 d-flex flex-column bg-light">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
        <h6 className="mb-0">Ravi Kumar</h6>
        <span className="text-muted">Online</span>
      </div>

      {/* Messages (Static for now) */}
      <div className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
        <div className="mb-2 text-end">
          <span className="badge bg-primary">Hi there 👋</span>
        </div>
        <div className="mb-2 text-start">
          <span className="badge bg-secondary">Hello! How are you?</span>
        </div>
      </div>

      {/* Input */}
      <ChatInput/>
    </div>
  );
};

export default ChatBox;
