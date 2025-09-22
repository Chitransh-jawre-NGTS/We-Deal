// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productsSlices";
import wishlistReducer from "./slices/wishlistSlice"
import locationReducer from "./slices/locationSlice";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    wishlist: wishlistReducer,
      location: locationReducer,
       chat: chatReducer, 
  },
});

export default store;
