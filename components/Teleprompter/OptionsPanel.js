import React from 'react';
import { useThemeOptions } from '../../hooks/useThemeOptions';
import Modal from '../Modal';

const Options = ({ onClose }) => {
  const {
    theme,
    updateFontSize,
    updateFontColor,
    updateTheme,
    updateTextAlignment,
    updateBackgroundColor,
    updateAnimation,
    updateProgressDisplay,
  } = useThemeOptions();

  return (
    <Modal onClose={onClose}>
      <div className="p-4 bg-white rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Teleprompter Einstellungen</h2>

        <div className="mb-4">
          <label className="block mb-2">Font Size</label>
          <select
            value={theme.fontSize}
            onChange={(e) => updateFontSize(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="10px">10px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="28px">28px</option>
            <option value="32px">32px</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Font Color</label>
          <input
            type="color"
            value={theme.fontColor}
            onChange={(e) => updateFontColor(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Theme</label>
          <select
            value={theme.theme}
            onChange={(e) => updateTheme(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Text Alignment</label>
          <select
            value={theme.textAlignment}
            onChange={(e) => updateTextAlignment(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Background Color</label>
          <input
            type="color"
            value={theme.backgroundColor}
            onChange={(e) => updateBackgroundColor(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Animation</label>
          <select
            value={theme.animation}
            onChange={(e) => updateAnimation(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Progress Display</label>
          <select
            value={theme.progressDisplay}
            onChange={(e) => updateProgressDisplay(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="color">Color</option>
            <option value="bar">Bar</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default Options;
