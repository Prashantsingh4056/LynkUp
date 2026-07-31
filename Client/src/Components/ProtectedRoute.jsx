import React from "react";
import { Navigate } from "react-router-dom";
import { getUserData } from "../Context/userContext";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const { user, loading } = getUserData();

  if (loading) {
    return <Loader/>
  }

  return user ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
