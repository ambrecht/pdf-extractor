import React from 'react';

const TextInput = ({ value, onChange, min, max, className, type = 'text' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className={`text-lg p-2 border rounded ${className}`}
    />
  );
};

export default TextInput;
