import React, { useRef, useMemo, useCallback } from 'react';
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

/**
 * Calculates the color of a character based on various conditions.
 *
 * @param {boolean} isTargetChar - Indicates if the character is the target character.
 * @param {Object} theme - The theme object containing various style properties.
 * @param {number} idx - The index of the paragraph.
 * @returns {string} - The color code for the character.
 */
const calculateCharColor = (isTargetChar, theme, idx) => {
  if (theme.progressDisplay === 'color' && idx === 1) {
    return isTargetChar ? theme.fontColor : '#808080';
  }
  return idx === 1 ? theme.fontColor : '#808080';
};

/**
 * The ParagraphDisplay component which displays paragraphs with various styles and functionalities.
 *
 * @component
 * @returns {React.Element} - The rendered component.
 */
const ParagraphDisplay = () => {
  const localProgress = useProgressUpdate();
  const { paragraphs, intervalIsRunning } = useSelector(
    (state) => state.teleprompter,
  );
  const theme = useSelector((state) => state.theme);

  const cleanedParagraphs = useMemo(() => cleanText(paragraphs), [paragraphs]);
  const mainParagraph = cleanedParagraphs[1] || '';
  const totalChars = mainParagraph.length;
  const charsToColor = Math.floor(totalChars * (localProgress / 100));

  const mainParagraphRef = useRef(null);

  useScrollIntoView(mainParagraphRef, intervalIsRunning);

  const progressBarColor =
    theme.progressDisplay === 'bar' ? theme.fontColor : 'white';

  /**
   * Renders a paragraph with various styles and functionalities.
   *
   * @param {string} paragraph - The paragraph to be rendered.
   * @param {number} idx - The index of the paragraph.
   * @returns {React.Element} - The rendered paragraph.
   */
  const renderParagraph = useCallback(
    (paragraph, idx) => (
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
          const isTarget = charIdx === charsToColor;

          return (
            <StyledSpan
              key={charIdx}
              color={charColor}
              animate={theme.animation === 'on'}
              isTarget={isTarget}
            >
              {char}
            </StyledSpan>
          );
        })}
      </StyledParagraph>
    ),
    [theme, charsToColor],
  );

  return (
    <StyledDiv bgColor={theme.backgroundColor}>
      {cleanedParagraphs.map(renderParagraph)}
      {intervalIsRunning && theme.progressDisplay === 'bar' && (
        <ProgressBar bgColor={progressBarColor} progress={localProgress} />
      )}
    </StyledDiv>
  );
};

export default React.memo(ParagraphDisplay);
