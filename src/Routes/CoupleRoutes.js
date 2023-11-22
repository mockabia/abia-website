import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as servicesPage from "../services/contentServices";
import loadable from "@loadable/component";
import LayoutVendor from "../layouts/Layout/LayoutVendor";
import RoutePath from "../Routes/RoutePath";

import RouteGuard from "./RouteGuard";
//history
//import { history } from '../helpers/history';

// import BusinessLogin from "../pages/General/BusinessLogin";
// import BusinessSignup from "../pages/General/BusinessSignup";
// import BusinessLoginState from "../pages/General/BusinessLoginState";
import CSideBar from "../components/Couple-Layout/CSideBar";
import CouplesLogin from "../pages/Couple/CouplesLogin";
import CoupleSignUp from "../pages/Couple/CoupleSignUp";
// import BusinessDashboard from "../pages/Business/Dashboard";
// import BusinessProfile from "../pages - Copy/MyProfile2/profile";
// import BusinessSettings from "../pages/Business/BusinessSettings/BusinessSettings";
// import GetReviews from "../pages/Business/BusinessGetReview/BusinessGetReviews";
// import PastWedding from "../pages/Business/BusinessGetReview/BusinessPastWedding";

const CoupleRoutes = (props) => {
  const [routesFromApi, setRoutesFromApi] = useState([]);
  const location = useLocation();

  const LoadablePage = loadable((props) =>
    import(`../pages/Business/${props.page}`)
  );

  useEffect(() => {
    props.setShowLoader(false);
    fetchCoupleLoginRoutes();
  }, []);
  const fetchCoupleLoginRoutes = async () => {
    await servicesPage.fetchCoupleLoginRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi(response.result);
      }
      //fetchCoupleLoginedRoutes();
    });
  };
  const fetchCoupleLoginedRoutes = async () => {
    await servicesPage.fetchCoupleLoginedRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi((oldArray) => [...oldArray, response.result]);
      }
      //fetchCoupleDashboardRoutes();
    });
  };
  const fetchCoupleDashboardRoutes = async () => {
    await servicesPage.fetchCoupleDashboardRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi((oldArray) => [...oldArray, response.result]);
      }
    });
  };

  function hasJWT() {
    let flag = false;
    //check user has JWT token
    localStorage.getItem("vendorToken") ? (flag = true) : (flag = false);
    return flag;
  }
  return (
    <Routes>
      {/* {routesFromApi.map((routes, i) => (
          <Route
            path={`/${routes.url}`}
            element={<LoadablePage page={routes.pagename} {...props} />}
          />
        ))} */}
      <Route path="/login" element={<CouplesLogin />} />
      <Route path="/signup" element={<CoupleSignUp />} />

      {/* <Route
        path="/*"
        element={
          <LayoutVendor>
            <Routes>
              <Route
                path="/home"
                element={
                  <RouteGuard {...props} Component={BusinessDashboard} />
                }
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
              <Route
                path="/get-reviews/past-wedding"
                element={<RouteGuard {...props} Component={PastWedding} />}
              />
            </Routes>
          </LayoutVendor>
        }
      /> */}
    </Routes>
  );
};
export default CoupleRoutes;
