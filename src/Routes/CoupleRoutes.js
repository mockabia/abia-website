import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation,useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import LayoutCouple from "../layouts/Layout/LayoutCouple";

import * as RoutesJS from "./RoutesJS";

const CoupleRoutes = (props) => {
  const location                      = useLocation();
  let navigate                        = useNavigate();
  const [loginMenu, setLoginMenu]     = useState([]);
  const [loginedMenu, setLoginedMenu] = useState([]);
  const url                           = location.pathname.split("/").pop();

  const LoadablePage = loadable((props) => 
    import(`../pages/Couple/${props.page}`)
  );
  useEffect(() => {
    const isFoundInLoginmenu = loginMenu.some(element => {
      if (element.url === url) {
        return true;
      }
      return false;
    });
    const isFoundInLoginedmenu = loginedMenu.some(element => {
      if (element.url === url) {
        return true;
      }
      return false;
    });
    if (isFoundInLoginmenu && RoutesJS.hasCoupleJWT()) {
      navigate(window.CDASHBOARD);
    }
    if (isFoundInLoginedmenu && !RoutesJS.hasCoupleJWT()) {
      navigate(window.CLOGIN);
    }
  }, [url,loginMenu,loginedMenu]);

  useEffect(() => {
    if (props.menu.length > 0) {
      props.menu.map(function (MainMenu, i) {
        if (MainMenu.Sub_content.length <= 0) {
          let newArray1 = [];
          newArray1['url']      = MainMenu.url;
          newArray1['pagename'] = MainMenu.pagename;
          newArray1['title']    = MainMenu.title;
          if (MainMenu.id == '1') {
            setLoginMenu(oldArray => [...oldArray, newArray1]);
          } else {
            setLoginedMenu(oldArray => [...oldArray, newArray1]);
          }
        } else {
          MainMenu.Sub_content.map(function (SubMenu, i) {
            let newArray1 = [];
            newArray1['url']      = SubMenu.url;
            newArray1['pagename'] = SubMenu.pagename;
            newArray1['title']    = SubMenu.title;
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
      {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(routeMenu, null, 2)}</pre>  */}
      {!RoutesJS.hasCoupleJWT() ? (
      <>
          <Routes>
            {loginMenu.map((routeMenus, i) => (
              <Route
                path={`/${routeMenus.url}`}
                element={<LoadablePage page={routeMenus.pagename} {...props} pageData={routeMenus} />}
              />
            ))}
          </Routes>
      </>
      ) : (
      <>
          <Routes>
            {loginedMenu.map((routeMenus, i) => (
              <Route
                path={`/${routeMenus.url}`}
                element={
                  <LayoutCouple {...props} title={routeMenus.title}>
                    <LoadablePage page={routeMenus.pagename} {...props} pageData={routeMenus}/>
                  </LayoutCouple>
                  }
              />

            ))}
          </Routes>
      </>
      )}
    </>
  );
};
export default CoupleRoutes;
