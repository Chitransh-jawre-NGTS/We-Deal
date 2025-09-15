// src/utils/localStorage.js

export const storage = {
  // Save data to localStorage
  set: (key, value) => {
    try {
      const val = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, val);
    } catch (err) {
      console.error(`Error saving ${key} to localStorage`, err);
    }
  },

  // Get data from localStorage
  get: (key) => {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;

      // Try to parse JSON, fallback to string
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (err) {
      console.error(`Error getting ${key} from localStorage`, err);
      return null;
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing ${key} from localStorage`, err);
    }
  },

  // Clear all localStorage (optional)
  clear: () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error("Error clearing localStorage", err);
    }
  },
};
