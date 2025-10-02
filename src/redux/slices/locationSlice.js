// // src/redux/slices/locationSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getUserLocation, getLocationFromCoords } from "../../api/location";

// export const detectCurrentLocation = createAsyncThunk(
//   "location/detectCurrent",
//   async (_, { rejectWithValue }) => {
//     try {
//       const location = await getUserLocation(); // your geolocation + reverse geocoding util
//       const [cityName, stateName] = location.split(", ");
//       const newLocation = { city: cityName, state: stateName };

//       localStorage.setItem("selectedLocation", JSON.stringify(newLocation));
//       return newLocation;
//     } catch (err) {
//       return rejectWithValue("Failed to detect location. Please allow location access.");
//     }
//   }
// );

// export const searchLocation = createAsyncThunk(
//   "location/search",
//   async (locationQuery, { rejectWithValue }) => {
//     try {
//       const searchRes = await fetch(
//         `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//           locationQuery
//         )}&format=json&limit=1`
//       );
//       const results = await searchRes.json();

//       let newLocation;
//       if (results.length > 0) {
//         const { lat, lon } = results[0];
//         const resolvedLocation = await getLocationFromCoords(lat, lon);
//         const [cityName, stateName] = resolvedLocation.split(", ");
//         newLocation = { city: cityName, state: stateName };
//       } else {
//         newLocation = { city: locationQuery, state: "" };
//       }

//       localStorage.setItem("selectedLocation", JSON.stringify(newLocation));
//       return newLocation;
//     } catch (err) {
//       return rejectWithValue("Failed to fetch location.");
//     }
//   }
// );

// const initialState = {
//   selected: JSON.parse(localStorage.getItem("selectedLocation")) || { city: "", state: "" },
//   status: "idle", // idle | loading | succeeded | failed
//   error: null,
// };

// const locationSlice = createSlice({
//   name: "location",
//   initialState,
//   reducers: {
//     setLocation: (state, action) => {
//       state.selected = action.payload;
//       localStorage.setItem("selectedLocation", JSON.stringify(action.payload));
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(detectCurrentLocation.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(detectCurrentLocation.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.selected = action.payload;
//       })
//       .addCase(detectCurrentLocation.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(searchLocation.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(searchLocation.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.selected = action.payload;
//       })
//       .addCase(searchLocation.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { setLocation } = locationSlice.actions;
// export default locationSlice.reducer;

// src/redux/slices/locationSlice.js





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { locationApi } from "../../api/location";

// // Detect user current location
// export const detectCurrentLocation = createAsyncThunk(
//   "location/detectCurrent",
//   async (_, { rejectWithValue }) => {
//     try {
//       const location = await locationApi.getUserLocation(); 
//       // location is the object you just pasted

//       const newLocation = {
//         city: location.city || "seoni",
//         state: location.state || "",
//         latitude: location.lat || null,
//         longitude: location.lng || null,
//       };

//       localStorage.setItem("selectedLocation", JSON.stringify(newLocation));
//       return newLocation;
//     } catch (err) {
//       return rejectWithValue("Failed to detect location");
//     }
//   }
// );


// // Search for a location
// export const searchLocation = createAsyncThunk(
//   "location/search",
//   async (query, { rejectWithValue }) => {
//     try {
//       // Use your location API
//       const results = await locationApi.searchLocation(query);

//       let newLocation;

//       if (results && results.length > 0) {
//         const loc = results[0]; // pick the first result
//         newLocation = {
//           city: loc.city || query,
//           state: loc.state || "",
//           latitude: loc.latitude || loc.lat || null,
//           longitude: loc.longitude || loc.lng || null,
//         };
//       } else {
//         newLocation = { city: query, state: "", latitude: null, longitude: null };
//       }

//       // Save in localStorage
//       localStorage.setItem("selectedLocation", JSON.stringify(newLocation));
//       return newLocation;
//     } catch (err) {
//       return rejectWithValue("Failed to search location");
//     }
//   }
// );


// const initialState = {
//   selected: JSON.parse(localStorage.getItem("selectedLocation")) || { 
//     city: "", 
//     state: "", 
//     latitude: null, 
//     longitude: null 
//   },
//   status: "idle",
//   error: null,
// };

// const locationSlice = createSlice({
//   name: "location",
//   initialState,
//   reducers: {
//     setLocation: (state, action) => {
//       state.selected = action.payload;
//       localStorage.setItem("selectedLocation", JSON.stringify(action.payload));
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(detectCurrentLocation.pending, (state) => { state.status = "loading"; })
//       .addCase(detectCurrentLocation.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.selected = action.payload;
//       })
//       .addCase(detectCurrentLocation.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(searchLocation.pending, (state) => { state.status = "loading"; })
//       .addCase(searchLocation.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.selected = action.payload;
//       })
//       .addCase(searchLocation.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { setLocation } = locationSlice.actions;
// export default locationSlice.reducer;













import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { locationApi } from "../../api/location";

// Detect user current location
export const detectCurrentLocation = createAsyncThunk(
  "location/detectCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const location = await locationApi.getUserLocation(); 
      const newLocation = {
        city: location.city || "seoni",
        state: location.state || "",
        latitude: location.lat || null,
        longitude: location.lng || null,
      };
      localStorage.setItem("selectedLocation", JSON.stringify(newLocation));
      return newLocation;
    } catch (err) {
      return rejectWithValue("Failed to detect location");
    }
  }
);

// Search for a location
export const searchLocation = createAsyncThunk(
  "location/search",
  async (query, { rejectWithValue }) => {
    try {
      const results = await locationApi.searchLocation(query);

      if (!results || results.length === 0) {
        const fallback = { city: query, state: "", latitude: null, longitude: null };
        localStorage.setItem("selectedLocation", JSON.stringify(fallback));
        return { selectedLocation: fallback, results: [] };
      }

      const first = results[0];
      // Parse display_name to get city/state fallback
      const parts = first.display_name ? first.display_name.split(",").map((p) => p.trim()) : [];
      const city = first.city || first.town || first.village || parts[0] || query;
      const state = first.state || first.district || parts[1] || "";

      const selectedLocation = {
        city,
        state,
        latitude: first.latitude || first.lat || null,
        longitude: first.longitude || first.lng || null,
      };

      localStorage.setItem("selectedLocation", JSON.stringify(selectedLocation));

      return { selectedLocation, results };
    } catch (err) {
      return rejectWithValue("Failed to search location");
    }
  }
);


const initialState = {
  selected: JSON.parse(localStorage.getItem("selectedLocation")) || { 
    city: "", 
    state: "", 
    latitude: null, 
    longitude: null 
  },
  suggestions: [],
  status: "idle",
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
    clearSuggestions: (state) => {
      state.suggestions = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(detectCurrentLocation.pending, (state) => { state.status = "loading"; })
      .addCase(detectCurrentLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(detectCurrentLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(searchLocation.pending, (state) => { state.status = "loading"; })
      .addCase(searchLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload.selectedLocation;
        state.suggestions = action.payload.results || [];
      })
      .addCase(searchLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setLocation, clearSuggestions } = locationSlice.actions;
export default locationSlice.reducer;
