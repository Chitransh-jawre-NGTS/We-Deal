// src/api/httpClient.js
import axios from "axios";

// ✅ Choose base URL depending on environment
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "https://we-deal-backend.onrender.com/api"
    : "http://localhost:5000/api";

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor (attach token if exists)
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirect to login.");
      localStorage.removeItem("token");
      // you can redirect to login page here
    }
    return Promise.reject(error);
  }
);

export default httpClient;
