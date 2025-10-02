// src/api/storeApi.js
import HttpClient from "../../utils/httpClient";

// Get Store Profile
export const getStoreProfile = async () => {
  const res = await HttpClient.get("/store/profile");
  return res.data;
};

// Get Store Ads
export const getStoreAds = async () => {
  const res = await HttpClient.get("/store/my-ads");
  return res.data.ads || [];
};

// Remove an Ad
export const removeAd = async (id) => {
  const res = await HttpClient.delete(`/store/delete-ad/${id}`);
  return res.data;
};

// Update Ad Status (e.g., sold, deactivated)
export const updateAdStatus = async (id, status) => {
  const res = await HttpClient.patch(`/store/update-ad/${id}`, { status });
  return res.data;
};
