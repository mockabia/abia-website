import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import loadable from "@loadable/component";
import LayoutCouple from "../layouts/Layout/LayoutCouple";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";

import * as RoutesJS from "./RoutesJS";

const CoupleRoutes = (props) => {
  const location                        = useLocation();

  const LoadablePage = loadable((props) =>
    import(`../pages/Couple/${props.page}`)
  );
  
  return (
    <>
      {RoutesJS.hasCoupleJWT() ? (
        <>
          {/* <LayoutCouple {...props}>
            <Routes>
              {props.loginedMenu.map((loginedRoutes, i) => (
                <Route
                  path={`/${loginedRoutes.url}`}
                  element={<LoadablePage page={loginedRoutes.pagename} {...props} />}
                />
              ))}
            </Routes>
          </LayoutCouple> */}
          <Routes>
            <Route
              path="/*"
              element={
                <LayoutCouple {...props}>
                  <Routes>
                    {props.leftmenu.map((coupleRoutes, i) => (
                      <Route
                        path={`/${coupleRoutes.url}`}
                        element={<LoadablePage page={coupleRoutes.pagename} {...props} />}
                      />
                    ))}
                  </Routes>
                </LayoutCouple>
              }
            />
          </Routes>
        </>
      ) : (
        <>
          {/* <LayoutGeneral {...props}> */}
          {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(loginMenu, null, 2)}</pre> */}
            <Routes>
              {props.loginMenu.map((loginRoutes, i) => (
                <Route
                  path={`/${loginRoutes.url}`}
                  element={<LoadablePage page={loginRoutes.pagename} {...props} />}
                />
              ))}
            </Routes>
          {/* </LayoutGeneral> */}
        </>
      )}
    </>
  );
};
export default CoupleRoutes;
