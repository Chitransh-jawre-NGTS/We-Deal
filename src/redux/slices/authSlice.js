// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth";
import { cookies } from "../../utils/cookies";
import { storage } from "../../utils/localstorage"; // your localStorage wrapper

// Async Thunks
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const res = await authApi.sendOtp(phone);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error sending OTP");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const res = await authApi.verifyOtp(phone, otp);

      // ✅ Save token and user in cookies
      cookies.set("token", res.data.token);
      cookies.set("user", JSON.stringify(res.data.user));

      // ✅ Save token and user in localStorage
      storage.set("token", res.data.token);
      storage.set("user", JSON.stringify(res.data.user));

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error verifying OTP");
    }
  }
);

// Initial state from cookies or localStorage
const token = cookies.get("token") || storage.get("token") || null;
const userStr = cookies.get("user") || storage.get("user") || null;
const user = token && userStr ? JSON.parse(userStr) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    token,
    loading: false,
    error: null,
    otpMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove from cookies
      cookies.remove("token");
      cookies.remove("user");

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("location");
      localStorage.removeItem("selectedLocation");
      localStorage.removeItem("_grecaptcha");
      localStorage.removeItem("userLocation");
    },
  },
  extraReducers: (builder) => {
    // sendOtp
    builder.addCase(sendOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sendOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.otpMessage = action.payload.message;
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // verifyOtp
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// // src/redux/slices/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { auth } from "../../utils/firebase";
// import { authApi } from "../../api/auth";
// import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// import { cookies } from "../../utils/cookies";
// import { storage } from "../../utils/localstorage";

// // -------------------- Async Thunks --------------------

// // 1️⃣ Send OTP via Firebase
// export const sendOtp = createAsyncThunk(
//   "auth/sendOtp",
//   async (phone, { rejectWithValue }) => {
//     try {
//       if (!auth) throw new Error("Firebase auth is not initialized!");

//       // Only initialize reCAPTCHA if not already
//       if (!window.recaptchaVerifier) {
//         window.recaptchaVerifier = new RecaptchaVerifier(
//           "recaptcha-container",
//           { size: "invisible" },
//           auth
//         );
//         await window.recaptchaVerifier.render();
//       }

//       // ⚠️ For testing (disable reCAPTCHA)
//       if (process.env.NODE_ENV === "development") {
//         auth.settings = { ...auth.settings, appVerificationDisabledForTesting: true };
//       }

//       const appVerifier = window.recaptchaVerifier;
//       const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
//       window.confirmationResult = confirmationResult;

//       return { message: `OTP sent to ${phone}` };
//     } catch (err) {
//       console.error("Firebase OTP error:", err);
//       return rejectWithValue(err.message || "Error sending OTP");
//     }
//   }
// );

// // 2️⃣ Verify OTP & send Firebase ID token to backend
// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async (otp, { rejectWithValue }) => {
//     try {
//       const result = await window.confirmationResult.confirm(otp);
//       const user = result.user;

//       const idToken = await user.getIdToken();
//       const res = await authApi.verifyToken(idToken);

//       cookies.set("token", res.data.token);
//       cookies.set("user", JSON.stringify(res.data.user));
//       storage.set("token", res.data.token);
//       storage.set("user", JSON.stringify(res.data.user));

//       return { user: res.data.user, token: res.data.token };
//     } catch (err) {
//       console.error("OTP verification error:", err);
//       return rejectWithValue(err.response?.data || err.message || "OTP verification failed");
//     }
//   }
// );

// // -------------------- Initial State --------------------
// const token = cookies.get("token") || storage.get("token") || null;
// const userStr = cookies.get("user") || storage.get("user") || null;
// const user = token && userStr ? JSON.parse(userStr) : null;

// // -------------------- Slice --------------------
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user,
//     token,
//     loading: false,
//     error: null,
//     otpMessage: null,
//     otpSent: false,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.otpSent = false;
//       cookies.remove("token");
//       cookies.remove("user");
//       storage.remove("token");
//       storage.remove("user");
//     },
//     resetOtpSent: (state) => {
//       state.otpSent = false;
//       state.otpMessage = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(sendOtp.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(sendOtp.fulfilled, (state, action) => {
//       state.loading = false;
//       state.otpMessage = action.payload.message;
//       state.otpSent = true;
//     });
//     builder.addCase(sendOtp.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     builder.addCase(verifyOtp.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(verifyOtp.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.otpSent = false;
//     });
//     builder.addCase(verifyOtp.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
// });

// export const { logout, resetOtpSent } = authSlice.actions;
// export default authSlice.reducer;
