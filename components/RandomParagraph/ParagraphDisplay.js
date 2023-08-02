import React from 'react';
import { cleanText } from '../../utils/cleanText';

const ParagraphDisplay = ({ paragraphs }) => {
  console.log(paragraphs, cleanText(paragraphs));
  return (
    <div className="overflow-y-scroll flex-grow">
      {cleanText(paragraphs).map((paragraph, idx) => (
        <p
          key={idx}
          className={`text-5xl font-semibold text-center my-8 mx-10 leading-relaxed transition-opacity ${
            idx === 1 ? 'opacity-100' : 'opacity-50 text-gray-400'
          }`}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default ParagraphDisplay;
