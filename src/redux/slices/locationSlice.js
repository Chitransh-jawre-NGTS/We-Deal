// src/redux/slices/locationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserLocation, getLocationFromCoords } from "../../api/location";

export const detectCurrentLocation = createAsyncThunk(
  "location/detectCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const location = await getUserLocation(); // your geolocation + reverse geocoding util
      const [cityName, stateName] = location.split(", ");
      const newLocation = { city: cityName, state: stateName };

      localStorage.setItem("selectedLocation", JSON.stringify(newLocation));
      return newLocation;
    } catch (err) {
      return rejectWithValue("Failed to detect location. Please allow location access.");
    }
  }
);

export const searchLocation = createAsyncThunk(
  "location/search",
  async (locationQuery, { rejectWithValue }) => {
    try {
      const searchRes = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          locationQuery
        )}&format=json&limit=1`
      );
      const results = await searchRes.json();

      let newLocation;
      if (results.length > 0) {
        const { lat, lon } = results[0];
        const resolvedLocation = await getLocationFromCoords(lat, lon);
        const [cityName, stateName] = resolvedLocation.split(", ");
        newLocation = { city: cityName, state: stateName };
      } else {
        newLocation = { city: locationQuery, state: "" };
      }

      localStorage.setItem("selectedLocation", JSON.stringify(newLocation));
      return newLocation;
    } catch (err) {
      return rejectWithValue("Failed to fetch location.");
    }
  }
);

const initialState = {
  selected: JSON.parse(localStorage.getItem("selectedLocation")) || { city: "", state: "" },
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.selected = action.payload;
      localStorage.setItem("selectedLocation", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(detectCurrentLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(detectCurrentLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(detectCurrentLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(searchLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(searchLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
