import React, { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import CloseButton from '../closeButton';

const MODAL_ROOT = 'modal-root';

const Modal = ({ children, onClose, parentFrameRef }) => {
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (parentFrameRef && parentFrameRef.current) {
      setBounds(parentFrameRef.current);
    }
  }, [parentFrameRef]);

  return ReactDOM.createPortal(
    <Draggable handle=".drag-handle" bounds="parent">
      <div className="flex flex-col items-stretch bg-white rounded-lg shadow-lg min-w-[200px] min-h-[200px] fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="drag-handle cursor-move bg-gray-200 p-2 text-center text-sm">
          Ziehen Sie hier, um das Modal zu bewegen
        </div>
        <div className="p-4">
          {children}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full hover:bg-red-400"
          >
            X
          </button>
        </div>
      </div>
    </Draggable>,
    document.getElementById(MODAL_ROOT),
  );
};

export default memo(Modal);
