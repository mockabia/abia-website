import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
import Loader from "./plugins/Loader/Loader";
import CoupleRoutes from "./Routes/CoupleRoutes";

import * as RoutesJS from "./Routes/RoutesJS";
import Partnership from "./pages/General/Partnership";
import Reviews from "./pages/General/Reviews";
import BlogFonts from "./pages/General/Blog-font/fonts";
import PublicProfile from "./pages/General/PublicProfile/PublicProfile";

import EditSubscription from "./pages/General/EditSubscription";
import EditPayment from "./pages/General/Payments/EditPayment";
import ExistingUserPayment from "./pages/General/Payments/ExistingUserPayment";
import BusinessProfile1 from "./pages/Business/BusinessMyProfile/testing/BusinessProfile-1";

const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [publicMenu, setPublicMenu] = useState([]);
  const [blogMenu, setBlogMenu] = useState([]);
  const [businessMenu, setBusinessMenu] = useState([]);
  const [coupleMenu, setCoupleMenu] = useState([]);
  const [loginStatus, setLoginStatus] = useState(true);

  useEffect(() => {
    RoutesJS.fetchContentRoutes(setPublicMenu, setBlogMenu);
    RoutesJS.fetchBusinessRoutes(setBusinessMenu, setShowLoader);
    RoutesJS.fetchCoupleRoutes(setCoupleMenu, setShowLoader);
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
              setLoginStatus={setLoginStatus}
              loginStatus={loginStatus}
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
              setLoginStatus={setLoginStatus}
              loginStatus={loginStatus}
            />
          }
        />
        <Route
          path="/*"
          element={
            <ContentRoutes
              showLoader={showLoader}
              setShowLoader={setShowLoader}
              publicMenu={publicMenu}
              blogMenu={blogMenu}
              setLoginStatus={setLoginStatus}
              loginStatus={loginStatus}
            />
          }
        />

        {/* test */}
        <Route path="/fonts" element={<BlogFonts />} />
        {/* Partnership */}
        {/* <Route path="/partnership-benefits0" element={<Partnership />} /> */}
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/public-profile" element={<PublicProfile />} />
        {/* Payment */}
        {/* <Route path="/payments0" element={<Payment />} /> */}
        {/* Cancel subscription */}
        {/* <Route path="/edit-subscrption" element={<EditSubscription />} />
        <Route path="/edit-payment" element={<EditPayment />} />
        <Route path="/partnerhsip-payment" element={<ExistingUserPayment />} /> */}
        {/* trest */}
        <Route path="/testing" element={<BusinessProfile1 />} />
      </Routes>
    </>
  );
};

export default App;
