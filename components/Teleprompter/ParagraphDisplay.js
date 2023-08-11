import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { cleanText } from '../../utils/cleanText';

const ParagraphDisplay = () => {
  const paragraphs = useSelector((state) => state.teleprompter.paragraphs);
  const progress = useSelector((state) => state.teleprompter.progress);
  const time = useSelector((state) => state.teleprompter.time);

  const adjustedProgress = progress * (time / (time - 1));
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
  }, [adjustedProgress]);

  return (
    <div className="overflow-y-screen h-screen w-screen flex-grow">
      {cleanText(paragraphs).map((paragraph, idx) => (
        <p
          key={idx}
          className={`16 font-semibold text-center my-8 mx-10 leading-relaxed`}
          style={{ color: idx === 1 ? 'red' : 'gray' }}
        >
          {paragraph.split('').map((char, charIdx) => {
            const charProgress = (charIdx / paragraph.split('').length) * 100;
            const isTargetChar = idx === 1 && charProgress < adjustedProgress;

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
