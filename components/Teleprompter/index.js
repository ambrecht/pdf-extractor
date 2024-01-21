import React, { useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectControlPanelVisible,
  selectHistoryTableVisible,
  selectOptionsPanelVisible,
  selectDocumentsPanelVisible,
  toggleControlPanel,
  toggleHistoryTable,
  toggleOptionsPanel,
  toggleDocumentsPanel,
} from '../../store/navigationSlice';
import { selectLoading } from '../../store/uploadSlice';
import ControlModal from './ControlModal';
import ParagraphDisplay from './ParagraphDisplay';
import OptionsPanel from './OptionsPanel';
import DocumentModal from './DocumentModal';
import HistoryComponent from './History'; // Import the HistoryComponent
import useKeyDownEvent from '../../hooks/useKeyDownEvent';
import NotificationBubble from '../NotificationBibble';
import WelcomeSection from './WelcomeMessage';

const Teleprompter = () => {
  const dispatch = useDispatch();
  const controlPanelVisible = useSelector(selectControlPanelVisible);
  const optionsPanelVisible = useSelector(selectOptionsPanelVisible);
  const documentsPanelVisible = useSelector(selectDocumentsPanelVisible);
  const historyTableVisible = useSelector(selectHistoryTableVisible);
  const loading = useSelector(selectLoading);
  const backgroundColor = useSelector((state) => state.theme.backgroundColor);
  const paragraphs = useSelector((state) => state.teleprompter.paragraphs);

  const handleToggle = (toggleAction) => () => dispatch(toggleAction());

  const modalFrameRef = useRef(null);

  useKeyDownEvent();

  const [hoverMessage, setHoverMessage] = useState('');

  const handleMouseEnter = (message) => () => {
    setHoverMessage(message);
  };

  const handleMouseLeave = () => {
    setHoverMessage('');
  };

  const buttonsConfig = useMemo(
    () => [
      {
        action: toggleControlPanel,
        label: 'Control',
        color: 'green',
        message:
          'Starten Sie die automatische Absatzanzeige und steuern Sie die Geschwindikgeit  ',
      },
      {
        action: toggleOptionsPanel,
        label: 'Options',
        color: 'gray',
        message:
          'Hier können Sie die visuelle Anzeige wie Farbe und Schriftart einstellen',
      },
      {
        action: toggleDocumentsPanel,
        label: 'Docs',
        color: 'red',
        message: 'Hier können Sie Dokumente hochladen und auswählen',
      },
      {
        action: toggleHistoryTable,
        label: 'History',
        color: 'blue',
        message: 'Hier sehen Sie eine Tabelle der bisher angezeigten Absätze',
      },
    ],
    [],
  );

  return (
    <div
      id="modal-root"
      className="bg-white w-screen h-screen flex flex-col sm:justify-center sm:items-center relative overflow-hidden"
      ref={modalFrameRef}
      style={{ backgroundColor: backgroundColor }}
    >
      {historyTableVisible ? (
        <HistoryComponent />
      ) : paragraphs.length > 0 ? (
        <ParagraphDisplay />
      ) : (
        <WelcomeSection />
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {buttonsConfig.map(({ action, label, color, message }, index) => (
          <button
            key={index}
            onMouseEnter={handleMouseEnter(message)}
            onMouseLeave={handleMouseLeave}
            onClick={handleToggle(action)}
            className={`w-16 h-16 bg-${color}-500 text-white flex items-center justify-center rounded-full hover:bg-${color}-400`}
          >
            {label}
          </button>
        ))}
      </div>
      {hoverMessage && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black p-2 border border-gray-300 rounded shadow-lg">
          {hoverMessage}
        </div>
      )}
      {controlPanelVisible && <ControlModal parentFrameRef={modalFrameRef} />}
      {optionsPanelVisible && (
        <OptionsPanel onClose={handleToggle(toggleOptionsPanel)} />
      )}
      {documentsPanelVisible && (
        <DocumentModal onClose={handleToggle(toggleDocumentsPanel)} />
      )}
      <NotificationBubble></NotificationBubble>
    </div>
  );
};

export default Teleprompter;
