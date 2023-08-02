import React from 'react';

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
}) => {
  return (
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
          onChange={(e) => setWpm(e.target.value)}
          className="text-lg p-2 border rounded"
        />
        <h1 className="text-lg p-2 rounded bg-green-500 text-white hover:bg-green-400">
          Sekunden{time}
        </h1>
      </div>
    </div>
  );
};

export default ControlPanel;
