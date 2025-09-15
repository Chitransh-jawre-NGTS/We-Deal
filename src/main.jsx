import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";  // ✅ Import Redux Provider
import store from "./redux/store";       // ✅ Import your Redux store

createRoot(document.getElementById("root")).render(
  <Provider store={store}>   {/* ✅ Wrap app inside Redux Provider */}
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
