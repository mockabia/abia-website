import React from "react";
import { Navigate } from "react-router-dom";

function hasJWT() {
  let flag = false;
  localStorage.getItem("vendorToken") ? (flag = true) : (flag = false);
  if(flag==false){
    localStorage.getItem("coupleToken") ? (flag = true) : (flag = false);
  }
  return flag;
}

const RouteGuard = (props) => {
  return (
    <>
      {hasJWT() ? (
        <props.Component {...props} />
      ) : (
        <Navigate to="/business/login" />
      )}
    </>
  );
};

export default RouteGuard;
