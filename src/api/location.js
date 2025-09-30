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
        (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        (err) => reject(err)
      );
    }),

  // ✅ Reverse geocode lat/lng via backend
  getLocationFromCoords: async (latitude, longitude) => {
    try {
      const { data } = await httpClient.get(LOCATION_ENDPOINTS.REVERSE_GEOCODE, {
        params: { lat: latitude, lng: longitude },
      });

      if (data.results && data.results.length > 0) {
        const place = data.results[0];
        const city = place.city || place.district || "Unknown City";
        const state = place.state || "Unknown State";
        return `${city}, ${state}`;
      }
      return "Unknown City, Unknown State";
    } catch (err) {
      console.error("Backend reverse geocode failed:", err);
      return "Unknown City, Unknown State";
    }
  },

  // ✅ Search a location via backend
  searchLocation: async (query) => {
    try {
      const { data } = await httpClient.get(LOCATION_ENDPOINTS.SEARCH, {
        params: { query },
      });

      if (data.results && data.results.length > 0) {
        const place = data.results[0];
        const city = place.city || place.district || "Unknown City";
        const state = place.state || "Unknown State";
        return { city, state };
      }
      return { city: query, state: "" };
    } catch (err) {
      console.error("Backend location search failed:", err);
      return { city: query, state: "" };
    }
  },

  // ✅ Get full user location (coords + reverse geocode)
  getUserLocation: async () => {
    try {
      const { latitude, longitude } = await locationApi.getCurrentCoords();
      const location = await locationApi.getLocationFromCoords(latitude, longitude);
      localStorage.setItem("selectedLocation", JSON.stringify(location));
      return location;
    } catch (err) {
      console.error(err);
      return localStorage.getItem("selectedLocation") || "Unknown City, Unknown State";
    }
  },
};
