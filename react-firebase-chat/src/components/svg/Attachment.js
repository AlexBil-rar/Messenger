import React from "react";

const Attachment = () => {
  return (
    <svg
    className="attachment"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "25px", height: "25px", cursor: "pointer"}}
      viewBox="0 0 32 32"
    >
    <path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z"/>
    <path d="M16,23a1,1,0,0,1-1-1V10a1,1,0,0,1,2,0V22A1,1,0,0,1,16,23Z"/>
    <path d="M22,17H10a1,1,0,0,1,0-2H22a1,1,0,0,1,0,2Z"/>
    </svg>
  );
};

export default Attachment;
