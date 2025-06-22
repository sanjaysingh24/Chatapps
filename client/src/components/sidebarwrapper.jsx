// SidebarWrapper.js
import React from "react";
import { FaCommentDots, FaUser, FaCog } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { LuCircleDashed } from "react-icons/lu";

const SidebarWrapper = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark text-white p-2" style={{ width: '60px', height: '100vh' }}>
      
      <div className="d-flex flex-column align-items-center gap-4 mt-4 ">
        <FaCommentDots title="Chats" size={20}  className="user-list" />

        {/* <FaPhone title="Calls" size={20} /> */}
        <LuCircleDashed title="Status" size={20} className="user-list" />
        <FaCog title="Settings" size={20}  className="user-list" />
      </div>
    </div>
  );
};

export default SidebarWrapper;
