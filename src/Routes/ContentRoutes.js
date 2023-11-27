import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import loadable from "@loadable/component";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";

import Public from "../pages/General/Public";

const ContentRoutes = (props) => {

  const location                          = useLocation();

  const LoadablePage = loadable((props) => import(`../pages/General/${props.page}`));
  /* const LoadablePage = loadable((props) => {
    alert(props.page)
    return import(`../pages/General/${props.page}`);
  }); */

  return (
    <LayoutGeneral {...props}>
      {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(props.publicMenu, null, 2)}</pre> */}
      {(props.showLoader !== undefined && props.showLoader != true) ?
        <>
          <Routes>
            <Route path="/" element={<Public {...props} />} />
            {props.publicMenu.map((routes, i) => (
              <Route
                path={`/${routes.url}`}
                element={<LoadablePage page={routes.pagename} {...props} />}
              />
            ))}
            {props.blogMenu.map((routes, i) => (
              <Route
                path={`/${routes.url}`}
                element={<LoadablePage page={routes.pagename} {...props} />}
              />
            ))}
          </Routes>
        </> : ''
      }
    </LayoutGeneral>
  );
};
export default ContentRoutes;
