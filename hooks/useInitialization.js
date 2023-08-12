import { useState, useEffect } from 'react';
const useInitialization = (data) => {
  const [paragraph, setParagraph] = useState('');
  const [index, setIndex] = useState(null);
  useEffect(() => {
    let randomIndex = Math.floor(Math.random() * data.length);
    let rawpara = data[randomIndex].paragraph;
    setParagraph(rawpara);
    setIndex(randomIndex);
  }, []);
  return [paragraph, setParagraph, index, setIndex];
};
export default useInitialization;
