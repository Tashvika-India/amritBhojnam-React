import React from "react";

function YellowButton({ lable, disabled = false, loader = false }) {
  return (
    <button disabled={disabled} className="btn-yellow">
      {lable}
    </button>
  );
}

export default YellowButton;
