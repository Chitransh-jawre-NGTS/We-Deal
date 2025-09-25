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
};
