import { useDispatch, useSelector } from 'react-redux';
import {
  setFontSize,
  setFontColor,
  setTheme,
  setTextAlignment,
  setBackgroundColor,
  setAnimation,
  setProgressDisplay,
} from '../store/themeSlice.js';

export const useThemeOptions = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const convertToTailwindFontSize = (value) => {
    switch (value) {
      case '10px':
        return 'text-xs';
      case '12px':
        return 'text-sm';
      case '14px':
        return 'text-base';
      case '16px':
        return 'text-lg';
      case '18px':
        return 'text-xl';
      case '20px':
        return 'text-2xl';
      case '24px':
        return 'text-3xl';
      case '28px':
        return 'text-4xl';
      case '32px':
        return 'text-5xl';
      default:
        return 'text-base';
    }
  };

  const convertToTailwindColor = (color) => {
    // Erweiterte Farbschemata
    const colorMap = {
      '#000000': 'text-black',
      '#FFFFFF': 'text-white',
      '#FF0000': 'text-red-600',
      '#00FF00': 'text-green-600',
      '#0000FF': 'text-blue-600',
      '#FFFF00': 'text-yellow-600',
      // ... Sie können weitere Farben hinzufügen
    };
    return colorMap[color] || 'text-black'; // Standardfarbe
  };

  const convertToTailwindBackgroundColor = (color) => {
    const bgColorMap = {
      '#000000': 'bg-black',
      '#FFFFFF': 'bg-white',
      '#FF0000': 'bg-red-600',
      '#00FF00': 'bg-green-600',
      '#0000FF': 'bg-blue-600',
      '#FFFF00': 'bg-yellow-600',
      // ... Sie können weitere Farben hinzufügen
    };
    return bgColorMap[color] || 'bg-white'; // Standardfarbe
  };

  const updateFontSize = (value) => {
    const tailwindClass = convertToTailwindFontSize(value);
    dispatch(setFontSize(tailwindClass));
  };

  const updateFontColor = (value) => {
    const tailwindClass = convertToTailwindColor(value);
    dispatch(setFontColor(tailwindClass));
  };

  const updateBackgroundColor = (value) => {
    const tailwindClass = convertToTailwindBackgroundColor(value);
    dispatch(setBackgroundColor(tailwindClass));
  };

  const updateTheme = (value) => dispatch(setTheme(value));
  const updateTextAlignment = (value) => dispatch(setTextAlignment(value));
  const updateAnimation = (value) => dispatch(setAnimation(value));
  const updateProgressDisplay = (value) => dispatch(setProgressDisplay(value));

  return {
    theme,
    updateFontSize,
    updateFontColor,
    updateTheme,
    updateTextAlignment,
    updateBackgroundColor,
    updateAnimation,
    updateProgressDisplay,
  };
};
