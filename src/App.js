import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as servicesPage from "./services/contentServices";
import RootLayout from "./layouts/RootLayout";

import RoutePath from "./Routes/RoutePath";
import BusinessLogin from "./pages/General/BusinessLogin";
import BusinessSignup from "./pages/General/BusinessSignup";
import BusinessLoginState from "./pages/General/BusinessLoginState";
import MainContent from "./pages/General/MainContent";
import Public from "./pages/General/Public";
import Directory from "./pages/General/GeneralDirectory/Directory.js";
import IdeasAndTopList from "./pages/General/GeneralIdeasPage.js";
import Registry from "./pages/General/GeneralRegistry.js";
import Specials from "./pages/General/GeneralSpecials.js";
import Awards from "./pages/General/GeneralAwards.js";
import BusinessSetting from "./pages - Copy/Settings/businessSettings.jsx";
// import CoupleSignUp from "./pages - Copy/Couples/Signup/index.js";
import CSideBar from "./components/Couple-Layout/CSideBar.js";
const App = () => {
  const [commonMenu, setCommonMenu] = useState({});

  useEffect(() => {
    fetchCommonPageMenu();
  }, []);
  const fetchCommonPageMenu = async () => {
    await servicesPage.fetchMenu().then(function (response) {
      if (response.statuscode == 200) {
        setCommonMenu(response.result);
      }
    });
  };
  // const { token } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Public />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/ideas-topLists" element={<IdeasAndTopList />} />
      <Route path="/registry" element={<Registry />} />
      <Route path="/specials" element={<Specials />} />
      <Route path="/awards" element={<Awards />} />

      {/* <Route path="/login" element={<Login />} />
      <Route path="/user-state" element={<LoginUserState />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/wedding-signup" element={<CoupleSignUp />} />
      <Route path="/wedding-login" element={<CouplesLogin />} />

      <Route path="/" element={<Public />} />
      <Route path="/registry" element={<Registry />} /> */}
      {Object.values(commonMenu).map((MainMenu, i) => (
        <Route path={`/${MainMenu.url}`} element={<MainContent />} />
      ))}
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
    </Routes>
  );
};

export default App;
