import React from 'react';

const CloseButton = ({ onClose }) => (
  <button
    onClick={onClose}
    className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
  >
    Schließen
  </button>
);

export default CloseButton;
