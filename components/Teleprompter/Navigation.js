import React from 'react';
// Navigation.js
const Navigation = ({
  setShowUpload,
  setShowControlPanel,
  showUpload,
  showControlPanel,
}) => (
  <div className="bg-gray-800 p-4 flex justify-between items-center">
    <button
      onClick={() => setShowUpload(!showUpload)}
      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
    >
      Upload
    </button>
    <button
      onClick={() => setShowControlPanel(!showControlPanel)}
      className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
    >
      Control Panel
    </button>
  </div>
);

export default Navigation;
