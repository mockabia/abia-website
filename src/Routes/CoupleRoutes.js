import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import loadable from "@loadable/component";
import LayoutCouple from "../layouts/Layout/LayoutCouple";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";
import * as RoutesJS from "./RoutesJS";

const CoupleRoutes = (props) => {
  const location = useLocation();
  const [loginMenu, setLoginMenu] = useState([]);
  const [loginedMenu, setLoginedMenu] = useState([]);

  const LoadablePage = loadable((props) =>
    import(`../pages/Business/${props.page}`)
  );

  useEffect(() => {
    if (props.menu.length > 0) {
      props.menu.map(function (MainMenu, i) {
        if (MainMenu.Sub_content.length <= 0) {
          let newArray1 = [];
          newArray1["url"] = MainMenu.url;
          newArray1["pagename"] = MainMenu.pagename;
          if (MainMenu.id == "1") {
            setLoginMenu((oldArray) => [...oldArray, newArray1]);
          } else {
            setLoginedMenu((oldArray) => [...oldArray, newArray1]);
          }
        } else {
          MainMenu.Sub_content.map(function (SubMenu, i) {
            let newArray1 = [];
            newArray1["url"] = SubMenu.url;
            newArray1["pagename"] = SubMenu.pagename;
            if (MainMenu.id == "1") {
              setLoginMenu((oldArray) => [...oldArray, newArray1]);
            } else {
              setLoginedMenu((oldArray) => [...oldArray, newArray1]);
            }
          });
        }
      });
    }
  }, [props.menu]);

  return (
    <>
      {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(routeMenu, null, 2)}</pre>  */}
      {!RoutesJS.hasCoupleJWT() ? (
        <>
          <LayoutGeneral {...props}>
            <Routes>
              {loginMenu.map((routeMenus, i) => (
                <Route
                  path={`/${routeMenus.url}`}
                  element={
                    <LoadablePage page={routeMenus.pagename} {...props} />
                  }
                />
              ))}
            </Routes>
          </LayoutGeneral>
        </>
      ) : (
        <>
          <LayoutCouple {...props}>
            <Routes>
              {loginedMenu.map((routeMenus, i) => (
                <Route
                  path={`/${routeMenus.url}`}
                  element={
                    <LoadablePage page={routeMenus.pagename} {...props} />
                  }
                />
              ))}
            </Routes>
          </LayoutCouple>
        </>
      )}
    </>
  );
};
export default CoupleRoutes;
