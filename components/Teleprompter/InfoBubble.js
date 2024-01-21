import React, { useState, useEffect } from 'react';

const InfoBubble = ({ message }) => (
  <div className="absolute bg-white border border-gray-300 p-2 rounded shadow-lg">
    {message}
  </div>
);

const HoverButton = () => {
  const [showInfo, setShowInfo] = useState(false);
  let hoverTimer;

  const handleMouseEnter = () => {
    hoverTimer = setTimeout(() => {
      setShowInfo(true);
    }, 1000); // 1000 Millisekunden = 1 Sekunde
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setShowInfo(false);
  };

  return (
    <div className="relative">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Hover über mich
      </button>
      {showInfo && <InfoBubble message="Dieser Button macht XYZ" />}
    </div>
  );
};

export default HoverButton;
