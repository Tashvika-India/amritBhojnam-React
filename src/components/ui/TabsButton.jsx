import React, { useState } from "react";

function TabsButtons({
  labelOne,
  labelTwo,
  activeTab,
  setActiveTab,
}) {
  const handleTabClick = (label) => {
    setActiveTab(label);
  
  };

  return (
    <div className="tabs-button-container">
      <button
        className={`tab-button me-3 px-4 lh-lg ${activeTab === labelOne ? "active" : ""}`}
        onClick={() => handleTabClick(labelOne)}
      >
        {labelOne}
      </button>
      <button
        className={`tab-button px-4 lh-lg ${activeTab === labelTwo ? "active" : ""}`}
        onClick={() => handleTabClick(labelTwo)}
      >
        {labelTwo}
      </button>
    </div>
  );
}

export default TabsButtons;
