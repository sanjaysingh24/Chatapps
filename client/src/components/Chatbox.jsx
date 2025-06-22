import React, { useState } from 'react';

import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { messages } from '../../utils/Api/userapi';
import { getSocket } from '../config/socket';
const ChatBox = () => {

const selectedUser = useSelector((state)=>state.auth.selectedUser);
const username = useSelector((state)=>state.auth.username);
const online = useSelector((state)=>state.auth.online);

 let cid = localStorage.getItem('id');
let currentid;
const[mymessages,setAllmessages] = useState([]);
const [isTyping, setIsTyping] = useState(false);
    const socket = getSocket();
// get all messages 
const allmessages = async(selectedUser)=>{
  try{
    let response = await messages(selectedUser);
  const{data} = response;
  if(response.isSuccess){
    setAllmessages(data);
    console.log(data);
  }else{
    setAllmessages([]);
    console.log("No messages found");
  }
    
  }catch(err){
    console.log("Error fetching messages:", err);
  }

}

useEffect(()=>{
  allmessages(selectedUser);
 
 
 
  
},[selectedUser])
  useEffect(() => {


    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
  
      console.log("Received message:", newMessage);
    
     
  
        setAllmessages((prev) => [...prev, newMessage]);
      
    };

    socket.on('receivemessage', handleReceiveMessage);

    return () => {
      socket.off('receivemessage', handleReceiveMessage);
    };
  }, [socket]);
useEffect(() => {
  if (!socket) return;

  socket.on('typing', ({ from }) => {
    if (from === selectedUser) {
      setIsTyping(true);
    }
  });

  socket.on('stoptyping', ({ from }) => {
    if (from === selectedUser) {
      setIsTyping(false);
    }
  });

  return () => {
    socket.off('typing');
    socket.off('stoptyping');
  };
}, [socket, selectedUser]);

  useEffect(() => {


    if (!socket) return;

    const sendMessage = (newMessage) => {
  

     
  
        setAllmessages((prev) => [...prev, newMessage]);
      
    };

    socket.on('mymessage', sendMessage );

    return () => {
      socket.off('mymessage', sendMessage );
    };
  }, [socket]);



 return (
    selectedUser ? (
      <div className="flex-grow-1 d-flex flex-column bg-light">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
          <h6 className="mb-0 text-capitalize">{username} <span>    {isTyping && (
  <div className=" mb-0 mt-1 text-muted  custom_fontsize" style={{ fontStyle: 'italic' }}>
    Typing...
  </div>
)}</span></h6>
          <span className="text-muted">{ online==true ? 'Online':'Offline'}</span>
        </div>


       <div className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
  {mymessages.length > 0 ? (
    <>
      {mymessages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 ${msg.sender === cid ? 'text-end' : 'text-start'}`}
        >
          <span
            className={`badge ${
              msg.sender === cid ? 'bg-primary text-light' : 'bg-secondary'
            }`}
          >
            {msg.content}
          </span>
          <div
            className={`${
              msg.sender === cid ? 'text-end' : 'text-start'
            }`}
            style={{ fontSize: '10px', opacity: 0.6, marginTop: '4px' }}
          >
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      ))}

      {/* ✅ Typing indicator rendered only once at bottom */}
      {isTyping && (
        <div className=" d-flex align-items-start">
          <div className="bg-secondary text-light rounded p-1">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="text-center text-muted">No messages yet</div>
  )}
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
