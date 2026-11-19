import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import BusinessDashboard from "./BusinessDashboard.jsx";
import HotelDashboard from "./HotelDashboard.jsx";
import ProductDashboard from "./ProductDashboard.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<BusinessDashboard />} />
        <Route path="/dashboard/hotel" element={<HotelDashboard />} />
        <Route path="/dashboard/retail" element={<ProductDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
