import React from 'react';
import { useThemeOptions } from '../../hooks/useThemeOptions';
import Modal from '../Modal';

const Options = ({ onClose }) => {
  const {
    fontSize,
    fontColor,
    textAlignment,
    backgroundColor,
    animation,
    progressDisplay,
    progressBarColor,
    updateFontSize,
    updateFontColor,
    updateThemeInversion,
    updateTextAlignment,
    updateAnimation,
    updateProgressDisplay,
  } = useThemeOptions();

  return (
    <Modal onClose={onClose}>
      <div className="p-4 bg-white rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Teleprompter Einstellungen</h2>

        <div className="mb-4">
          <label className="block mb-2">Font Size (in rem)</label>
          <input
            type="number"
            min="1"
            max="300"
            value={parseInt(fontSize, 10)}
            onChange={(e) => updateFontSize(`${e.target.value}rem`)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Font Color</label>
          <select
            value={fontColor}
            onChange={(e) => updateFontColor(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="#FFFFFF">Weiß</option>
            <option value="#000000">Schwarz</option>
            <option value="#FF0000">Rot</option>
            <option value="#00FF00">Grün</option>
            <option value="#0000FF">Blau</option>
            <option value="#FFA500">Orange</option>
            <option value="#4B0082">Indigo</option>
            <option value="#9400D3">Violett</option>
            <option value="#FFC0CB">Rosa</option>
            <option value="#8A2BE2">Blauviolett</option>
            <option value="#7FFF00">Chartreuse</option>
            <option value="#D2691E">Schokolade</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Theme</label>
          <select
            value={textAlignment} // Hier habe ich angenommen, dass Sie das Textausrichtungsthema verwenden möchten. Wenn nicht, ändern Sie dies entsprechend.
            onChange={(e) => updateThemeInversion()}
            className="p-2 border rounded w-full"
          >
            <option value="invert">Invert Theme</option>
            <option value="deinvert">Deinvert Theme</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Text Alignment</label>
          <select
            value={textAlignment}
            onChange={(e) => updateTextAlignment(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Animation</label>
          <select
            value={animation}
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
            value={progressDisplay}
            onChange={(e) => updateProgressDisplay(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="color">Color</option>
            <option value="bar">Bar</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default Options;
