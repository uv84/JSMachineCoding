import  { useState } from 'react';
import "./Confirmation.css";

function Confirmation() {
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  function handleClick(msg: any) {
    setToggle(false);
    setMessage(msg);
  }


  return (
    <div className="modal-container">
      <button className="open-modal-btn" onClick={()=>setToggle(!toggle)}>Open Confirmation Modal</button>

      {toggle && <div className="modal-backdrop">
        <div className="modal-box">
          <h2 className="modal-title">Confirm Action</h2>
          <p className="modal-message">Are you sure you want to proceed?</p>

          <div className="modal-buttons">
            <button className="confirm-btn" onClick={()=>handleClick("Confirmed")}>Confirm</button>
            <button className="cancel-btn" onClick={()=>handleClick("Cancelled")}>Cancel</button>
          </div>
        </div>
      </div>}

      {message && <div className="action-status">{message}</div>}
    </div>
  );
}

export default Confirmation;
