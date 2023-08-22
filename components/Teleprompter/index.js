import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectControlPanelVisible,
  selectUploadFormVisible,
  selectOptionsPanelVisible,
  selectDocumentsPanelVisible,
} from '../../store/navigationSlice';
import ControlPanel from './ControlModal';
import ParagraphDisplay from './ParagraphDisplay';
import UploadModal from './uploadModal';
import OptionsPanel from './OptionsPanel';
import {
  toggleControlPanel,
  toggleUploadForm,
  toggleOptionsPanel,
  toggleDocumentsPanel,
} from '../../store/navigationSlice';
import DocumentModal from './DocumentModal';

import useTeleprompterControls from '../../hooks/useTeleprompterControls';

const Teleprompter = () => {
  const dispatch = useDispatch();
  const controlPanelVisible = useSelector(selectControlPanelVisible);
  const uploadFormVisible = useSelector(selectUploadFormVisible);
  const optionsPanelVisible = useSelector(selectOptionsPanelVisible);
  const documentsPanelVisible = useSelector(selectDocumentsPanelVisible);
  const paragraphs = useSelector((state) => state.teleprompter.paragraphs);

  const teleprompterControls = useTeleprompterControls();

  const handleUploadFormToggle = () => {
    dispatch(toggleUploadForm());
  };
  const handleControlPanelToggle = () => {
    dispatch(toggleControlPanel());
  };
  const handleOptionsPanelToggle = () => {
    dispatch(toggleOptionsPanel());
  };
  const handleDocumentsPanelToggle = () => {
    dispatch(toggleDocumentsPanel());
  };

  return (
    <div className="bg-black min-h-screen flex flex-col sm:justify-center sm:items-center relative">
      <button
        onClick={handleUploadFormToggle}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full hover:bg-blue-400 ml-30"
      >
        +
      </button>
      <button
        onClick={handleControlPanelToggle}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full hover:bg-green-400 ml-10"
      >
        C
      </button>
      <button
        onClick={handleOptionsPanelToggle}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-orange-500 text-white flex items-center justify-center rounded-full hover:bg-orange-400 ml-20"
      >
        Options
      </button>
      <button
        onClick={handleDocumentsPanelToggle}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-500 text-white flex items-center justify-center rounded-full hover:bg-red-400 ml-40"
      >
        Docs
      </button>
      {controlPanelVisible && <ControlPanel {...teleprompterControls} />}

      {uploadFormVisible && (
        <UploadModal onClose={() => handleUploadFormToggle(false)} />
      )}
      {paragraphs.length > 0 && <ParagraphDisplay />}
      {optionsPanelVisible && (
        <OptionsPanel
          onClose={() => handleOptionsPanelToggle(false)}
        ></OptionsPanel>
      )}
      {documentsPanelVisible && (
        <DocumentModal
          onClose={() => handleDocumentsPanelToggle(false)}
        ></DocumentModal>
      )}
    </div>
  );
};

export default Teleprompter;
