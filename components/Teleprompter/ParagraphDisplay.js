import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { cleanText } from '../../utils/cleanText';

const ParagraphDisplay = () => {
  const paragraphs = useSelector((state) => state.teleprompter.paragraphs);
  const progress = useSelector((state) => state.teleprompter.progress);
  const theme = useSelector((state) => state.theme);

  const mainParagraph = cleanText(paragraphs)[1] || '';
  const totalChars = mainParagraph.length;
  const charsToColor = Math.floor(totalChars * (progress / 100));
  const targetCharRef = useRef(null);

  useEffect(() => {
    if (targetCharRef.current) {
      scrollIntoViewIfNeeded(targetCharRef.current, {
        scrollMode: 'if-needed',
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [charsToColor]);

  return (
    <div
      className="overflow-y-screen h-screen w-screen flex-grow"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {cleanText(paragraphs).map((paragraph, idx) => (
        <p
          key={idx}
          className={`font-semibold ${theme.textAlignment} my-8 mx-10 leading-relaxed`}
          style={{
            color: theme.fontColor,
            fontSize: theme.fontSize,
          }}
        >
          {paragraph.split('').map((char, charIdx) => {
            const isTargetChar = idx === 1 && charIdx < charsToColor;
            const charColor =
              theme.progressDisplay === 'color' && isTargetChar
                ? 'white'
                : theme.fontColor;
            return (
              <span
                ref={isTargetChar ? targetCharRef : null}
                key={charIdx}
                style={{
                  color: charColor,
                  animation: theme.animation === 'on' ? 'fadeIn 1s' : 'none',
                }}
              >
                {char}
              </span>
            );
          })}
        </p>
      ))}
      {theme.progressDisplay === 'bar' && (
        <div
          style={{
            height: '5px',
            width: `${progress}%`,
            backgroundColor: 'white',
          }}
        ></div>
      )}
    </div>
  );
};

export default ParagraphDisplay;
