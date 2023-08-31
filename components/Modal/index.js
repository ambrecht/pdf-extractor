// Modal.js
import React, { useRef, memo } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import CloseButton from '../closeButton';

const MODAL_ROOT = 'modal-root';

const Modal = ({ children, onClose, parentFrameRef }) => {
  const parentRef = useRef(null);

  return ReactDOM.createPortal(
    <Draggable handle=".drag-handle" bounds={parentFrameRef}>
      <div
        ref={parentRef}
        className="flex flex-col items-stretch bg-white p-4 rounded-lg"
      >
        <div className="drag-handle cursor-move bg-gray-200 p-2 text-center">
          Ziehen Sie hier, um das Modal zu bewegen
        </div>
        {children}
        <CloseButton onClose={onClose} />
      </div>
    </Draggable>,
    document.getElementById(MODAL_ROOT),
  );
};

export default memo(Modal);
