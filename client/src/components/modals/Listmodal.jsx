import React from "react";
import { useEffect } from "react";
import { getAlluser } from "../../../utils/Api/userapi";
const Listmodal = ({ open, close }) => {
  const [alluser, setalluser] = React.useState([]);
  if (!open) return null;
  const handleclose = () => {
    close(false);
  };

  // get all users

  const getpeople = async () => {
    try {
      let response = await getAlluser();

      if (response?.isSuccess) {
        const { data } = response;
        setalluser(data);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getpeople();
  }, [open]);
  return (
    <div className="modal-overlay" onClick={() => close(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => close(false)}>
          ✖
        </button>

        <div>sanju baba</div>
      </div>
    </div>
  );
};

export default Listmodal;
