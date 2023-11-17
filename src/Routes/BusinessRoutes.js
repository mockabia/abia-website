import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as servicesPage from "../services/contentServices";
import loadable from "@loadable/component";
import LayoutVendor from "../layouts/Layout/LayoutVendor";
import RoutePath from "../Routes/RoutePath";

import RouteGuard from "./RouteGuard";
//history
//import { history } from '../helpers/history';

import BusinessLogin from "../pages/General/BusinessLogin";
import BusinessSignup from "../pages/General/BusinessSignup";
import BusinessLoginState from "../pages/General/BusinessLoginState";
import CSideBar from "../components/Couple-Layout/CSideBar";

import BusinessDashboard from "../pages/Business/Dashboard";
import BusinessProfile from "../pages - Copy/MyProfile2/profile";
import BusinessSettings from "../pages/Business/BusinessSettings/BusinessSettings";
import GetReviews from "../pages - Copy/Get Review/GetReviews";

const ContentRoutes = (props) => {
  const [routesFromApi, setRoutesFromApi] = useState([]);
  const location = useLocation();

  const LoadablePage = loadable((props) => import(`../pages/Business/${props.page}`));

  useEffect(() => {
    //fetchVendorMenuRoutes();
  }, []);
  const fetchVendorMenuRoutes = async () => {
    await servicesPage.fetchVendorMenuRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi(response.result);
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
      <Route path="/login" element={<BusinessLogin />} />
      <Route path="/signup" element={<BusinessSignup />} />
      <Route path="/user-state" element={<BusinessLoginState />} />
      <Route path="/wedding-profile" element={<CSideBar />} />
      <Route
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
            </Routes>
          </LayoutVendor>
        }
      />
    </Routes>
  );
};
export default ContentRoutes;
