import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import RouteGuard from "./RouteGuard";
//history
//import { history } from '../helpers/history';

import BusinessProfile from "../pages/Business/BusinessProfile";
import BusinessSettings from "../pages/Business/BusinessSettings";

/*import Login from "./pages/Login/LoginPage";
import Public from "./pages/Public";
//get review
import GetReviews from "./pages/Get Review/GetReviews";
import PastWedding from "./pages/Get Review/pastWedding";
import FutureWedding from "./pages/Get Review/futureWedding";
import CopyLink from "./pages/Get Review/reviewLink";

import ManageReview from "./pages/ManageReview";
import ReviewWidget from "./pages/Showcase/reviewWidget";
import AwardBadges from "./pages/Showcase/awardBadges";
import Promotions from "./pages/Promotions";
import Shop from "./pages/Shop";
import Enquiries from "./pages/Enquiries";
import BusinessSetting from "./pages/Settings/businessSettings";
import UpdateListing from "./pages/Settings/updateListing";
import upgradeNow from "./pages/upgradeNow";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Dashboard/Home";
import Directory from "./pages/Directory/index";
import CoupleSignUp from "./pages/Couples/Signup/index";
import CouplesLogin from "./pages/Couples/Login/index";
import { useAuth } from "./context/AuthProvider";*/

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
          path="/my-profile"
          element={<RouteGuard {...props} Component={BusinessProfile} />}
        />
        <Route
          path="/settings"
          element={<RouteGuard {...props} Component={BusinessSettings} />}
        />
      </Routes>
    </>
  );
};
export default RoutePaths;
