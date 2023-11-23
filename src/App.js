import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
import Loader from "./plugins/Loader/Loader";
import CoupleRoutes from "./Routes/CoupleRoutes";

import * as RoutesJS from "./Routes/RoutesJS";

const App = () => {
  const [showLoader, setShowLoader]           = useState(false);

  const [routesFromApi, setRoutesFromApi] = useState([]);
  const [loginMenu, setLoginMenu]         = useState([]);
  const [loginedMenu, setLoginedMenu]     = useState([]);
  const [businessMenu, setBusinessMenu]   = useState([]);

  useEffect(() => {
    RoutesJS.fetchContentRoutes(setRoutesFromApi);
  }, []);
  useEffect(() => {
    RoutesJS.fetchVendorLoginRoutes(setLoginMenu);
  }, [!RoutesJS.hasJWT()]);
  useEffect(() => {
    RoutesJS.fetchVendorLoginedRoutes(setLoginedMenu,setBusinessMenu,setShowLoader);
  }, [RoutesJS.hasJWT()]);


  return (
    <>
    <Loader active={showLoader}/>
      <Routes>
        <Route path="/business/*" element={<BusinessRoutes  showLoader={showLoader} setShowLoader={setShowLoader} 
            leftmenu={businessMenu} topmenu={loginedMenu} loginMenu={loginMenu} />} />
        <Route path="/wedding/*" element={<CoupleRoutes  showLoader={showLoader} setShowLoader={setShowLoader} />} />
        <Route path="/*" element={<ContentRoutes  showLoader={showLoader} setShowLoader={setShowLoader} 
            routesFromApi={routesFromApi} loginMenu={loginMenu} topmenu={loginedMenu}/>} />
      </Routes>
    </>
  );
};

export default App;
