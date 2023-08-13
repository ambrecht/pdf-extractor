import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';

import { toggleControlPanel } from '../../store/navigationSlice';

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
  toggleMode,
  setWordCount,
  setProgress,
  handleNewParagraph,
  handleNextClick,
  handlePrevClick,
  updateTeleprompterDataHandler,
  nextMode,
}) => {
  const dispatch = useDispatch();

  const handleOptionsPanelToggle = () => {
    dispatch(toggleOptionsPanel());
  };

  const handleClosePanel = () => {
    dispatch(toggleControlPanel());
  };

  return (
    <Modal>
      <div className="bg-white p-4 shadow-md w-full max-w-screen-lg mx-auto">
        <button
          onClick={handleClosePanel}
          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full hover:bg-red-400"
        >
          X
        </button>
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
            onClick={toggleMode}
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
          <label className="text-lg p-2 bg-slate-600">Words per Minute:</label>
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
      </div>
    </Modal>
  );
};

export default ControlPanel;
