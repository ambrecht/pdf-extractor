// withLoading.js
import React from 'react';

/**
 * Higher-Order Component to wrap an Element with a loading spinner
 * @param {React.ElementType} Element - The React component to wrap
 * @returns {React.FC} - The wrapped component
 */
const withLoading = (Element) => {
  return function WrappedComponent({ loading, ...props }) {
    if (loading) {
      return <div>Loading Spinner...</div>; // Replace with your spinner component
    }
    return <Element {...props} />;
  };
};

export default withLoading;
