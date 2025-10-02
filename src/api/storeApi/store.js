// api/store.js
import HttpClient from "../../utils/httpClient";

export const getAllAds = async () => {
  try {
    const res = await HttpClient.get("/store/all-ads");
    return res.data;
  } catch (err) {
    console.error("Error fetching ads:", err);
    throw err;
  }
};
