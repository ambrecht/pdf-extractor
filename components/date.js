import React, { useState, useEffect } from 'react';

const Index = () => {
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch('api/date')
      .then((response) => response.text())
      .then((data) => setDate(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <p>Current date: {date}</p>
    </div>
  );
};

export default Index;
