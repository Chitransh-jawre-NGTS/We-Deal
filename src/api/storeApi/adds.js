// src/api/storeApi.js
import HttpClient from "../../utils/httpClient";

export const getStoreAds = async () => {
  const res = await HttpClient.get("/store/my-ads");
  return res.data.ads || [];
};

export const createAd = async (adData) => {
  const res = await HttpClient.post("/store/create", adData, {
    headers: { "Content-Type": "multipart/form-data" }, // only for FormData
  });
  return res.data;
};

export const removeAd = async (id) => {
  const res = await HttpClient.delete(`/store/delete-ad/${id}`);
  return res.data;
};

export const updateAdStatus = async (id, status) => {
  const res = await HttpClient.patch(`/store/update-ad/${id}`, { status });
  return res.data;
};
