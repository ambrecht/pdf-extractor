import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectResponse } from '../../store/uploadSlice';
import {
  toggleControlPanel,
  toggleUploadForm,
} from '../../store/navigationSlice';

const Navigation = ({ closeNav }) => {
  const dispatch = useDispatch();
  const response = useSelector(selectResponse);

  const handleUploadFormToggle = () => {
    dispatch(toggleUploadForm());
  };

  const handleControlPanelToggle = () => {
    dispatch(toggleControlPanel());
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white p-4 shadow-md">
      <button
        onClick={handleUploadFormToggle}
        className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-400`}
      >
        Upload
      </button>
      {response.length > 0 && (
        <button
          onClick={handleControlPanelToggle}
          className={`bg-green-500 text-white p-2 rounded hover:bg-green-400 `}
        >
          Control Panel
        </button>
      )}
      <button
        onClick={closeNav}
        className="absolute top-2 right-2 bg-red-500 p-1 rounded"
      >
        X
      </button>
    </div>
  );
};

export default Navigation;
