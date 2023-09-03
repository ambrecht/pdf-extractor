import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateIndexBasedOnMode } from '../utils/updateIndexBasedOnMode';
import { updateIndex, updateHistory } from '../store/teleprompterSlice';

const useProgressUpdate = () => {
  const dispatch = useDispatch();
  const [localProgress, setLocalProgress] = useState(0);
  const hasFiredRef = useRef(false); // Using useRef instead of useState

  const { time, intervalIsRunning, isLinear, index, paragraphcount } =
    useSelector((state) => state.teleprompter);

  useEffect(() => {
    let interval;

    if (intervalIsRunning) {
      const step = 100 / ((time * 1000) / 30);

      interval = setInterval(() => {
        setLocalProgress((prevProgress) => {
          const newLocalProgress = prevProgress + step;

          if (newLocalProgress >= 100 && !hasFiredRef.current) {
            const newIndex = updateIndexBasedOnMode(
              isLinear,
              index,
              paragraphcount,
            );
            dispatch(updateIndex(newIndex));
            dispatch(updateHistory(newIndex));
            hasFiredRef.current = true; // Set the ref to true
          }

          if (newLocalProgress >= 100) {
            return 0;
          }

          return newLocalProgress;
        });
      }, 30);
    }

    return () => {
      clearInterval(interval);
      hasFiredRef.current = false; // Reset the ref when the effect is cleaned up
    };
  }, [intervalIsRunning, time, isLinear, index, paragraphcount, dispatch]);

  return localProgress;
};

export default useProgressUpdate;
