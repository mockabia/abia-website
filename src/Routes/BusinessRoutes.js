import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import loadable from "@loadable/component";
import LayoutVendor from "../layouts/Layout/LayoutVendor";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";

import * as RoutesJS from "./RoutesJS";

const BusinessRoutes = (props) => {
  const location                        = useLocation();

  const LoadablePage = loadable((props) =>
    import(`../pages/Business/${props.page}`)
  );
  
  return (
    <>
      {RoutesJS.hasVendorJWT() ? (
        <>
          {/* <LayoutVendor leftmenu={businessMenu} topmenu={loginedMenu}>
            <Routes>
              {props.loginedMenu.map((loginedRoutes, i) => (
                <Route
                  path={`/${loginedRoutes.url}`}
                  element={<LoadablePage page={loginedRoutes.pagename} {...props} />}
                />
              ))}
            </Routes>
          </LayoutVendor> */}
          <Routes>
            <Route
              path="/*"
              element={
                <LayoutVendor {...props} /* leftmenu={props.businessMenu} topmenu={props.loginedMenu} */>
                  <Routes>
                    {props.leftmenu.map((businessRoutes, i) => (
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
          {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(loginMenu, null, 2)}</pre> */}
            <Routes>
              {props.loginMenu.map((loginRoutes, i) => (
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
