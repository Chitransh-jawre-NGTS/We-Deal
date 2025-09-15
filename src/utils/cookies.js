// src/utils/cookies.js
import Cookies from "js-cookie";

export const cookies = {
  set: (key, value, options = { expires: 7 }) => Cookies.set(key, value, options),
  get: (key) => Cookies.get(key),
  remove: (key) => Cookies.remove(key),
};
