import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect } from 'react';
import { getAlluser } from '../../utils/Api/userapi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { selectedUser } from '../Slices/authSlice';

const Sidebar = () => {

const[alluser,setuser] = useState([]);

// fetch all the users 
const dispatch = useDispatch();
const fetchalluser = async()=>{
  try{
     let res = await getAlluser();
     if(res.isSuccess){
        setuser(res.data);

     }
  }catch(err){
    console.log(err);
    toast.error("Something went wrong");
  }
}

const selectuser = (u)=>{

 dispatch(selectedUser({user:u?._id,username:u?.username,online:u?.isOnline}));
}
useEffect(()=>{
  fetchalluser();
},[]);
  return (
    <div className="bg-white border-end" style={{ width: '300px', overflowY: 'auto' }}>
      <div className="p-3 border-bottom">
        <h5 className="mb-0">Chats</h5>
      </div>
      {alluser.map((c, idx) => (
        <div key={c?._id} className="d-flex align-items-center px-3 py-2 border-bottom">
          <FaUserCircle size={30} className="me-2" />
          <div className='user-list' onClick={()=>selectuser(c)}>
            <div>{c.username}    <span
    className={`me-2 rounded-circle`}
    style={{
      width: '10px',
      height: '10px',
      backgroundColor: c?.isOnline ? 'green' : 'gray',
      display: 'inline-block'
    }}
  ></span> </div>
          
        
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
