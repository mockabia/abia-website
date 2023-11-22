import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as servicesPage from "../services/contentServices";
import loadable from "@loadable/component";
import LayoutVendor from "../layouts/Layout/LayoutVendor";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";

import BusinessLogin from "../pages/Business/BusinessLogin";
import BusinessSignup from "../pages/Business/BusinessSignup";
import BusinessLoginState from "../pages/Business/BusinessLoginState";
import CSideBar from "../components/Couple-Layout/CSideBar";

const BusinessRoutes = (props) => {
  const [loginMenu, setLoginMenu]       = useState([]);
  const [loginedMenu, setLoginedMenu]   = useState([]);
  const [businessMenu, setBusinessMenu] = useState([]);
  const location                        = useLocation();

  const LoadablePage = loadable((props) =>
    import(`../pages/Business/${props.page}`)
  );

  useEffect(() => {
    fetchVendorLoginRoutes();
  }, [hasJWT()]);
  const fetchVendorLoginRoutes = async () => {
    await servicesPage.fetchVendorLoginRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setLoginMenu(response.result);
      }
      if (hasJWT()) {
        fetchVendorLoginedRoutes();
      }
    });
  };
  const fetchVendorLoginedRoutes = async () => {
    await servicesPage.fetchVendorLoginedRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setLoginedMenu(response.result);
      }
      fetchVendorDashboardRoutes();
    });
  };
  const fetchVendorDashboardRoutes = async () => {
    await servicesPage.fetchVendorDashboardRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setBusinessMenu(response.result);
        props.setShowLoader(false);
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
    <>
      {hasJWT() ? (
        <>
          <LayoutVendor leftmenu={businessMenu} topmenu={loginedMenu}>
            <Routes>
              {loginedMenu.map((loginedRoutes, i) => (
                <Route
                  path={`/${loginedRoutes.url}`}
                  element={<LoadablePage page={loginedRoutes.pagename} {...props} />}
                />
              ))}
            </Routes>
          </LayoutVendor>
          <Routes>
            <Route
              path="/*"
              element={
                <LayoutVendor leftmenu={businessMenu} topmenu={loginedMenu}>
                  <Routes>
                    {businessMenu.map((businessRoutes, i) => (
                      <Route
                        path={`/${businessRoutes.url}`}
                        element={<LoadablePage page={businessRoutes.pagename} {...props} />}
                      />
                    ))}
                  </Routes>
                </LayoutVendor>
              }
            />
          </Routes>
        </>
      ) : (
        <>

          <LayoutGeneral {...props}>
            <Routes>
              {loginMenu.map((loginRoutes, i) => (
                <Route
                  path={`/${loginRoutes.url}`}
                  element={<LoadablePage page={loginRoutes.pagename} {...props} />}
                />
              ))}
            </Routes>
          </LayoutGeneral>
        </>
      )}
    </>
  );
};
export default BusinessRoutes;
