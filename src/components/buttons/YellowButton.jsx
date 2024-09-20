import React from "react";

function YellowButton({ lable, disabled = false, loader = false , handleClick }) {
  return (
    <button disabled={disabled} className="btn-yellow" onClick={handleClick}>
      {lable}
    </button>
  );
}

export default YellowButton;
