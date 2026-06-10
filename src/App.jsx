import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Authpage from "./Pages/Authpage";
import Home from "./Pages/Home";
import Header from "./components/Header";
import ProductDetails from "./Pages/ProductDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productdetails" element={<ProductDetails />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
