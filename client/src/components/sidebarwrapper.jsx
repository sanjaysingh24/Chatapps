// SidebarWrapper.js
import React from "react";
import { FaCommentDots, FaUser, FaCog } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { LuCircleDashed } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { logoutuser } from "../../utils/Api/userapi";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../Slices/authSlice";
const SidebarWrapper = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
  const  handlelogout = async()=>{
    try{
       let res = await logoutuser();
       if(res?.isSuccess){
        dispatch(logout());
        navigate('/')
       }

    }catch(err){
      console.log(err);
    }

  }
  return (
    <div className="d-flex flex-column align-items-center bg-dark text-white p-2" style={{ width: '60px', height: '100vh' }}>
      
      <div className="d-flex flex-column align-items-center gap-4 mt-4 ">
        <FaCommentDots title="Chats" size={20}  className="user-list" />

        {/* <FaPhone title="Calls" size={20} /> */}
        <LuCircleDashed title="Status" size={20} className="user-list" />
        <FaCog title="Settings" size={20}  className="user-list" />
        <IoMdLogOut title="logout" size={20} className="user-list" onClick={handlelogout}></IoMdLogOut>
      </div>
    </div>
  );
};

export default SidebarWrapper;
