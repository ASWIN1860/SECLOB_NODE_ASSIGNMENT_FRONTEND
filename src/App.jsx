import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Authpage from "./Pages/Authpage";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Wishlist from "./Pages/Whishlist";

const ProtectedRoute = ({ children }) => {
  return sessionStorage.getItem("token") ? children : <Navigate to="/" />;
};

const AuthRoute = ({ children }) => {
  return sessionStorage.getItem("token") ? <Navigate to="/home" /> : children;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthRoute><Authpage /></AuthRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/productdetails/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
