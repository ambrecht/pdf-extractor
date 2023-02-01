import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const RandomParagraph = ({ data }) => {
  const [paragraph, setParagraph] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [intervalIsRunning, setIntervalIsRunning] = useState(false);
  const [index, setIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [time, setTime] = useState(5);
  const [isLinear, setIsLinear] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. When the component mounts, set the paragraph state to a random paragraph
  useEffect(() => {
    let randomIndex = Math.floor(Math.random() * data.length);
    setParagraph(data[randomIndex].paragraph);
    setIndex(randomIndex);
  }, []);

  // 2. When the intervalIsRunning state changes, start or stop the interval
  useEffect(() => {
    if (intervalIsRunning) {
      let currentIndex = index;
      const id = setInterval(() => {
        if (isLinear) {
          currentIndex = (currentIndex + 1) % data.length;
        } else {
          currentIndex = Math.floor(Math.random() * data.length);
        }
        setParagraph(data[currentIndex].paragraph);
        setIndex(currentIndex);
        setHistory([...history, currentIndex]);
        console.log('time: ', time);
      }, time * 1000);
      console.log('time: ', time);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [intervalIsRunning, time, data, history, isLinear, index]);

  const handleIntervalChange = (event) => {
    console.log('Interval: ', event.target.value);
    setTime(event.target.value);
  };

  // 3. A function that generates a new random paragraph and sets the paragraph state
  const handleNewParagraph = () => {
    setParagraph(getRandomParagraph());
  };

  // 4. A function that returns a random paragraph from the data array
  const getRandomParagraph = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setIndex(randomIndex);
    setHistory([...history, randomIndex]);

    return data[randomIndex].paragraph;
  };

  // 5. A function that starts the interval
  const handleIntervalToggle = () => {
    setIntervalIsRunning((prev) => !prev);
  };

  // 6. A function that sets the index state to the next paragraph in the array
  const handleNextClick = () => {
    if (index < data.length - 1) {
      console.log('next', index);
      setParagraph(data[index + 1].paragraph);
      setIndex(index + 1);
      setHistory([...history, index + 1]);
    }
  };

  // 7. A function that sets the index state to the previous paragraph in the array
  const handlePrevClick = () => {
    if (index > 0) {
      console.log('Prev', index);
      setParagraph(data[index - 1].paragraph);
      setIndex(index - 1);
      setHistory([...history, index - 1]);
    }
  };
  console.log('history', history);
  return (
    <div>
      <p className="random-paragraph ">{paragraph}</p>
      <>
        <button onClick={handleNewParagraph}>New Paragraph</button>
        <button onClick={handleIntervalToggle}>
          {intervalIsRunning ? 'Stop Interval' : 'Start Interval'}
        </button>
        <button onClick={() => setIsLinear(!isLinear)}>
          {isLinear ? 'Deactivate Linear' : 'Activate Linear'}
        </button>
        <PrevButton onClick={handlePrevClick}>Zurück</PrevButton>
        <StopButton
          onClick={handleIntervalToggle}
          isRunning={intervalIsRunning}
        >
          {intervalIsRunning ? 'Stop Interval' : 'Start Interval'}
        </StopButton>
        <NextButton onClick={handleNextClick}>Vor</NextButton>

        <button onClick={() => navigator.clipboard.writeText(paragraph)}>
          Kopie
        </button>
        <label>Interval (in seconds):</label>
        <input
          type="number"
          min="0.5"
          max="10"
          step="0.5"
          value={time}
          onChange={handleIntervalChange}
        />

        <h3>Der Verlauf der Weisheit</h3>
        <Table>
          {history.reverse().map((item, index) => (
            <tr key={index}>
              <td />
              <td>{data[item].paragraph}</td>
              <td />
              <td />
              <td />
            </tr>
          ))}
        </Table>
      </>
    </div>
  );
};

const StyledButton = styled.button`
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  margin: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #3e8e41;
  }
  &:before {
    content: '';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    margin-right: 0.2rem;
  }
`;

const PrevButton = styled(StyledButton)`
  &:before {
    content: '\f053';
  }
`;

const NextButton = styled(StyledButton)`
  &:before {
    content: '\f054';
  }
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid black;
    padding: 0.5rem;
  }
`;

const StopButton = styled.button`
  background-color: ${(props) => (props.isRunning ? 'red' : 'green')}; /* red */
  color: white;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  border: none;

  &:hover {
    background-color: #c9302c; /* dark red */
    transform: scale(1.1);
  }
`;

export default RandomParagraph;
