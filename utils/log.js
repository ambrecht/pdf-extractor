/**
 * log - Utility function for colored console logging.
 *
 * @param {string} msg - The message to log.
 * @param {string} [color='red'] - The color for the log text.
 */
export const log = (msg, color = 'red') => {
  console.log(`%c${msg}`, `color: ${color}`);
};
