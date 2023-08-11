import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectResponse } from '../../store/uploadSlice';
import {
  toggleControlPanel,
  toggleUploadForm,
  selectControlPanelVisible,
  selectUploadFormVisible,
} from '../../store/navigationSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  const response = useSelector(selectResponse);

  const handleUploadFormToggle = () => {
    dispatch(toggleUploadForm());
  };

  const handleControlPanelToggle = () => {
    dispatch(toggleControlPanel());
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
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
    </div>
  );
};

export default Navigation;
