// src/redux/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { wishlistApi } from "../../api/wishlist";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await wishlistApi.get();
    return res.data.products.map((p) => p._id);
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch wishlist");
  }
});

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { wishlist } = getState().wishlist;
      let res;
      if (wishlist.includes(productId)) {
        res = await wishlistApi.remove(productId);
      } else {
        res = await wishlistApi.add(productId);
      }
      return res.data.products.map((p) => p._id);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
