import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as servicesPage from "./services/contentServices";
import RootLayout from "./layouts/RootLayout";

import RoutePath from "./Routes/RoutePath";
import ContentRoutes from "./Routes/ContentRoutes";
import BusinessLogin from "./pages/General/BusinessLogin";
import BusinessSignup from "./pages/General/BusinessSignup";
import BusinessLoginState from "./pages/General/BusinessLoginState";
import MainContent from "./pages/General/MainContent";
import Public from "./pages/General/Public";
import Directory from "./pages/General/GeneralDirectory/Directory.js";
import IdeasAndTopList from "./pages/General/Blog.js";
// import Registry from "./pages/General/Registry.js";
import Specials from "./pages/General/Promotions.js";
import Awards from "./pages/General/Awards.js";
import BusinessSetting from "./pages - Copy/Settings/businessSettings.jsx";
import CoupleSignUp from "./pages - Copy/Couples/Signup/index.js";
import CSideBar from "./components/Couple-Layout/CSideBar.js";
import CouplesLogin from "./pages/Couple/CouplesLogin.js";

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
        <Route path="/" element={<Public />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/directory" element={<Directory />} />

        {/* BUSINESS */}
        <Route
          path="/business/*"
          element={
            <Routes>
              <Route path="/login" element={<BusinessLogin />} />
              <Route path="/signup" element={<BusinessSignup />} />
              <Route path="/user-state" element={<BusinessLoginState />} />
              <Route path="/wedding-profile" element={<CSideBar />} />
              <Route path="/*" element={<RoutePath />} />
            </Routes>
          }
        />
        <Route
          path="/wedding/*"
          element={
            <Routes>
              <Route path="/login" element={<CouplesLogin />} />
              <Route path="/signup" element={<CoupleSignUp/>} />
            </Routes>
          }
        />
      </Routes>
      <ContentRoutes />
    </>
  );
};

export default App;
