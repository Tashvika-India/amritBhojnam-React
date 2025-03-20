import React from "react";

function YellowButton({ lable, disabled = false, loader = false , handleClick }) {
  return (
    <button disabled={disabled} className="btn-yellow fw-500" onClick={handleClick}>
      {lable}
    </button>
  );
}

export default YellowButton;
