export const setItemInLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
  }
};

export const getItemFromLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error("Error getting item from localStorage:", error);
    return null;
  }
};
