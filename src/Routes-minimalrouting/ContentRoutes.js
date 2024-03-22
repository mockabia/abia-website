import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import loadable from "@loadable/component";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";

import Public from "../pages/General/Public";
import PageNotFound from "../pages/General/404Page";
import * as RoutesJS from "./RoutesJS";

const ContentRoutes = (props) => {

  const location                          = useLocation();

  const LoadablePage = loadable((props) => import(`../pages/General/${props.page}`));
  /* const LoadablePage = loadable((props) => {
    alert(props.page)
    return import(`../pages/General/${props.page}`);
  }); */
  const [publicMenu, setPublicMenu] = useState([]);
  const [blogMenu, setBlogMenu] = useState([]);

  useEffect(() => {
    RoutesJS.fetchContentRoutes(setPublicMenu, setBlogMenu);
  }, []);

  
  return (
    
      <>
      {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(props.publicMenu, null, 2)}</pre> */}
      {(props.showLoader !== undefined && props.showLoader != true) ?
        
            <Routes>
                <Route path="/" element={<LayoutGeneral {...props}><Public {...props} /></LayoutGeneral>} />
                {publicMenu.map((routes, i) => (
                  <Route
                    path={`/${routes.url}`}
                    element={<LayoutGeneral {...props}><LoadablePage page={routes.pagename} {...props} /></LayoutGeneral>}
                  />
                ))}
                {blogMenu.map((routes, i) => (
                  <Route
                    path={`/${routes.url}`}
                    element={<LayoutGeneral {...props}><LoadablePage page={routes.pagename} {...props} /></LayoutGeneral>}
                  />
                ))}
                <Route path={`${window.PUBLIC_PAYMENT}/:id`}
                    element={<LayoutGeneral {...props}><LoadablePage page={window.PUBLIC_PAYMENT_PAGE} {...props} /></LayoutGeneral>}
                 />
                <Route path={`${window.OFFER_SUBSCRIPTION}/:id`}
                    element={<LayoutGeneral {...props}><LoadablePage page={window.OFFER_SUBSCRIPTION_PAGE} {...props} /></LayoutGeneral>}
                 />
                <Route path={`${window.OFFER_PAYMENT}/:id`}
                    element={<LayoutGeneral {...props}><LoadablePage page={window.OFFER_PAYMENT_PAGE} {...props} /></LayoutGeneral>}
                 />
                <Route path={`${window.ADD_NEWCARD}/:id`}
                    element={<LayoutGeneral {...props}><LoadablePage page={window.PUBLIC_PAYMENT_PAGE} {...props} /></LayoutGeneral>}
                 />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        
         : ''
      }
      </>
  );
};
export default ContentRoutes;
