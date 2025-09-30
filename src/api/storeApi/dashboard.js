// src/api/storeApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/store";

// Get Store Profile
export const getStoreProfile = async (storeToken) => {
  const res = await axios.get(`${BASE_URL}/profile`, {
    headers: { "x-store-token": storeToken },
  });
  return res.data;
};

// Get Store Ads
export const getStoreAds = async (storeToken) => {
  const res = await axios.get(`${BASE_URL}/my-ads`, {
    headers: { "x-store-token": storeToken },
  });
  return res.data.ads || [];
};

// Optional: Add APIs for removing, deactivating, marking as sold
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
