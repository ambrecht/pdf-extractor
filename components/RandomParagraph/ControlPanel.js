import React, { useState } from 'react';

const ControlPanel = ({
  handleNewParagraph,
  handleIntervalToggle,
  handleNextClick,
  handlePrevClick,
  wpm,
  setWpm,
  time,
  intervalIsRunning,
  isLinear,
  setIsLinear,
  wordCount,
  setFontSize,
  setFontColor,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="relative">
      {/* Schaltfläche zum Ein-/Ausblenden des Panels */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute top-0 right-0 bg-gray-500 text-white p-2"
      >
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && (
        <div className="bg-white p-4 shadow-md">
          <div className="bg-white p-4 shadow-md">
            <div className="flex flex-wrap justify-center space-x-2">
              <button
                onClick={handleNewParagraph}
                className="text-lg p-2 rounded bg-blue-500 text-white hover:bg-blue-400"
              >
                New Paragraph
              </button>
              <button
                onClick={handleIntervalToggle}
                className="text-lg p-2 rounded bg-blue-500 text-white hover:bg-blue-400"
              >
                {intervalIsRunning ? 'Stop Interval' : 'Start Interval'}
              </button>
              <button
                onClick={() => setIsLinear(!isLinear)}
                className="text-lg p-2 rounded bg-blue-500 text-white hover:bg-blue-400"
              >
                {isLinear ? 'Deactivate Linear' : 'Activate Linear'}
              </button>
              <button
                onClick={handlePrevClick}
                className="text-lg p-2 rounded bg-green-500 text-white hover:bg-green-400"
              >
                Zurück
              </button>
              <button
                onClick={handleNextClick}
                className="text-lg p-2 rounded bg-green-500 text-white hover:bg-green-400"
              >
                Vor
              </button>
              <label className="text-lg p-2">Words per Minute:</label>
              <input
                type="number"
                min="50"
                max="1000"
                value={wpm}
                onChange={(e) => setWpm(parseInt(e.target.value))}
                className="text-lg p-2 border rounded"
              />
              <h1 className="text-lg p-2 rounded bg-green-500 text-white hover:bg-green-400">
                {time} Sekunden bei {wordCount} Wörtern
              </h1>
            </div>
            <label className="text-lg p-2">Font Size:</label>
            <select
              onChange={(e) => setFontSize(e.target.value)}
              className="text-lg p-2 border rounded"
            >
              <option value="text-5xl">Large</option>
              <option value="text-3xl">Medium</option>
              <option value="text-xl">Small</option>
            </select>

            <label className="text-lg p-2">Font Color:</label>
            <input
              type="color"
              onChange={(e) => setFontColor(e.target.value)}
              className="text-lg p-2 border rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
