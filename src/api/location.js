// src/api/location.js

// Get current geolocation (lat, lon)
export const getCurrentCoords = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });

// Reverse geocode lat/lon to city + state
export const getLocationFromCoords = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();

    const city =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "Unknown City";

    const state = data.address.state || "Unknown State";

    return `${city}, ${state}`;
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return "Unknown City, Unknown State";
  }
};

// Main function to get location (city, state)
export const getUserLocation = async () => {
  try {
    const { latitude, longitude } = await getCurrentCoords();
    const location = await getLocationFromCoords(latitude, longitude);

    // Save to localStorage for persistence
    localStorage.setItem("userLocation", location);

    return location;
  } catch (error) {
    console.error("Error getting user location:", error);
    return localStorage.getItem("userLocation") || "Unknown City, Unknown State";
  }
};
