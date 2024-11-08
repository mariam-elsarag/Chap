import React, { Suspense, lazy, useEffect, useState } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/Auth/AuthContext";
// Routes
// auth
const UnAuthLayout = lazy(() => import("./pages/Auth/UnAuthLayout"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Otp = lazy(() => import("./pages/Auth/Otp"));
const ForgetPassword = lazy(() => import("./pages/Auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));

const AppLayout = lazy(() => import("./pages/AppLayout"));

const App = () => {
  const { token } = useAuth();

  return (
    <Suspense>
      <Routes location={location} key={location.pathname}>
        {token ? (
          <Route path="/" element={<AppLayout />} />
        ) : (
          <Route path="/" element={<UnAuthLayout />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="otp" element={<Otp />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="forget-password" element={<ForgetPassword />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default App;
