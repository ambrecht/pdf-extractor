import React, { useMemo, useRef } from 'react';
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
import UploadModal from './uploadForm';
import OptionsPanel from './OptionsPanel';
import DocumentModal from './DocumentModal';
import HistoryComponent from './History'; // Import the HistoryComponent

const Teleprompter = () => {
  const dispatch = useDispatch();
  const controlPanelVisible = useSelector(selectControlPanelVisible);
  const optionsPanelVisible = useSelector(selectOptionsPanelVisible);
  const documentsPanelVisible = useSelector(selectDocumentsPanelVisible);
  const historyTableVisible = useSelector(selectHistoryTableVisible);
  const loading = useSelector(selectLoading);
  const backgroundColor = useSelector((state) => state.theme.backgroundColor);

  const handleToggle = (toggleAction) => () => dispatch(toggleAction());

  const modalFrameRef = useRef(null);

  const buttonsConfig = useMemo(
    () => [
      { action: toggleControlPanel, label: 'C', color: 'green' },
      { action: toggleOptionsPanel, label: 'Options', color: 'orange' },
      { action: toggleDocumentsPanel, label: 'Docs', color: 'red' },
      { action: toggleHistoryTable, label: 'History', color: 'blue' },
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
      {historyTableVisible ? <HistoryComponent /> : <ParagraphDisplay />}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {buttonsConfig.map(({ action, label, color }, index) => (
          <button
            key={index}
            onClick={handleToggle(action)}
            className={`w-16 h-16 bg-${color}-500 text-white flex items-center justify-center rounded-full hover:bg-${color}-400`}
          >
            {label}
          </button>
        ))}
      </div>
      {controlPanelVisible && <ControlModal parentFrameRef={modalFrameRef} />}
      {optionsPanelVisible && (
        <OptionsPanel onClose={handleToggle(toggleOptionsPanel)} />
      )}
      {documentsPanelVisible && (
        <DocumentModal onClose={handleToggle(toggleDocumentsPanel)} />
      )}
    </div>
  );
};

export default Teleprompter;
