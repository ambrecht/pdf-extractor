import React from 'react';
import ParagraphDisplay from './ParagraphDisplay';
import ControlPanel from './ControlPanel';
import useRandomParagraph from '../../hooks/useRandomParagraph';

const RandomParagraph = ({ data }) => {
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
  } = useRandomParagraph(data);
  return (
    <div className="flex flex-col h-full">
      <ParagraphDisplay paragraphs={paragraphs} />
      <ControlPanel
        handleNewParagraph={handleNewParagraph}
        handleIntervalToggle={handleIntervalToggle} // Diese Funktion wird als Prop übergeben
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
        wpm={wpm}
        setWpm={setWpm}
        time={time}
        intervalIsRunning={intervalIsRunning}
        isLinear={isLinear}
        setIsLinear={setIsLinear}
      />
    </div>
  );
};

export default RandomParagraph;
