// SidebarWrapper.js
import React, { useState } from "react";
import { FaCommentDots, FaUser, FaCog } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { LuCircleDashed } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { logoutuser } from "../../utils/Api/userapi";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { MdGroupAdd } from "react-icons/md";
import { logout } from "../Slices/authSlice";
import Listmodal from "./modals/Listmodal";
const SidebarWrapper = () => {
const navigate = useNavigate();
const dispatch = useDispatch();

const[openlist,setopenlist] = useState(false);
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


  const handleopenlist = async()=>{
    setopenlist(!openlist);
  }
  return (
    <>
    <div className="d-flex flex-column align-items-center bg-dark text-white p-2" style={{ width: '60px', height: '100vh' }}>
      
      <div className="d-flex flex-column align-items-center gap-4 mt-4 ">
        <FaCommentDots title="Chats" size={20}  className="user-list" />

        {/* <FaPhone title="Calls" size={20} /> */}
        <MdGroupAdd  title = "addgroup" size ={20} className="user-list" onClick={handleopenlist}/>
        <LuCircleDashed title="Status" size={20} className="user-list" />
        <FaCog title="Settings" size={20}  className="user-list" />
        <IoMdLogOut title="logout" size={20} className="user-list" onClick={handlelogout}></IoMdLogOut>
      </div>
    </div>
   {openlist && <Listmodal open={openlist} close={setopenlist} />}
  </>
  );
};

export default SidebarWrapper;
