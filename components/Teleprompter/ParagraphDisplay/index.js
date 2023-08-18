import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';

// Importieren Sie die Hooks
import useScrollIntoView from '../../../hooks/useScrollIntoView';
import useParagraphUpdate from '../../../hooks/useParagraphUpdate';
import useProgressUpdate from '../../../hooks/useProgressUpdate';

import { cleanText } from '../../../utils/cleanText';
import { updateIndexBasedOnMode as getNewIndex } from '../../../utils/updateIndexBasedOnMode';
import {
  StyledDiv,
  StyledParagraph,
  StyledSpan,
  ProgressBar,
} from './styles.js';

const ParagraphDisplay = () => {
  const paragraphs = useSelector((state) => state.teleprompter.paragraphs);
  const progress = useSelector((state) => state.teleprompter.progress);
  const theme = useSelector((state) => state.theme);
  const mainParagraph = cleanText(paragraphs)[1] || '';
  const totalChars = mainParagraph.length;
  const charsToColor = Math.floor(totalChars * (progress / 100));
  const targetCharRef = useRef(null);
  const mainParagraphRef = useRef(null); // Ref for the main paragraph

  const cleanedParagraphs = useMemo(() => cleanText(paragraphs), [paragraphs]);

  const { intervalIsRunning } = useSelector((state) => state.teleprompter);

  // Verwenden Sie die Hooks
  useScrollIntoView(mainParagraphRef, intervalIsRunning);
  useProgressUpdate(getNewIndex);
  useParagraphUpdate();

  const progressBarColor =
    theme.progressDisplay === 'bar' ? theme.fontColor : 'white';

  return (
    <StyledDiv bgColor={theme.backgroundColor}>
      {cleanedParagraphs.map((paragraph, idx) => (
        <StyledParagraph
          ref={idx === 1 ? mainParagraphRef : null} // Setzen Sie die Referenz für den Hauptabsatz
          key={idx}
          align={theme.textAlignment}
          color={idx === 1 ? theme.fontColor : '#808080'}
          size={theme.fontSize}
        >
          {paragraph.split('').map((char, charIdx) => {
            const isTargetChar = idx === 1 && charIdx <= charsToColor;
            const charColor =
              theme.progressDisplay === 'color' && idx === 1
                ? isTargetChar
                  ? theme.fontColor
                  : '#808080'
                : idx === 1
                ? theme.fontColor
                : '#808080';
            return (
              <StyledSpan
                ref={isTargetChar ? targetCharRef : null}
                key={charIdx}
                color={charColor}
                animate={theme.animation === 'on'}
                isTarget={charIdx === charsToColor}
                isAdjacent={
                  charIdx === charsToColor - 1 || charIdx === charsToColor + 1
                }
              >
                {char}
              </StyledSpan>
            );
          })}
        </StyledParagraph>
      ))}
      {theme.progressDisplay === 'bar' && (
        <ProgressBar bgColor={progressBarColor} progress={progress} />
      )}
    </StyledDiv>
  );
};

export default React.memo(ParagraphDisplay);
