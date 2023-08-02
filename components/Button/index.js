import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`text-lg p-2 rounded bg-blue-500 text-white hover:bg-blue-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
