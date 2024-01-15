import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
import Loader from "./plugins/Loader/Loader";
import CoupleRoutes from "./Routes/CoupleRoutes";

import * as RoutesJS from "./Routes/RoutesJS";
import CoupleProfile from "./pages/Couple/CoupleProfile";
import CoupleContact from "./pages/Couple/CoupleContact";
import CoupleWeddingDetails from "./pages/Couple/CoupleWeddingDetails";
import CoupleAccountSetting from "./pages/Couple/CoupleAccountSetting";
import CoupleCatBudget from "./pages/Couple/CoupleCatBudget";
import CoupleEnquiry from "./pages/Couple/CoupleEnquiry";
import Partnership from "./pages/General/Partnership";

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
        <Route path="/wedding/dashboard" element={<CoupleProfile />} />
        <Route path="/wedding/contact-details" element={<CoupleContact />} />
        <Route path="/wedding/details" element={<CoupleWeddingDetails />} />
        <Route path="/wedding/settings" element={<CoupleAccountSetting />} />
        <Route path="/wedding/wedding-budget" element={<CoupleCatBudget />} />
        <Route path="/wedding/enquiry" element={<CoupleEnquiry />} />

        {/* Partnership */}
        <Route path="/partnership-benefits" element={<Partnership />} />
      </Routes>
    </>
  );
};

export default App;
