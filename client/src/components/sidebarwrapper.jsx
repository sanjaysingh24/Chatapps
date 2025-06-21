// SidebarWrapper.js
import React from "react";
import { FaCommentDots, FaUser, FaPhone, FaCog } from "react-icons/fa";

const SidebarWrapper = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark text-white p-2" style={{ width: '60px', height: '100vh' }}>
      <div className="my-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          className="rounded-circle"
          width="40"
          height="40"
        />
      </div>
      <div className="d-flex flex-column align-items-center gap-4 mt-4">
        <FaCommentDots title="Chats" size={20} />
        <FaUser title="Status" size={20} />
        <FaPhone title="Calls" size={20} />
        <FaCog title="Settings" size={20} />
      </div>
    </div>
  );
};

export default SidebarWrapper;
