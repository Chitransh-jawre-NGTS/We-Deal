// src/api/api.js
import httpClient from "../utils/httpClient";
import endpoints from "../utils/endpoint";

export const authApi = {
  sendOtp: (phone) => httpClient.post(endpoints.auth.sendOtp, { phone }),
  verifyOtp: (phone, otp) => httpClient.post(endpoints.auth.verifyOtp, { phone, otp }),
};

export const userApi = {
  getProfile: () => httpClient.get(endpoints.user.profile),
};


