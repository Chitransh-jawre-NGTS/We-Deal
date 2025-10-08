// // src/api/location.js

// // Get current geolocation (lat, lon)
// export const getCurrentCoords = () =>
//   new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error("Geolocation not supported"));
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });

// // Reverse geocode lat/lon to city + state
// export const getLocationFromCoords = async (latitude, longitude) => {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//     );
//     const data = await response.json();

//     const city =
//       data.address.city ||
//       data.address.town ||
//       data.address.village ||
//       "Unknown City";

//     const state = data.address.state || "Unknown State";

//     return `${city}, ${state}`;
//   } catch (error) {
//     console.error("Failed to fetch location:", error);
//     return "Unknown City, Unknown State";
//   }
// };

// // Main function to get location (city, state)
// export const getUserLocation = async () => {
//   try {
//     const { latitude, longitude } = await getCurrentCoords();
//     const location = await getLocationFromCoords(latitude, longitude);

//     // Save to localStorage for persistence
//     localStorage.setItem("userLocation", location);

//     return location;
//   } catch (error) {
//     console.error("Error getting user location:", error);
//     return localStorage.getItem("userLocation") || "Unknown City, Unknown State";
//   }
// };
// src/api/location.js

// src/api/location.js


// src/api/location.js

// Get current geolocation (lat, lon)













// src/api/locationApi.js
import httpClient from "../utils/httpClient";
import endpoints from "../utils/endpoint";

const { location: LOCATION_ENDPOINTS } = endpoints;


export const locationApi = {
  // ✅ Get current coordinates from browser
  getCurrentCoords: () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject(new Error("Geolocation not supported"));
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        (err) => reject(err)
      );
    }),

  // ✅ Reverse geocode lat/lng via backend
getLocationFromCoords: async (latitude, longitude) => {
  try {
    const { data } = await httpClient.get(LOCATION_ENDPOINTS.REVERSE_GEOCODE, {
      params: { lat: latitude, lng: longitude },
    });

    console.log("Reverse geocode API response:", data);

    // Use top-level city/state if present, fallback to fullData.address
    const city =
      data.city ||
      data.fullData?.address?.city ||
      data.fullData?.address?.city_district ||
      "Unknown City";

    const state =
      data.state ||
      data.fullData?.address?.state ||
      data.fullData?.address?.state_district ||
      "Unknown State";

    console.log("Parsed city/state:", { city, state });

    return { city, state };
  } catch (err) {
    console.error("Backend reverse geocode failed:", err);
    return { city: "Unknown City", state: "Unknown State" };
  }
},


  // ✅ Get full user location (coords + reverse geocode)
getUserLocation: async function () {
  try {
    // Step 1: Get coordinates
    const { latitude, longitude } = await this.getCurrentCoords();

    // Step 2: Get city/state from API using only lat/lng
    const { city, state } = await this.getLocationFromCoords(latitude, longitude);

    // Step 3: Merge into single object
    const locationObj = { city, state, latitude, longitude };
    

    // Step 4: Save to localStorage
    localStorage.setItem("selectedLocation", JSON.stringify(locationObj));

    return locationObj;
  } catch (err) {
    console.error("Failed to get user location:", err);
    return (
      JSON.parse(localStorage.getItem("selectedLocation")) || {
        city: null,
        state: null,
        latitude: null,
        longitude: null,
      }
    );
  }
},


  // ✅ Search a location via backend
  searchLocation: async function (query) {
    try {
      const { data } = await httpClient.get(LOCATION_ENDPOINTS.SEARCH, {
        params: { query },
      });

      if (data.results && data.results.length > 0) {
        const place = data.results[0];
        return {
          city: place.city || place.district || "Unknown City",
          state: place.state || "Unknown State",
          latitude: place.latitude || place.lat || null,
          longitude: place.longitude || place.lng || null,
        };
      }

      return { city: query, state: "", latitude: null, longitude: null };
    } catch (err) {
      console.error("Backend location search failed:", err);
      return { city: query, state: "", latitude: null, longitude: null };
    }
  },
};
