import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { cleanText } from '../../utils/cleanText';
import styled from 'styled-components';

const StyledDiv = styled.div`
  overflow-y: auto;
  max-height: 100vh;
  max-width: 100vw;
  flex-grow: 1;
  background-color: ${(props) => props.bgColor};
  padding: 1rem;
`;

const StyledParagraph = styled.p`
  font-weight: 600;
  text-align: ${(props) => props.align};
  margin: 0.5rem 1rem;
  line-height: 1.75;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  word-wrap: break-word;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.color};
  animation: ${(props) => (props.animate ? 'fadeIn 1s' : 'none')};
`;

const ProgressBar = styled.div`
  height: 0.25rem;
  background-color: ${(props) => props.bgColor || 'white'};
  width: ${(props) => `${props.progress}%`};
`;

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (mainParagraphRef.current) {
        scrollIntoViewIfNeeded(mainParagraphRef.current, {
          scrollMode: 'if-needed',
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  const progressBarColor =
    theme.progressDisplay === 'bar' ? theme.fontColor : 'white';

  return (
    <StyledDiv bgColor={theme.backgroundColor}>
      {cleanedParagraphs.map((paragraph, idx) => (
        <StyledParagraph
          ref={idx === 1 ? mainParagraphRef : null} // Setzen Sie die Referenz für den Hauptabsatz
          key={idx}
          align={theme.textAlignment}
          color={
            idx === 1 &&
            (theme.progressDisplay === 'color' ||
              theme.progressDisplay === 'none')
              ? theme.fontColor
              : '#808080'
          }
          size={theme.fontSize}
        >
          {paragraph.split('').map((char, charIdx) => {
            const isTargetChar = idx === 1 && charIdx < charsToColor;
            const charColor =
              theme.progressDisplay === 'color' && idx === 1
                ? isTargetChar
                  ? theme.fontColor
                  : '#808080'
                : theme.progressDisplay !== 'color' && idx === 1
                ? theme.fontColor
                : '#808080';
            return (
              <StyledSpan
                ref={isTargetChar ? targetCharRef : null}
                key={charIdx}
                color={charColor}
                animate={theme.animation === 'on'}
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
