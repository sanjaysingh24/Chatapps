import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const contacts = [
  { name: 'Ravi Kumar', lastMsg: 'See you later!' },
  { name: 'Priya Sharma', lastMsg: 'Okay done 👍' },
  { name: 'Ankit Roy', lastMsg: 'Call me!' },
];

const Sidebar = () => {
  return (
    <div className="bg-white border-end" style={{ width: '300px', overflowY: 'auto' }}>
      <div className="p-3 border-bottom">
        <h5 className="mb-0">Chats</h5>
      </div>
      {contacts.map((c, idx) => (
        <div key={idx} className="d-flex align-items-center px-3 py-2 border-bottom">
          <FaUserCircle size={30} className="me-2" />
          <div>
            <div>{c.name}</div>
            <small className="text-muted">{c.lastMsg}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
