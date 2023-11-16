import { Route, Routes } from "react-router-dom";



import React, { useEffect, useState } from "react";
import * as servicesPage from "./services/contentServices";

import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
/*
import MainContent from "./pages/General/MainContent"; 
import Directory from "./pages/General/GeneralDirectory/Directory.js";
import IdeasAndTopList from "./pages/General/Blog.js";
import Registry from "./pages/General/Registry.js";
import Specials from "./pages/General/Promotions.js";
import Awards from "./pages/General/Awards.js";
import BusinessSetting from "./pages - Copy/Settings/businessSettings.jsx"; */
// import CoupleSignUp from "./pages - Copy/Couples/Signup/index.js";
const App = () => {
  const [commonMenu, setCommonMenu] = useState({});

  useEffect(() => {
    //fetchCommonPageMenu();
  }, []);
  const fetchCommonPageMenu = async () => {
    await servicesPage.fetchHeaderMenus().then(function (response) {
      if (response.statuscode == 200) {
        setCommonMenu(response.result);
      }
    });
  };
  // const { token } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/*" element={<ContentRoutes />} />
        <Route path="/business/*" element={<BusinessRoutes />} />
      </Routes>
    </>
  );
};

export default App;
