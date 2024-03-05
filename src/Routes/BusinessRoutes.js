import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import LayoutVendor from "../layouts/Layout/LayoutVendor";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";
import PageNotFound from "../pages/General/404Page";

import * as RoutesJS from "./RoutesJS";

const BusinessRoutes = (props) => {
  const location                      = useLocation();
  let navigate                        = useNavigate();
  const [loginMenu, setLoginMenu]     = useState([]);
  const [loginedMenu, setLoginedMenu] = useState([]);
  const url                           = location.pathname.split("/").pop();

  const LoadablePage = loadable((props) =>
    import(`../pages/Business/${props.page}`)
  );

  useEffect(() => {
    RoutesJS.vendorCheckLoginRedirect(url, loginMenu, loginedMenu, navigate)
  }, [url, loginMenu, loginedMenu]);

  useEffect(() => {
    if (props.menu.length > 0) {
      props.menu.map(function (MainMenu, i) {
        if (MainMenu.Sub_content.length <= 0) {
          let newArray1 = [];
          newArray1['url'] = MainMenu.url;
          newArray1['pagename'] = MainMenu.pagename;
          if (MainMenu.id == '1') {
            setLoginMenu(oldArray => [...oldArray, newArray1]);
          } else {
            setLoginedMenu(oldArray => [...oldArray, newArray1]);
          }
        } else {
          MainMenu.Sub_content.map(function (SubMenu, i) {
            let newArray1 = [];
            newArray1['url'] = SubMenu.url;
            newArray1['pagename'] = SubMenu.pagename;
            if (MainMenu.id == '1') {
              setLoginMenu(oldArray => [...oldArray, newArray1]);
            } else {
              setLoginedMenu(oldArray => [...oldArray, newArray1]);
            }
          })
        }
      })
    }
  }, [props.menu]);

  return (
    <>
        {!RoutesJS.hasVendorJWT() ? (
          <>
              <Routes>
                {loginMenu.map((routeMenus, i) => (
                  <Route
                    path={`/${routeMenus.url}`}
                    element={
                      <LayoutGeneral {...props}>
                        <LoadablePage page={routeMenus.pagename} {...props} />
                      </LayoutGeneral>
                    }
                  />
                ))}
              <Route path="*" element={<PageNotFound />} />
              </Routes>
          </>
        ) : (
          <>
            <Routes>
              {loginedMenu.map((routeMenus, i) => (
                <Route
                  path={`/${routeMenus.url}`}
                  element={
                    <LayoutVendor {...props} title={routeMenus.title} >
                      <LoadablePage page={routeMenus.pagename} {...props} pageData={routeMenus} />
                    </LayoutVendor>
                  }
                />
              ))}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </>
        )}
    </>
  );
};
export default BusinessRoutes;
