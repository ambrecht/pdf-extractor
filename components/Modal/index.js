import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

const Modal = ({ children, onClose }) => {
  const [el, setEl] = React.useState(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const element = document.createElement('div');
    setEl(element);

    const modalRoot = document.getElementById('modal-root');
    modalRoot.appendChild(element);

    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  if (!el) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center">
      <Draggable
        handle=".drag-handle"
        position={position}
        onStop={(e, data) => {
          setPosition({ x: data.x, y: data.y });
        }}
      >
        <div className="bg-white p-4 rounded-lg">
          <div className="drag-handle cursor-move bg-gray-200 p-2 text-center">
            Ziehen Sie hier, um das Modal zu bewegen
          </div>
          {children}
        </div>
      </Draggable>
      <button
        onClick={onClose}
        className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Schließen
      </button>
    </div>,
    el,
  );
};

export default Modal;
