import React, { useEffect } from 'react';
const MyComponent = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
    };
    window.addEventListener('keydown', handleKeyDown);
    // Event Listener entfernen, wenn die Komponente unmountet
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Leeres Abhängigkeitsarray, damit der Listener nur einmal hinzugefügt wird
  return <div>Drücken Sie eine Taste auf Ihrer Tastatur</div>;
};
export default MyComponent;
