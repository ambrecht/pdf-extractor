import React, { useState } from 'react';

import useRandomParagraph from '../../hooks/useRandomParagraph';
import HistoryTable from '../historyTable';
import Navigation from './Navigation';
import UploadForm from './uploadForm';
import ControlPanel from './ControlPanel';

const Teleprompter = ({ data }) => {
  const handleResponse = (response) => {
    setResponseData(response);
  };
  const [responseData, setResponseData] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const {
    paragraphs,
    handleNewParagraph,
    handleIntervalToggle, // Diese Funktion wird definiert
    handleNextClick,
    handlePrevClick,
    wpm,
    setWpm,
    time,
    intervalIsRunning,
    isLinear,
    setIsLinear,
    wordCount,
    progress,
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
    history,
  } = useRandomParagraph(data);
  return (
    <div className="bg-black min-h-screen flex flex-col sm:justify-center sm:items-center">
      <Navigation
        setShowUpload={setShowUpload}
        setShowControlPanel={setShowControlPanel}
        showUpload={showUpload}
        showControlPanel={showControlPanel}
      />
      {showUpload && <UploadForm onResponse={handleResponse} />}
      {showControlPanel && (
        <ControlPanel
          handleNewParagraph={handleNewParagraph}
          handleIntervalToggle={handleIntervalToggle}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          wpm={wpm}
          setWpm={setWpm}
          time={time}
          intervalIsRunning={intervalIsRunning}
          isLinear={isLinear}
          setIsLinear={setIsLinear}
          wordCount={wordCount}
          setFontSize={setFontSize}
          setFontColor={setFontColor}
        />
      )}
      {responseData && <div>Response erhalten</div>}
    </div>
  );
};

export default Teleprompter;
