// src/api/storeApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/store";

export const getStoreAds = async (storeToken) => {
  const res = await axios.get(`${BASE_URL}/my-ads`, {
    headers: { "x-store-token": storeToken },
  });
  return res.data.ads || [];
};

export const createAd = async (adData, storeToken) => {
  const res = await axios.post(`${BASE_URL}/create`, adData, {
    headers: {
      "x-store-token": storeToken,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Optional: Remove or update ads
export const removeAd = async (id, storeToken) => {
  const res = await axios.delete(`${BASE_URL}/delete-ad/${id}`, {
    headers: { "x-store-token": storeToken },
  });
  return res.data;
};

export const updateAdStatus = async (id, status, storeToken) => {
  const res = await axios.patch(
    `${BASE_URL}/update-ad/${id}`,
    { status },
    { headers: { "x-store-token": storeToken } }
  );
  return res.data;
};
