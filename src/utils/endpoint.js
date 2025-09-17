// // src/api/endpoints.js
// const endpoints = {
//   auth: {
//     sendOtp: "/auth/send-otp",
//     verifyOtp: "/auth/verify-otp",
//   },
//   user: {
//     profile: "/user/profile",
//   },
//   product: {
//     list: "/get-products",
//     create: "/create",
//     byId: (id) => `/product/${id}`,
//     update: (id) => `/update/${id}`,
//     delete: (id) => `/delete/${id}`,
//     userProducts: "/user-products",
//   },
// };

// export default endpoints;

const API_BASE = "/api";

const endpoints = {
  auth: {
    sendOtp: `${API_BASE}/auth/send-otp`,
    verifyOtp: `${API_BASE}/auth/verify-otp`,
  },
  user: {
    profile: `${API_BASE}/user/profile`,
  },
  product: {
    list: `${API_BASE}/get-products`,
    create: `${API_BASE}/create`,
    byId: (productId) => `${API_BASE}/product/${productId}`,
    update: (productId) => `${API_BASE}/product/${productId}/update`,
    delete: (productId) => `${API_BASE}/product/${productId}/delete`,
    userProducts: (userId) => `${API_BASE}/product/${userId}`,
  },
  chat: {
    byId: (chatId) => `${API_BASE}/${chatId}`,
    list: `${API_BASE}/chats`,
  },
};

export default endpoints;
