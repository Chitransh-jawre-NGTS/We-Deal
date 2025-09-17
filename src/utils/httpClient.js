import axios from "axios";
import { storage } from "./localstorage"; // ✅ use your wrapper

// ✅ Correct way to read from .env
const BASE_URL = import.meta.env.VITE_API_URL;

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = storage.get("token"); // ✅ use wrapper
    console.log("Token in interceptor:", token); // 🔍 debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirect to login.");
      storage.remove("token");
      storage.remove("user");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default httpClient;
