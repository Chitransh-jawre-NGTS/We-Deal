// src/api/storeApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/store";

// Register Seller
export const registerSeller = async (formData, token) => {
  const data = new FormData();
  for (let key in formData) {
    data.append(key, formData[key]);
  }

  const res = await axios.post(`${BASE_URL}/register`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Seller Login
export const loginSeller = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data;
};

// Get Store Profile
export const getStoreProfile = async (storeToken) => {
  const res = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      "x-store-token": storeToken,
    },
  });
  return res.data;
};