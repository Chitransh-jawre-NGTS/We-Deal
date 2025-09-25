// // src/redux/slices/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { authApi } from "../../api/auth";
// import { cookies } from "../../utils/cookies";
// import { storage } from "../../utils/localstorage"; // your localStorage wrapper

// // Async Thunks
// export const sendOtp = createAsyncThunk(
//   "auth/sendOtp",
//   async (phone, { rejectWithValue }) => {
//     try {
//       const res = await authApi.sendOtp(phone);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Error sending OTP");
//     }
//   }
// );

// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async ({ phone, otp }, { rejectWithValue }) => {
//     try {
//       const res = await authApi.verifyOtp(phone, otp);

//       // ✅ Save token and user in cookies
//       cookies.set("token", res.data.token);
//       cookies.set("user", JSON.stringify(res.data.user));

//       // ✅ Save token and user in localStorage
//       storage.set("token", res.data.token);
//       storage.set("user", JSON.stringify(res.data.user));

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Error verifying OTP");
//     }
//   }
// );

// // Initial state from cookies or localStorage
// const token = cookies.get("token") || storage.get("token") || null;
// const userStr = cookies.get("user") || storage.get("user") || null;
// const user = token && userStr ? JSON.parse(userStr) : null;

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user,
//     token,
//     loading: false,
//     error: null,
//     otpMessage: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;

//       // Remove from cookies
//       cookies.remove("token");
//       cookies.remove("user");

//       // Remove from localStorage
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       localStorage.removeItem("location");
//       localStorage.removeItem("selectedLocation");
//       localStorage.removeItem("_grecaptcha");
//       localStorage.removeItem("userLocation");
//     },
//       setUser: (state, action) => {
//     state.user = action.payload;
//   },
//   },
//   extraReducers: (builder) => {
//     // sendOtp
//     builder.addCase(sendOtp.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(sendOtp.fulfilled, (state, action) => {
//       state.loading = false;
//       state.otpMessage = action.payload.message;
//     });
//     builder.addCase(sendOtp.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     // verifyOtp
//     builder.addCase(verifyOtp.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(verifyOtp.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     });
//     builder.addCase(verifyOtp.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
// });

// export const { logout,setUser } = authSlice.actions;
// export default authSlice.reducer;












import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth"; // updated path
import { cookies } from "../../utils/cookies";
import { storage } from "../../utils/localstorage";

// ✅ Async Thunks
export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (firebaseToken, { rejectWithValue }) => {
    try {
      const res = await authApi.loginWithEmail(firebaseToken);

      // ✅ Save token and user in cookies
      cookies.set("token", res.data.token);
      cookies.set("user", JSON.stringify(res.data.user));

      // ✅ Save token and user in localStorage
      storage.set("token", res.data.token);
      storage.set("user", JSON.stringify(res.data.user));

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error logging in");
    }
  }
);

// ✅ Initial state from cookies or localStorage
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
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      cookies.remove("token");
      cookies.remove("user");

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("location");
      localStorage.removeItem("selectedLocation");
      localStorage.removeItem("_grecaptcha");
      localStorage.removeItem("userLocation");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // loginWithEmail
    builder.addCase(loginWithEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginWithEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
