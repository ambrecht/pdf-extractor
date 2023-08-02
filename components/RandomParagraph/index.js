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
    wordCount,
    progress,
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
  } = useRandomParagraph(data);
  return (
    <div className="flex flex-col h-full">
      <ParagraphDisplay
        paragraphs={paragraphs}
        progress={progress}
        time={time}
        fontSize={fontSize}
        fontColor={fontColor}
      />
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
        wordCount={wordCount}
        setFontSize={setFontSize}
        setFontColor={setFontColor}
      />
    </div>
  );
};

export default RandomParagraph;
