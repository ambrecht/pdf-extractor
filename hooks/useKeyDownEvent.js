import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  updateIndex,
  toggleLinearMode,
  setWpm,
  toggleIntervalRunning,
} from '../store/teleprompterSlice';

/**
 * A custom hook that handles key down events and dispatches corresponding actions.
 *
 * @returns {null} No return value
 */
const useKeyDownEvent = () => {
  const dispatch = useDispatch();
  const { index, paragraphcount, isLinear, wpm } = useSelector(
    (state) => state.teleprompter,
    shallowEqual,
  );

  /**
   * An object mapping key codes to their respective actions.
   * @type {Object.<number, Function>}
   */
  const keyActions = {
    39: () => index < paragraphcount - 1 && dispatch(updateIndex(index + 1)), // Right Arrow
    37: () => index > 0 && dispatch(updateIndex(index - 1)), // Left Arrow
    32: () => dispatch(toggleIntervalRunning()), // Space
    84: () => dispatch(toggleLinearMode()), // 'T'
    13: () => dispatch(updateIndex(Math.floor(Math.random() * paragraphcount))), // Enter
    38: () => dispatch(setWpm(wpm + 10)), // Up Arrow
    40: () => dispatch(setWpm(wpm - 10)), // Down Arrow
  };

  /**
   * A function that handles key down events and executes the corresponding action from the keyActions object.
   *
   * @param {Object} event - The event object
   */
  const handleKeyDown = (event) => {
    if (keyActions[event.keyCode]) {
      keyActions[event.keyCode]();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, paragraphcount, index, isLinear, wpm]);

  return null;
};

export default useKeyDownEvent;
