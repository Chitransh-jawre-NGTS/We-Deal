// src/routes/NormalProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const NormalProtectedRoute = ({ children }) => {
  const storeToken = localStorage.getItem("storeToken");

  if (storeToken) {
    // If store is logged in → block access to normal routes
    return <Navigate to="/store/dashboard" replace />;
  }

  return children;
};

export default NormalProtectedRoute;
