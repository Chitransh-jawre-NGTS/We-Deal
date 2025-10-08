import axios from "axios";
import { storage } from "./localstorage"; // ✅ your wrapper

// ✅ Correct way to read from .env
const BASE_URL = import.meta.env.VITE_API_URL;

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor to attach tokens
httpClient.interceptors.request.use(
  (config) => {
    const token = storage.get("token");        // user token
    const storeToken = storage.get("storeToken"); // store token

    console.log("User token in interceptor:", token);
    // console.log("Store token in interceptor:", storeToken);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (storeToken) {
      config.headers["x-store-token"] = storeToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirect to login.");
      // Optionally remove tokens and redirect
      // storage.remove("token");
      // storage.remove("storeToken");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default httpClient;
