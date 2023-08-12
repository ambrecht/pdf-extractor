import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { cleanText } from '../../utils/cleanText';
const ParagraphDisplay = () => {
  const paragraphs = useSelector((state) => state.teleprompter.paragraphs);
  const progress = useSelector((state) => state.teleprompter.progress);
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
    <div className="overflow-y-screen h-screen w-screen flex-grow">
      {cleanText(paragraphs).map((paragraph, idx) => (
        <p
          key={idx}
          className={`16 font-semibold text-center my-8 mx-10 leading-relaxed`}
          style={{ color: idx === 1 ? 'red' : 'gray' }}
        >
          {paragraph.split('').map((char, charIdx) => {
            const isTargetChar = idx === 1 && charIdx < charsToColor;
            return (
              <span
                ref={isTargetChar ? targetCharRef : null}
                key={charIdx}
                style={{
                  color: isTargetChar ? 'white' : 'gray',
                }}
              >
                {char}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
};
export default ParagraphDisplay;
