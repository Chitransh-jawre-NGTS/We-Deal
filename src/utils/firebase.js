// // src/utils/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"; // import getAuth for OTP login

// const firebaseConfig = {
//   apiKey: "AIzaSyCk2rFMRyaUWYtjwzwuDXp-ZGZzfmMzuxM",
//   authDomain: "wedoby.firebaseapp.com",
//   projectId: "wedoby",
//   storageBucket: "wedoby.appspot.com",
//   messagingSenderId: "684012137105",
//   appId: "1:684012137105:web:1b4caf36753ae4f6e0ad30",
//   measurementId: "G-GE47WZE8JT"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and export it
// export const auth = getAuth(app);


// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // import GoogleAuthProvider

const firebaseConfig = {
  apiKey: "AIzaSyCk2rFMRyaUWYtjwzwuDXp-ZGZzfmMzuxM",
  authDomain: "wedoby.firebaseapp.com",
  projectId: "wedoby",
  storageBucket: "wedoby.appspot.com",
  messagingSenderId: "684012137105",
  appId: "1:684012137105:web:1b4caf36753ae4f6e0ad30",
  measurementId: "G-GE47WZE8JT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Export Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
