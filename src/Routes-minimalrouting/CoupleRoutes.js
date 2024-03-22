import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation,useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";
import LayoutCouple from "../layouts/Layout/LayoutCouple";
import PageNotFound from "../pages/General/404Page";

import * as RoutesJS from "./RoutesJS";

const CoupleRoutes = (props) => {
  const location                      = useLocation();
  let navigate                        = useNavigate();
  const [loginMenu, setLoginMenu]     = useState([]);
  const [loginedMenu, setLoginedMenu] = useState([]);
  const [topMenu, setTopMenu]         = useState([]);
  const [leftMenu, setLeftMenu]       = useState([]);
  const url                           = location.pathname.split("/").pop();
  const [mainMenuID, setMainMenuID]   = useState(null);

  const [coupleMenu, setCoupleMenu] = useState([]);

  useEffect(() => {
    RoutesJS.fetchCoupleRoutes(setCoupleMenu, props.setShowLoader);
  }, []);

  const LoadablePage = loadable((props) => 
    import(`../pages/Couple/${props.page}`)
  );
  useEffect(() => {
    RoutesJS.coupleCheckLoginRedirect(url,loginMenu,loginedMenu,navigate)
  }, [url,loginMenu]);

  useEffect(() => {
    if (coupleMenu.length > 0) {
      let topMenuIds  = [7,8,9];
      let leftMenuIds = [7,8,9];
      coupleMenu.map(function (MainMenu, i) {
          console.log(MainMenu)
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
          setTopMenu([])
          setLeftMenu([])
          MainMenu.Sub_content.map(function (SubMenu, i) {
            let newArray1 = [];
            newArray1['url']      = SubMenu.url;
            newArray1['pagename'] = SubMenu.pagename;
            newArray1['title']    = SubMenu.title;
            if(url==SubMenu.url){setMainMenuID(MainMenu.id)}
            
            if (topMenuIds.find(topId => topId === SubMenu.id)){
              setTopMenu(oldArray => [...oldArray, newArray1]);
            }
            if (leftMenuIds.find(leftId => leftId === SubMenu.id)){
              newArray1['leftMenuShow'] = true;
              setLeftMenu(oldArray => [...oldArray, newArray1]);
            }
            if (MainMenu.id == '1') {
              newArray1['header']    = (SubMenu.id=='1' ? 0 : 1);
              setLoginMenu(oldArray => [...oldArray, newArray1]);
            } else {
              setLoginedMenu(oldArray => [...oldArray, newArray1]);
            }
          })
        }
      })
    }
  }, [coupleMenu]);

  return (
    <>
      {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(routeMenu, null, 2)}</pre>  */}
      {!RoutesJS.hasCoupleJWT() ? (
      <>
          <Routes>
            {loginMenu && loginMenu.map((routeMenus, i) => (
              routeMenus.header==1 ? (
                <Route
                  path={`/${routeMenus.url}`}
                  element={
                    <LayoutGeneral {...props}>
                      <LoadablePage page={routeMenus.pagename} {...props} pageData={routeMenus} />
                    </LayoutGeneral>
                  }
                />
              ) : (
                <Route
                  path={`/${routeMenus.url}`}
                  element={<LoadablePage page={routeMenus.pagename} {...props} pageData={routeMenus} />}
                />
              )
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
                  <LayoutCouple {...props} menu={coupleMenu} mainMenuID={mainMenuID} title={routeMenus.title} topMenu={topMenu} leftMenu={leftMenu} leftMenuShow={routeMenus.leftMenuShow}>
                    <LoadablePage page={routeMenus.pagename} {...props} pageData={routeMenus}/>
                  </LayoutCouple>
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
export default CoupleRoutes;
