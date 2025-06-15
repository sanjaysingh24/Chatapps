import React from 'react';
import Sidebar from '../components/sidebar';
import ChatBox from '../components/Chatbox';

const Dashboard = () => {
  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar />
      <ChatBox />
    </div>
  );
};

export default Dashboard;
