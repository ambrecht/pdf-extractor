import React, { useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectControlPanelVisible,
  selectUploadFormVisible,
  selectOptionsPanelVisible,
  selectDocumentsPanelVisible,
  toggleControlPanel,
  toggleUploadForm,
  toggleOptionsPanel,
  toggleDocumentsPanel,
} from '../../store/navigationSlice';
import { selectLoading } from '../../store/uploadSlice';
import ControlModal from './ControlModal';
import ParagraphDisplay from './ParagraphDisplay';
import UploadModal from './uploadModal';
import OptionsPanel from './OptionsPanel';
import DocumentModal from './DocumentModal';

const Teleprompter = () => {
  const dispatch = useDispatch();
  const controlPanelVisible = useSelector(selectControlPanelVisible);
  const uploadFormVisible = useSelector(selectUploadFormVisible);
  const optionsPanelVisible = useSelector(selectOptionsPanelVisible);
  const documentsPanelVisible = useSelector(selectDocumentsPanelVisible);
  const loading = useSelector(selectLoading);

  const handleToggle = (toggleAction) => () => dispatch(toggleAction());

  const modalFrameRef = useRef(null);

  const buttonsConfig = useMemo(
    () => [
      { action: toggleUploadForm, label: '+', color: 'blue' },
      { action: toggleControlPanel, label: 'C', color: 'green' },
      { action: toggleOptionsPanel, label: 'Options', color: 'orange' },
      { action: toggleDocumentsPanel, label: 'Docs', color: 'red' },
    ],
    [],
  );

  return (
    <div
      id="modal-frame"
      className="bg-white w-screen h-screen flex flex-col sm:justify-center sm:items-center relative overflow-hidden"
      ref={modalFrameRef}
    >
      <ParagraphDisplay />
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
      {uploadFormVisible && (
        <UploadModal
          onClose={handleToggle(toggleUploadForm)}
          loading={loading}
        />
      )}
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
