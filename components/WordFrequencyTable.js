import { useState, useEffect } from 'react';
const WordFrequencyTable = ({ types }) => {
  const [wordFrequency, setWordFrequency] = useState({});
  useEffect(() => {
    const wordFrequency = {};
    Object.keys(types).forEach((type) => {
      types[type].forEach((word) => {
        if (!wordFrequency[word]) {
          wordFrequency[word] = 1;
        } else {
          wordFrequency[word] += 1;
        }
      });
    });
    setWordFrequency(wordFrequency);
  }, [types]);
  return (
    <div>
      {Object.keys(types).map((type) => (
        <div key={type}>
          <h2>{type}</h2>
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(wordFrequency)
                .filter(([word]) => types[type].includes(word))
                .sort((a, b) => b[1] - a[1])
                .map(([word, frequency]) => (
                  <tr key={word}>
                    <td>{word}</td>
                    <td>{frequency}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
// eine Funktion die folgendes berechnet 170.000 Tonnen Gold / 18,7 Millionen Bitcoin
// 1 Tonne ist gleich 1000 kg ist gleich 1000000 g ist gleich 1000000000 mg ist gleich 1000000000000 µg ist gleich 1000000000000000 ng ist gleich 1000000000000000000 pg ist gleich 1000000000000000000000 fg ist gleich 1000000000000000000000000 ag ist gleich 1000000000000000000000000000 zg ist gleich 1000000000000000000000000000000 yg ist gleich 1000000000000000000000000000000000
//1000000 g x 170000000000 = 170000000000 g
export default WordFrequencyTable;

