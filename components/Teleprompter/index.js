import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectControlPanelVisible,
  selectUploadFormVisible,
} from '../../store/navigationSlice';
import Navigation from './Navigation';
import UploadForm from './UploadForm';
import ControlPanel from './ControlPanel';
import ParagraphDisplay from './ParagraphDisplay';
import useRandomParagraph from '../../hooks/useRandomParagraph';

const Teleprompter = () => {
  const controlPanelVisible = useSelector(selectControlPanelVisible);
  const uploadFormVisible = useSelector(selectUploadFormVisible);
  const file = useSelector((state) => state.upload.file);
  const response = useSelector((state) => state.upload.response); // Abrufen der response aus dem Redux-Store

  const hookProps = useRandomParagraph(response);

  return (
    <div className="bg-black min-h-screen flex flex-col sm:justify-center sm:items-center">
      <Navigation />
      {controlPanelVisible && <ControlPanel {...hookProps} />}
      {uploadFormVisible && <UploadForm />}
      {file && <div>Response erhalten</div>}
      {file && <ParagraphDisplay />}
    </div>
  );
};

export default Teleprompter;
