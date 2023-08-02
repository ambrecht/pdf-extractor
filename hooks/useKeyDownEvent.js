import { useEffect } from 'react';

const useKeyDownEvent = (handleNextClick, handlePrevClick) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === 39) {
      // Pfeiltaste nach rechts
      console.log('Right Arrow Key Pressed');
      handleNextClick(); // Zum nächsten Absatz wechseln
    } else if (event.keyCode === 37) {
      // Pfeiltaste nach links
      console.log('Left Arrow Key Pressed');
      handlePrevClick(); // Zum vorherigen Absatz wechseln
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Diese Funktion wird aufgerufen, wenn die Komponente unmountet. Sie entfernt den Event Listener, um Memory Leaks zu verhindern
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextClick, handlePrevClick]); // Abhängigkeitsarray, um sicherzustellen, dass der Event Listener nur hinzugefügt/entfernt wird, wenn sich die Funktionen ändern
};

export default useKeyDownEvent;
