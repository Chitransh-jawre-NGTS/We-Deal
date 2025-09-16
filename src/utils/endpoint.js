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


const endpoints = {
  auth: {
    sendOtp: "/auth/send-otp",
    verifyOtp: "/auth/verify-otp",
  },
  user: {
    profile: "/user/profile",
  },
  product: {
    list: "/get-products",
    create: (userId) => `/product/${userId}/create`, // POST
    byId: (productId) => `/product/${productId}`,    // GET
    update: (productId) => `/product/${productId}/update`, // PUT
    delete: (productId) => `/product/${productId}/delete`, // DELETE
    userProducts: (userId) => `/product/${userId}`, // GET all products of user
  },
};

export default endpoints;
