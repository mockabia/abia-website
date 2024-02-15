import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
import Loader from "./plugins/Loader/Loader";
import CoupleRoutes from "./Routes/CoupleRoutes";

import * as RoutesJS from "./Routes/RoutesJS";
/* import CoupleProfile from "./pages/Couple/CoupleProfile";
import CoupleContact from "./pages/Couple/CoupleContact";
import CoupleWeddingDetails from "./pages/Couple/CoupleWeddingDetails";
import CoupleAccountSetting from "./pages/Couple/CoupleAccountSetting";
import CoupleCatBudget from "./pages/Couple/CoupleCatBudget";
import CoupleEnquiry from "./pages/Couple/CoupleEnquiry"; */
import Partnership from "./pages/General/Partnership";
import Reviews from "./pages/General/Reviews";
import BlogFonts from "./pages/General/Blog-font/fonts";
import PublicProfile from "./pages/General/PublicProfile/PublicProfile";
import BusinessShop from "./pages/Business/BusinessShop";
import Payment from "./pages/General/Payments/Payment";
import EditSubscription from "./pages/General/EditSubscription";
import EditPayment from "./pages/General/Payments/EditPayment";
import ExistingUserPayment from "./pages/General/Payments/ExistingUserPayment";

const App = () => {
  const [showLoader, setShowLoader] = useState(false);

  const [publicMenu, setPublicMenu] = useState([]);
  const [blogMenu, setBlogMenu] = useState([]);
  const [businessMenu, setBusinessMenu] = useState([]);
  const [coupleMenu, setCoupleMenu] = useState([]);

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
              publicMenu={publicMenu}
              blogMenu={blogMenu}
            />
          }
        />
        {/* <Route path="/wedding/dashboard" element={<CoupleProfile />} />
        <Route path="/wedding/contact-details" element={<CoupleContact />} />
        <Route path="/wedding/details" element={<CoupleWeddingDetails />} />
        <Route path="/wedding/settings" element={<CoupleAccountSetting />} />
        <Route path="/wedding/wedding-budget" element={<CoupleCatBudget />} />
        <Route path="/wedding/enquiry" element={<CoupleEnquiry />} /> */}
        {/* test */}
        <Route path="/fonts" element={<BlogFonts />} />
        {/* Partnership */}
        <Route path="/partnership-benefits" element={<Partnership />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/public-profile" element={<PublicProfile />} />
        {/* Payment */}
        <Route path="/payments" element={<Payment />} />
        {/* Cancel subscription */}
        <Route path="/edit-subscrption" element={<EditSubscription />} />
        <Route path="/edit-payment" element={<EditPayment />} />
        <Route path="/partnerhsip-payment" element={<ExistingUserPayment />} />

        
      </Routes>
    </>
  );
};

export default App;
