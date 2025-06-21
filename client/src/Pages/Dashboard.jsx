import React, { useEffect } from 'react';
import Sidebar from '../components/sidebar';
import ChatBox from '../components/Chatbox';
import { connectSocket } from '../config/socket';
import SidebarWrapper from '../components/sidebarwrapper';
const Dashboard = () => {
useEffect(()=>{
let token = localStorage.getItem('token');
if(token){
  connectSocket(token);
}
},[])

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <SidebarWrapper></SidebarWrapper>
      <Sidebar />
      <ChatBox />
    </div>
  );
};

export default Dashboard;
