import { useEffect } from 'react';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

const useScrollIntoView = (ref, intervalIsRunning) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && intervalIsRunning) {
        scrollIntoViewIfNeeded(ref.current, {
          scrollMode: 'if-needed',
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [ref, intervalIsRunning]);
};

export default useScrollIntoView;
