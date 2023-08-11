import React from 'react';

const ControlPanel = ({
  wpm,
  setWpm,
  paragraphs,
  index,
  time,
  intervalIsRunning,
  isLinear,
  wordCount,
  progress,
  elapsedTime,
  intervalProgress,
  updateIndex,
  updateTeleprompterData,
  toggleIntervalRunning,
  toggleLinearMode,
  setWordCount,
  setProgress,
  handleNewParagraph,
  handleNextClick,
  handlePrevClick,
  updateTeleprompterDataHandler,
}) => {
  return (
    <div className="relative bg-white p-4 shadow-md">
      <div className="flex flex-wrap justify-center space-x-2">
        <div className="bg-white p-4 shadow-md">
          <div className="flex flex-wrap justify-center space-x-2">
            <button
              onClick={handleNewParagraph}
              className="text-lg p-2 rounded bg-blue-500 text-white hover:bg-blue-400"
            >
              New Paragraph
            </button>
            <button
              onClick={toggleIntervalRunning}
              className="text-lg p-2 rounded bg-blue-500 text-white hover:bg-blue-400"
            >
              {intervalIsRunning ? 'Stop Interval' : 'Start Interval'}
            </button>
            <button
              onClick={toggleLinearMode}
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
          <select>
            <option value="text-5xl">Large</option>
            <option value="text-3xl">Medium</option>
            <option value="text-xl">Small</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
