import React, { useState, useEffect, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

/**
 * NotificationBubble component to display notifications when certain values change.
 * @component
 */
const NotificationBubble = () => {
  const teleprompterState = useSelector(
    (state) => state.teleprompter,
    shallowEqual,
  );

  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const prevState = useRef(teleprompterState);

  useEffect(() => {
    let timer;
    if (messages.length) {
      setVisible(true);
      timer = setTimeout(() => {
        setVisible(false);
        setMessages([]);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [messages]);

  useEffect(() => {
    const messageTemplates = {
      wpm: 'WPM geändert',
      index: 'Index geändert',
      isLinear: 'Linearer Modus',
      time: 'Zeit geändert',
      intervalIsRunning: 'Intervallstatus',
      wordCount: 'Wortanzahl geändert',
      bookID: 'Buch-ID geändert',
    };
    const newMessages = [];
    for (const [key, value] of Object.entries(teleprompterState)) {
      if (prevState.current[key] !== value) {
        let msg = messageTemplates[key];
        if (msg) {
          if (key === 'isLinear') {
            msg += `: ${value ? 'Aktiviert' : 'Deaktiviert'}`;
          } else if (key === 'intervalIsRunning') {
            msg += `: ${value ? 'Läuft' : 'Gestoppt'}`;
          } else {
            msg += `: ${value}`;
          }
          newMessages.push(msg);
        }
      }
    }
    if (newMessages.length) {
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    }
    prevState.current = teleprompterState;
  }, [teleprompterState]);

  return (
    visible && (
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '10px',
          borderRadius: '5px',
          color: '#fff',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '5px 0' }}>
            {msg}
          </div>
        ))}
      </div>
    )
  );
};

export default NotificationBubble;
