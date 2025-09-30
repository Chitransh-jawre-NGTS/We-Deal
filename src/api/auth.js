// // // src/api/api.js
// // import httpClient from "../utils/httpClient";
// // import endpoints from "../utils/endpoint";

// // export const authApi = {
// //   sendOtp: (phone) => httpClient.post(endpoints.auth.sendOtp, { phone }),
// //   verifyOtp: (phone, otp) => httpClient.post(endpoints.auth.verifyOtp, { phone, otp }),
// // };

// // export const userApi = {
// //   getProfile: () => httpClient.get(endpoints.user.profile),
// // };


// // src/api/api.js3



// import httpClient from "../utils/httpClient";
// import endpoints from "../utils/endpoint";

// export const authApi = {
//   sendOtp: (phone) => httpClient.post(endpoints.auth.sendOtp, { phone }),
//   verifyOtp: (phone, otp) => httpClient.post(endpoints.auth.verifyOtp, { phone, otp }),
// };

// export const userApi = {
//   getProfile: () => httpClient.get(endpoints.user.profile),

//   updateProfile: (userId, data) =>
//     httpClient.put(endpoints.user.update(userId), data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     }),
// };




import httpClient from "../utils/httpClient";
// import axios only if you want to use it separately
// import axios from "axios"; 

import endpoints from "../utils/endpoint";

export const authApi = {
  loginWithEmail: (firebaseToken) =>
    httpClient.post(endpoints.auth.login, { firebaseToken }), // 👈 use "login"
};

export const userApi = {
  getProfile: () => httpClient.get(endpoints.user.profile),

  updateProfile: (userId, data) =>
    httpClient.put(endpoints.user.update(userId), data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // ✅ Fixed: use httpClient instead of axios
  getAdStats: () => httpClient.get("/ad-stats", { withCredentials: true }),
};
