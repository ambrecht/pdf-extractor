import React, { useRef, useEffect } from 'react';
import { cleanText } from '../../utils/cleanText';
import bezier from 'bezier-easing';

const cubicBezierEasing = bezier(0.25, 0.25, 0.75, 0.75);

const ParagraphDisplay = ({
  paragraphs,
  progress,
  time,
  fontSize,
  fontColor,
}) => {
  const adjustedProgress = progress * (time / (time - 1));
  const scrollContainerRef = useRef(null);
  const currentParagraphRef = useRef(null);
  const currentCharRef = useRef(null);

  const centerParagraph = () => {
    if (scrollContainerRef.current && currentParagraphRef.current) {
      const container = scrollContainerRef.current;
      const currentParagraph = currentParagraphRef.current;
      const containerHeight = container.clientHeight;
      const paragraphHeight = currentParagraph.clientHeight;
      const containerTop = container.getBoundingClientRect().top;
      const paragraphTop = currentParagraph.getBoundingClientRect().top;

      if (
        paragraphHeight > containerHeight ||
        paragraphTop - containerTop !== containerHeight / 2
      ) {
        const scrollPosition =
          paragraphTop -
          containerTop +
          containerHeight / 2 -
          paragraphHeight / 2;
        container.scrollTop = scrollPosition;
      }
    }
  };

  const focusCurrentChar = () => {
    if (scrollContainerRef.current && currentCharRef.current) {
      const container = scrollContainerRef.current;
      const currentChar = currentCharRef.current;
      const charTop = currentChar.getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;
      const containerBottom = container.getBoundingClientRect().bottom;

      if (charTop < containerTop || charTop > containerBottom) {
        container.scrollTop += charTop - (containerTop + containerBottom) / 2;
      }
    }
  };

  useEffect(centerParagraph, [paragraphs]);
  useEffect(focusCurrentChar, [adjustedProgress]);

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-hidden flex-grow flex flex-col justify-center"
    >
      {cleanText(paragraphs).map((paragraph, idx) => (
        <p
          ref={idx === 1 ? currentParagraphRef : null}
          key={idx}
          className={`${fontSize} font-semibold text-center my-8 mx-10 leading-relaxed`}
          style={{ color: idx === 1 ? fontColor : 'gray' }}
        >
          {paragraph.split('').map((char, charIdx) => {
            const charProgress = (charIdx / paragraph.split('').length) * 100;
            const easedProgress =
              cubicBezierEasing(adjustedProgress / 100) * 100;
            return (
              <span
                ref={
                  idx === 1 && charProgress < easedProgress
                    ? currentCharRef
                    : null
                }
                key={charIdx}
                style={{
                  color:
                    idx === 1 && charProgress < easedProgress
                      ? 'white'
                      : 'gray',
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
