


// const API_BASE = import.meta.env.VITE_API_URL;

// const endpoints = {
//   auth: {
//     sendOtp: `${API_BASE}/auth/send-otp`,
//     verifyOtp: `${API_BASE}/auth/verify-otp`,
//   },
//   user: {
//     profile: `${API_BASE}/auth/user/profile`,
//       update: (userId) => `${API_BASE}/auth/update/${userId}`, 
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



// const API_BASE = import.meta.env.VITE_API_URL;

// const endpoints = {
//   auth: {
//     login: `${API_BASE}/auth/login-email`,
//     sendOtp: `${API_BASE}/auth/send-otp`,
//     verifyOtp: `${API_BASE}/auth/verify-otp`,
//   },
//   user: {
//     profile: `${API_BASE}/auth/user/profile`,
//     update: (userId) => `${API_BASE}/auth/update/${userId}`, 
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
//   // src/api/endpoints.js

//   location: {
//     REVERSE_GEOCODE: `${API_BASE}/location/rev_geocode`,
//     SEARCH: `${API_BASE}/location/search`,
//   },

// };

// export default endpoints;



const endpoints = {
  auth: {
    login: `/auth/login-email`,
    sendOtp: `/auth/send-otp`,
    verifyOtp: `/auth/verify-otp`,
  },
  user: {
    profile: `/auth/user/profile`,
    update: (userId) => `/auth/update/${userId}`,
  },
  product: {
    list: `/get-products`,
    create: `/create`,
    byId: (productId) => `/product/${productId}`,
    update: (productId) => `/product/${productId}/update`,
    delete: (productId) => `/product/${productId}/delete`,
    userProducts: (userId) => `/product/${userId}`,
  },
  chat: {
    findOrCreateByProduct: (productId) => `/findOrCreateChatByProduct/${productId}`,
    byId: (chatId) => `/${chatId}`,
    list: `/chats`,
  },
  location: {
    REVERSE_GEOCODE: `/location/rev_geocode`,
    SEARCH: `/location/search`,
  },
};

export default endpoints;
