// // src/api/endpoints.js
// const API_BASE = "/api";

// const endpoints = {
//   auth: {
//     sendOtp: `${API_BASE}/auth/send-otp`,
//     verifyOtp: `${API_BASE}/auth/verify-otp`,
//   },
//   user: {
//     profile: `${API_BASE}/user/profile`,
//   },
//   product: {
//     list: `${API_BASE}/get-products`,
//     create: `${API_BASE}/create`,
//     byId: (productId) => `${API_BASE}/product/${productId}`,
//     update: (productId) => `${API_BASE}/product/${productId}/update`,
//     delete: (productId) => `${API_BASE}/product/${productId}/delete`,
//     userProducts: (userId) => `${API_BASE}/product/${userId}`,
//   },
//   chat: {
//     // ✅ Marketplace chat endpoints
//     findOrCreateByProduct: (productId) =>
//       `${API_BASE}/chat/findOrCreateChatByProduct/${productId}`,
//     byId: (chatId) => `${API_BASE}/${chatId}`,
//     list: `${API_BASE}/chats`,
//   },
// };

// export default endpoints;


// src/api/endpoints.js



// const API_BASE = import.meta.env.VITE_API_URL; // ✅ use env var

// const endpoints = {
//   auth: {
//     sendOtp: `${API_BASE}/auth/send-otp`,
//     verifyOtp: `${API_BASE}/auth/verify-otp`,
//   },
//   user: {
//     profile: `${API_BASE}/user/profile`,
//   },
//   product: {
//     list: `${API_BASE}/get-products`,
//     create: `${API_BASE}/create`,
//     byId: (productId) => `${API_BASE}/product/${productId}`,
//     update: (productId) => `${API_BASE}/product/${productId}/update`,
//     delete: (productId) => `${API_BASE}/product/${productId}/delete`,
//     userProducts: (userId) => `${API_BASE}/product/${userId}`,
//   },
//   chat: {
//     findOrCreateByProduct: (productId) =>
//       `${API_BASE}/findOrCreateChatByProduct/${productId}`,
//     byId: (chatId) => `${API_BASE}/${chatId}`,
//     list: `${API_BASE}/chats`,
//   },
// };

// export default endpoints;


const API_BASE = import.meta.env.VITE_API_URL;

const endpoints = {
  auth: {
    sendOtp: `${API_BASE}/auth/send-otp`,
    verifyOtp: `${API_BASE}/auth/verify-otp`,
  },
  user: {
    profile: `${API_BASE}/auth/user/profile`,
      update: (userId) => `${API_BASE}/auth/update/${userId}`, 
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
    findOrCreateByProduct: (productId) =>
      `${API_BASE}/findOrCreateChatByProduct/${productId}`,
    byId: (chatId) => `${API_BASE}/${chatId}`,
    list: `${API_BASE}/chats`,
  },
};

export default endpoints;
