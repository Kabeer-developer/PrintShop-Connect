import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import StoreDetail from "./pages/StoreDetail";
import RegisterStore from "./pages/RegisterStore";
import LoginStore from "./pages/LoginStore";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

import { loadUserFromStorage } from "./redux/slices/storeSlice";

const App = () => {
  const dispatch = useDispatch();
  const { storeInfo } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/register" element={<RegisterStore />} />
          <Route path="/login" element={<LoginStore />} />

          <Route
            path="/dashboard"
            element={storeInfo ? <Dashboard /> : <Navigate to="/login" replace />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
