import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectControlPanelVisible,
  selectUploadFormVisible,
  selectOptionsPanelVisible,
} from '../../store/navigationSlice';
import ControlPanel from './ControlModal';
import ParagraphDisplay from './ParagraphDisplay';
import useRandomParagraph from '../../hooks/useRandomParagraph';
import UploadModal from './uploadModal';
import OptionsPanel from './OptionsPanel';
import {
  toggleControlPanel,
  toggleUploadForm,
  toggleOptionsPanel,
} from '../../store/navigationSlice';

const Teleprompter = () => {
  const dispatch = useDispatch();
  const controlPanelVisible = useSelector(selectControlPanelVisible);
  const uploadFormVisible = useSelector(selectUploadFormVisible);
  const optionsPanelVisible = useSelector(selectOptionsPanelVisible);
  const file = useSelector((state) => state.upload.file);
  const response = useSelector((state) => state.upload.response);
  const hookProps = useRandomParagraph(response);

  const handleUploadFormToggle = () => {
    dispatch(toggleUploadForm());
  };
  const handleControlPanelToggle = () => {
    dispatch(toggleControlPanel());
  };
  const handleOptionsPanelToggle = () => {
    dispatch(toggleOptionsPanel());
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
      {controlPanelVisible && <ControlPanel {...hookProps} />}
      {uploadFormVisible && (
        <UploadModal onClose={() => handleUploadFormToggle(false)} />
      )}
      {file && <ParagraphDisplay />}
      {optionsPanelVisible && (
        <OptionsPanel
          onClose={() => handleOptionsPanelToggle(false)}
        ></OptionsPanel>
      )}
    </div>
  );
};

export default Teleprompter;
