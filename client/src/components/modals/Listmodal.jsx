import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getAlluser } from "../../../utils/Api/userapi";
import { toast } from 'react-toastify';

const Listmodal = ({ open, close }) => {
  const [alluser, setalluser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = () => {
    if (selectedUsers.length < 2) {
        toast.warning("Select at least 2 users to create a group!",{
             position: "top-center",
              style: {
    width: '400px',
    textAlign: 'center'
  }
        });
     
      return;
    }
    console.log("Group Members:", selectedUsers);
    // Call backend API here
    close(false);
  };

  const getpeople = async () => {
    try {
      let response = await getAlluser();
      if (response?.isSuccess) {
        setalluser(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open) {
      getpeople();
    }
  }, [open]);

  return (
    <Modal show={open} onHide={() => close(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title className="custom_title">Create Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {alluser.map((item) => (
            <Form.Check
              key={item._id}
              type="checkbox"
              id={item._id}
              label={item.username}
              checked={selectedUsers.includes(item._id)}
              onChange={() => handleCheckboxChange(item._id)}
              className="mb-2"
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        
        <Button variant="primary" onClick={handleCreateGroup}>
          Create Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Listmodal;
