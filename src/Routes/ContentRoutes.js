import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as servicesPage from "../services/contentServices";
import loadable from "@loadable/component";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";

import Public from "../pages/General/Public";

const ContentRoutes = (props) => {

  const location                          = useLocation();

  const LoadablePage = loadable((props) => import(`../pages/General/${props.page}`));

  return (
    <LayoutGeneral {...props}>
      {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(props.routesFromApi, null, 2)}</pre> */}
      {(props.showLoader !== undefined && props.showLoader != true) ?
        <>
          <Routes>
            <Route path="/" element={<Public {...props} />} />
            {props.routesFromApi.map((routes, i) => (
              <Route
                path={`/${routes.url}`}
                element={<LoadablePage page={routes.pagename} {...props} />}
              />
            ))}
            <Route
                path='wedding-blog/wedding-dress-tips'
                element={<LoadablePage page='Blog' {...props} />}
              />
            <Route
                path='wedding-blog/sposabella-bridal'
                element={<LoadablePage page='BlogDetail' {...props} />}
              />
          </Routes>
        </> : ''
      }
    </LayoutGeneral>
  );
};
export default ContentRoutes;
