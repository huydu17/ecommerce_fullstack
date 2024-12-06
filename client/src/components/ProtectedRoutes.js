import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function ProtectedRoutes({ admin }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  if (admin && userInfo.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
