/**
 * A function that sets an item in localStorage.
 *
 * @param {string} key - The key under which the value will be stored.
 * @param {*} value - The value to be stored.
 * @returns {boolean} - Returns true if the operation was successful, false otherwise.
 */
export const setItemInLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(
      `Ah, the existential dread of not being able to set ${key} in localStorage:`,
      error,
    );
    return false;
  }
};

/**
 * A function that retrieves an item from localStorage.
 *
 * @param {string} key - The key under which the value is stored.
 * @returns {*} - Returns the value if found and successfully parsed, null otherwise.
 */
export const getItemFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`The Sisyphean task of retrieving ${key} failed:`, error);
    return null;
  }
};
