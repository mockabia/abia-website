import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
import Loader from "./plugins/Loader/Loader";
import CoupleRoutes from "./Routes/CoupleRoutes";
import CouplesSignUp from "./pages/Couple/CoupleSignUp";

import * as RoutesJS from "./Routes/RoutesJS";

const App = () => {
  const [showLoader, setShowLoader] = useState(false);

  const [routesFromApi, setRoutesFromApi] = useState([]);
  const [vloginMenu, setvLoginMenu] = useState([]);
  const [vloginedMenu, setvLoginedMenu] = useState([]);
  const [businessMenu, setBusinessMenu] = useState([]);
  const [cloginMenu, setcLoginMenu] = useState([]);
  const [cloginedMenu, setcLoginedMenu] = useState([]);
  const [coupleMenu, setCoupleMenu] = useState([]);

  /* useEffect(() => {
    RoutesJS.fetchContentRoutes(setRoutesFromApi);
  }, []);
  useEffect(() => {
    RoutesJS.fetchVendorLoginRoutes(setvLoginMenu);
  }, [!RoutesJS.hasVendorJWT()]);
  useEffect(() => {
    RoutesJS.fetchVendorLoginedRoutes(setvLoginedMenu,setBusinessMenu,setShowLoader);
  }, [RoutesJS.hasVendorJWT()]);
  useEffect(() => {
    RoutesJS.fetchCoupleLoginRoutes(setcLoginMenu);
  }, [!RoutesJS.hasCoupleJWT()]);
  useEffect(() => {
    RoutesJS.fetchCoupleLoginedRoutes(setcLoginedMenu,setCoupleMenu,setShowLoader);
  }, [RoutesJS.hasCoupleJWT()]); */
  useEffect(() => {
    RoutesJS.fetchContentRoutes(setRoutesFromApi);
    RoutesJS.fetchVendorDashboardRoutes(setBusinessMenu, setShowLoader);
    RoutesJS.fetchCoupleDashboardRoutes(setCoupleMenu, setShowLoader);
  }, []);

  return (
    <>
      <Loader active={showLoader} />
      <Routes>
        <Route
          path="/business/*"
          element={
            <BusinessRoutes
              showLoader={showLoader}
              setShowLoader={setShowLoader}
              menu={businessMenu}
            />
          }
        />
        <Route
          path="/wedding/*"
          element={
            <CoupleRoutes
              showLoader={showLoader}
              setShowLoader={setShowLoader}
              menu={coupleMenu}
            />
          }
        />
        <Route
          path="/*"
          element={
            <ContentRoutes
              showLoader={showLoader}
              setShowLoader={setShowLoader}
              routesFromApi={routesFromApi}
            />
          }
        />
        <Route path="/test/signup" element={<CouplesSignUp />} />
      </Routes>
    </>
  );
};

export default App;
