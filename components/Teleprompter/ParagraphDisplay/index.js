import React, { useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useScrollIntoView from '../../../hooks/useScrollIntoView';
import useProgressUpdate from '../../../hooks/useProgressUpdate';
import { cleanText } from '../../../utils/cleanText';
import {
  StyledDiv,
  StyledParagraph,
  StyledSpan,
  ProgressBar,
} from './styles.js';

const calculateCharColor = (isTargetChar, theme, idx) => {
  if (theme.progressDisplay === 'color' && idx === 1) {
    return isTargetChar ? theme.fontColor : '#808080';
  }
  return idx === 1 ? theme.fontColor : '#808080';
};

const ParagraphDisplay = () => {
  const localProgress = useProgressUpdate();
  console.log('local2', localProgress);
  const { paragraphs, intervalIsRunning } = useSelector(
    (state) => state.teleprompter,
  );
  const theme = useSelector((state) => state.theme);

  const mainParagraph = useMemo(
    () => cleanText(paragraphs)[1] || '',
    [paragraphs],
  );
  const totalChars = mainParagraph.length;
  const charsToColor = Math.floor(totalChars * (localProgress / 100));

  const mainParagraphRef = useRef(null);

  const cleanedParagraphs = useMemo(() => cleanText(paragraphs), [paragraphs]);

  useScrollIntoView(mainParagraphRef, intervalIsRunning);

  const progressBarColor =
    theme.progressDisplay === 'bar' ? theme.fontColor : 'white';

  return (
    <StyledDiv bgColor={theme.backgroundColor}>
      {cleanedParagraphs.map((paragraph, idx) => (
        <StyledParagraph
          ref={idx === 1 ? mainParagraphRef : null}
          key={idx}
          align={theme.textAlignment}
          color={theme.fontColor}
          size={theme.fontSize}
        >
          {paragraph.split('').map((char, charIdx) => {
            const isTargetChar = idx === 1 && charIdx <= charsToColor;
            const charColor = calculateCharColor(isTargetChar, theme, idx);

            return (
              <StyledSpan
                key={charIdx}
                color={charColor}
                animate={theme.animation === 'on'}
                isTarget={charIdx === charsToColor}
              >
                {char}
              </StyledSpan>
            );
          })}
        </StyledParagraph>
      ))}
      {intervalIsRunning && theme.progressDisplay === 'bar' && (
        <ProgressBar bgColor={progressBarColor} progress={localProgress} />
      )}
    </StyledDiv>
  );
};

export default React.memo(ParagraphDisplay);
