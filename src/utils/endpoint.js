// src/api/endpoints.js
const endpoints = {
  auth: {
    sendOtp: "/auth/send-otp",
    verifyOtp: "/auth/verify-otp",
  },
  user: {
    profile: "/user/profile", // example for future expansion
  },
  product: {
    list: "/get-products",
    create: "/create",
  },
};

export default endpoints;
