import { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { updateIndexBasedOnMode } from '../utils/updateIndexBasedOnMode';
import { updateIndex } from '../store/teleprompterSlice';

/**
 * useProgressUpdate - A custom React hook for updating the progress and index in the Redux store.
 *
 * This hook is like a little helper elf that keeps track of how much work has been done.
 * When the work is complete, it tells the other elves (in this case, the Redux store) to move on to the next task.
 *
 * @returns {number} The current progress, a number between 0 and 100.
 */
const useProgressUpdate = () => {
  // This is like calling the boss elf to help us send messages to the other elves.
  const dispatch = useDispatch();

  // These are the important details we need to know about our current task.
  const { time, intervalIsRunning, isLinear, index, paragraphcount } =
    useSelector((state) => state.teleprompter);

  /**
   * useEffect - Think of this as the main workshop where all the magic happens.
   *
   * This workshop opens and closes depending on whether we are supposed to be working (intervalIsRunning).
   */
  useEffect(() => {
    // This is our little stopwatch to keep track of time.
    let interval;

    // If we are supposed to be working, then let's get to it!
    if (intervalIsRunning) {
      // This keeps track of how much work has been done so far.
      let localProgress = 0;

      /**
       * step - This tells us how much work to do every tiny moment (10ms).
       *
       * It's like saying, "Each moment, add this much paint to the canvas."
       */
      const step = 100 / ((time * 1000) / 10);

      // Every 10ms, we do a little bit of work.
      interval = setInterval(() => {
        // Add the little bit of work to our total work done.
        localProgress += step;

        // If we've completed the task, let's tell the boss elf!
        if (localProgress >= 100) {
          localProgress = 0;
          const newIndex = updateIndexBasedOnMode(
            isLinear,
            index,
            paragraphcount,
          );
          // Tell the boss elf to move on to the next task.
          dispatch(updateIndex(newIndex));
        }

        // (Here is where you'd update the Redux store with the new progress, but it seems you've left that part out.)
      }, 10);
    }

    // If we're told to stop working, we stop the stopwatch.
    return () => {
      clearInterval(interval);
    };
  }, [intervalIsRunning, time, isLinear, index, paragraphcount, dispatch]);

  // This is how much work has been done, which we can show to everyone.
  const localProgress = useSelector((state) => state.teleprompter.progress);

  return localProgress;
};

export default useProgressUpdate;
