import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return {children} ;
};

export default PrivateRoute;