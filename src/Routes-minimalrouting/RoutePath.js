import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import RouteGuard from "./RouteGuard";
//history
//import { history } from '../helpers/history';

import BusinessDashboard from "../pages/Business/BusinessDashboard";
// import BusinessProfile from "../pages/Business/BusinessProfile";
import BusinessProfile from "../pages - Copy/MyProfile2/profile";

import BusinessSettings from "../pages/Business/BusinessSettings";
import GetReviews from "../pages - Copy/Get Review/GetReviews";
import BusinessShop from "../pages/Business/BusinessShop";
import BusinessUpgrade from "../pages/Business/BusinessUpgrade";


function hasJWT() {
  let flag = false;
  //check user has JWT token
  localStorage.getItem("vendorToken") ? (flag = true) : (flag = false);
  return flag;
}
const RoutePaths = (props) => {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={<RouteGuard {...props} Component={BusinessDashboard} />}
        />
        <Route
          path="/settings"
          element={<RouteGuard {...props} Component={BusinessSettings} />}
        />

        <Route
          path="/my-profile"
          element={<RouteGuard {...props} Component={BusinessProfile} />}
        />
        <Route
          path="/get-reviews"
          element={<RouteGuard {...props} Component={GetReviews} />}
        />
      
       
      </Routes>
    </>
  );
};
export default RoutePaths;
