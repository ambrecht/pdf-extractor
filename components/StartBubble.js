import React, { useState } from 'react';

const SpeechBubbleComponent = () => {
  const [showBubble, setShowBubble] = useState(false);

  const toggleBubble = () => {
    setShowBubble(!showBubble);
  };

  return (
    <div className="flex justify-center mt-5">
      <button
        onClick={toggleBubble}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        PDF auswählen
      </button>
      {showBubble && (
        <div className="absolute p-4 bg-white border border-gray-400 rounded-lg shadow-lg text-center w-72 -mt-24">
          Um zu starten klicke hier, wähle ein PDF aus oder lade ein neues
          PDF-Dokument hoch
        </div>
      )}
    </div>
  );
};

export default SpeechBubbleComponent;
