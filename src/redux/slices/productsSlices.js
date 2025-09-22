// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "../../api/product";
import { calculateDistance } from "../../utils/distance";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (userCoords, { rejectWithValue }) => {
    try {
      const response = await productApi.getAll();
      let fetchedProducts = Array.isArray(response.data.products)
        ? response.data.products
        : [];

      if (userCoords) {
        fetchedProducts = fetchedProducts.map((p) => {
          let distance = null;
          if (p.location?.coordinates) {
            const [lon, lat] = p.location.coordinates;
            distance = calculateDistance(userCoords.latitude, userCoords.longitude, lat, lon);
          }
          return {
            ...p,
            distance,
            locationName: p.location?.name || p.location?.city || "",
          };
        });

        // sort by distance
        fetchedProducts.sort((a, b) => {
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });
      }

      return fetchedProducts;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
