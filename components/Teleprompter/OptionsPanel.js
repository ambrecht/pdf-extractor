import React from 'react';
import { useSelector } from 'react-redux';
import { useThemeOptions } from '../../hooks/useThemeOptions';
import Modal from '../Modal';
import SelectOption from './selectOptions';

const Options = ({ onClose }) => {
  const {
    updateFontSize,
    updateFontColor,
    updateThemeInversion,
    updateTextAlignment,
    updateAnimation,
    updateProgressDisplay,
  } = useThemeOptions();

  const {
    fontSize,
    fontColor,
    textAlignment,
    backgroundColor,
    animation,
    progressDisplay,
    progressBarColor,
  } = useSelector((state) => state.theme);

  const fontSizeOptions = [
    { label: 'Klein', value: '1rem' },
    { label: 'Mittel', value: '1.5rem' },
    { label: 'Groß', value: '2rem' },
    { label: 'Sehr Groß', value: '3rem' },
  ];

  const fontColorOptions = [
    { label: 'Weiß', value: '#FFFFFF' },
    { label: 'Schwarz', value: '#000000' },
    { label: 'Rot', value: '#FF0000' },
    { label: 'Grün', value: '#00FF00' },
    { label: 'Blau', value: '#0000FF' },
    { label: 'Orange', value: '#FFA500' },
    { label: 'Indigo', value: '#4B0082' },
    { label: 'Violett', value: '#9400D3' },
    { label: 'Rosa', value: '#FFC0CB' },
    { label: 'Blauviolett', value: '#8A2BE2' },
    { label: 'Chartreuse', value: '#7FFF00' },
    { label: 'Schokolade', value: '#D2691E' },
  ];

  const themeOptions = [
    { label: 'Invert Theme', value: 'invert' },
    { label: 'Deinvert Theme', value: 'deinvert' },
  ];

  const textAlignOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
  ];

  const animationOptions = [
    { label: 'On', value: 'on' },
    { label: 'Off', value: 'off' },
  ];

  const progressDisplayOptions = [
    { label: 'Color', value: 'color' },
    { label: 'Bar', value: 'bar' },
    { label: 'None', value: 'none' },
  ];

  return (
    <Modal onClose={onClose}>
      <div className="p-4 bg-white rounded shadow-lg max-h-screen max-w-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-black">
          Teleprompter Einstellungen
        </h2>

        <SelectOption
          label="Schriftgröße"
          value={fontSize}
          options={fontSizeOptions}
          onChange={(e) => updateFontSize(e.target.value)}
        />

        <SelectOption
          label="Font Color"
          value={fontColor}
          options={fontColorOptions}
          onChange={(e) => updateFontColor(e.target.value)}
        />

        <SelectOption
          label="Theme"
          value={textAlignment}
          options={themeOptions}
          onChange={(e) => updateThemeInversion()}
        />

        <SelectOption
          label="Text Alignment"
          value={textAlignment}
          options={textAlignOptions}
          onChange={(e) => updateTextAlignment(e.target.value)}
        />

        <SelectOption
          label="Animation"
          value={animation}
          options={animationOptions}
          onChange={(e) => updateAnimation(e.target.value)}
        />

        <SelectOption
          label="Progress Display"
          value={progressDisplay}
          options={progressDisplayOptions}
          onChange={(e) => updateProgressDisplay(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default Options;
