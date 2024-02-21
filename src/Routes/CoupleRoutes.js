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
  const [topMenu, setTopMenu]         = useState([]);
  const [leftMenu, setLeftMenu]       = useState([]);
  const url                           = location.pathname.split("/").pop();
  const [mainMenuID, setMainMenuID]   = useState(null);

  const LoadablePage = loadable((props) => 
    import(`../pages/Couple/${props.page}`)
  );

  useEffect(() => {
    RoutesJS.coupleCheckLoginRedirect(url,loginMenu,loginedMenu,navigate)
  }, [url,loginMenu,loginedMenu]);

  useEffect(() => {
    if (props.menu.length > 0) {
      let topMenuIds  = [7,8,9];
      let leftMenuIds = [7,8,9];
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
                  <LayoutCouple {...props} mainMenuID={mainMenuID} title={routeMenus.title} topMenu={topMenu} leftMenu={leftMenu} leftMenuShow={routeMenus.leftMenuShow}>
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
