import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import loadable from "@loadable/component";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";

import Public from "../pages/General/Public";
import PageNotFound from "../pages/General/404Page";

const ContentRoutes = (props) => {

  const location                          = useLocation();

  const LoadablePage = loadable((props) => import(`../pages/General/${props.page}`));
  /* const LoadablePage = loadable((props) => {
    alert(props.page)
    return import(`../pages/General/${props.page}`);
  }); */

  return (
    
      <>
      {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(props.publicMenu, null, 2)}</pre> */}
      {(props.showLoader !== undefined && props.showLoader != true) ?
        
            <Routes>
                <Route path="/" element={<LayoutGeneral {...props}><Public {...props} /></LayoutGeneral>} />
                {props.publicMenu.map((routes, i) => (
                  <Route
                    path={`/${routes.url}`}
                    element={<LayoutGeneral {...props}><LoadablePage page={routes.pagename} {...props} /></LayoutGeneral>}
                  />
                ))}
                {props.blogMenu.map((routes, i) => (
                  <Route
                    path={`/${routes.url}`}
                    element={<LayoutGeneral {...props}><LoadablePage page={routes.pagename} {...props} /></LayoutGeneral>}
                  />
                ))}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        
         : ''
      }
      </>
  );
};
export default ContentRoutes;
