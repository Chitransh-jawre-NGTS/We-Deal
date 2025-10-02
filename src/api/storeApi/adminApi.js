// src/api/storeApi.js
import HttpClient from "../../utils/httpClient";

// Register Seller
export const registerSeller = async (formData) => {
  const data = new FormData();
  for (let key in formData) {
    data.append(key, formData[key]);
  }

  const res = await HttpClient.post("/store/register", data, {
    headers: { "Content-Type": "multipart/form-data" }, // only needed for FormData
  });

  return res.data;
};

// Seller Login
export const loginSeller = async (email, password) => {
  const res = await HttpClient.post("/store/login", { email, password });
  return res.data;
};

// Get Store Profile
export const getStoreProfile = async () => {
  const res = await HttpClient.get("/store/profile"); // token auto-attached via interceptor
  return res.data;
};
