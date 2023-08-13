import { useDispatch, useSelector } from 'react-redux';
import {
  setFontSize,
  setFontColor,
  invertTheme,
  setTextAlignment,
  setAnimation,
  setProgressDisplay,
  setBackgroundColor, // Stellen Sie sicher, dass Sie diese Aktion in Ihrem themeSlice haben
} from '../store/themeSlice.js';
import getComplementaryColor from '../utils/getComplementaryColor'; // Importieren Sie die Funktion

export const useThemeOptions = () => {
  const dispatch = useDispatch();

  const updateFontSize = (value) => {
    dispatch(setFontSize(value));
  };

  const updateFontColor = (value) => {
    const complementaryColor = getComplementaryColor(value); // Berechnen Sie den komplementären Farbwert
    dispatch(setFontColor(value));
    dispatch(setBackgroundColor(complementaryColor)); // Setzen Sie den komplementären Farbwert als Hintergrundfarbe
  };

  const updateThemeInversion = () => {
    dispatch(invertTheme()); // Aufrufen der neuen Aktion
  };

  const updateTextAlignment = (value) => dispatch(setTextAlignment(value));
  const updateAnimation = (value) => dispatch(setAnimation(value));
  const updateProgressDisplay = (value) => dispatch(setProgressDisplay(value));

  return {
    updateThemeInversion,
    updateFontSize,
    updateFontColor,
    updateTextAlignment,
    updateAnimation,
    updateProgressDisplay,
  };
};
