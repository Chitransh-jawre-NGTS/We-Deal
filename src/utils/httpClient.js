// src/api/httpClient.js
import axios from "axios";

// Base URL (change when deploying backend)
const BASE_URL = "http://localhost:5000/api";

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
    }
    return Promise.reject(error);
  }
);

export default httpClient;
