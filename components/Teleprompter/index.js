import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectControlPanelVisible,
  selectUploadFormVisible,
} from '../../store/navigationSlice';
import Navigation from './Navigation';
import UploadForm from './uploadForm';
import ControlPanel from './ControlPanel';
import ParagraphDisplay from './ParagraphDisplay';
import useRandomParagraph from '../../hooks/useRandomParagraph';
const Teleprompter = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const controlPanelVisible = useSelector(selectControlPanelVisible);
  const uploadFormVisible = useSelector(selectUploadFormVisible);
  const file = useSelector((state) => state.upload.file);
  const response = useSelector((state) => state.upload.response);
  const hookProps = useRandomParagraph(response);
  return (
    <div className="bg-black min-h-screen flex flex-col sm:justify-center sm:items-center">
      {isNavVisible ? (
        <Navigation closeNav={() => setIsNavVisible(false)} />
      ) : (
        <button
          onClick={() => setIsNavVisible(true)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
        >
          Open Navigation
        </button>
      )}
      {controlPanelVisible && <ControlPanel {...hookProps} />}
      {uploadFormVisible && <UploadForm />}
      {file && <div>Response erhalten</div>}
      {file && <ParagraphDisplay />}
    </div>
  );
};
export default Teleprompter;
