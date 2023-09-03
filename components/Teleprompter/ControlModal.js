import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTeleprompterControls from '../../hooks/useTeleprompterControls';
import { toggleControlPanel } from '../../store/navigationSlice';
import Modal from '../Modal';

const ControlModal = ({ parentFrameRef }) => {
  const dispatch = useDispatch();
  const {
    wpm,
    setWpm,
    toggleIntervalRunning,
    handleNewParagraph,
    handleNextClick,
    handlePrevClick,
    toggleMode,
    intervalIsRunning,
    time,
  } = useTeleprompterControls();

  const { wordCount, isLinear } = useSelector((state) => state.teleprompter);

  const handleClosePanel = () => {
    dispatch(toggleControlPanel());
  };

  return (
    <Modal onClose={handleClosePanel} parentFrameRef={parentFrameRef}>
      <div className="p-4 bg-white rounded shadow-lg">
        <div className="flex flex-wrap justify-center space-x-2 p-4">
          <button
            onClick={handleNewParagraph}
            className="text-sm p-1 rounded bg-blue-500 text-white hover:bg-blue-400"
          >
            Würfel
          </button>
          <button
            onClick={toggleIntervalRunning}
            className="text-sm p-1 rounded bg-blue-500 text-white hover:bg-blue-400"
          >
            {intervalIsRunning ? 'Stop Interval' : 'Start Interval'}
          </button>
          <button
            onClick={toggleMode}
            className="text-sm p-1 rounded bg-blue-500 text-white hover:bg-blue-400"
          >
            {isLinear ? 'Deaktiviere Linear' : 'Aktiviere Linear'}
          </button>
          <button
            onClick={handlePrevClick}
            className="text-sm p-1 rounded bg-green-500 text-white hover:bg-green-400"
          >
            Zurück
          </button>
          <button
            onClick={handleNextClick}
            className="text-sm p-1 rounded bg-green-500 text-white hover:bg-green-400"
          >
            Vor
          </button>
          <label className="text-sm p-1 bg-gray-300 rounded">
            Words per Minute:
          </label>
          <input
            type="number"
            min="50"
            max="1000"
            value={wpm}
            onChange={(e) => setWpm(parseInt(e.target.value))}
            className="text-sm p-1 border rounded"
          />
          <h1 className="text-sm p-1 rounded bg-green-500 text-white hover:bg-green-400">
            {time} Sekunden bei {wordCount} Wörtern
          </h1>
        </div>
      </div>
    </Modal>
  );
};

export default ControlModal;
