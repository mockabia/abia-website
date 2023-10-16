import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = useAuth();

  if (!auth.userEmail) {
    return <Navigate to={"/login"} />;
  }
  return <div>{children}</div>;
};

export default RequireAuth;
