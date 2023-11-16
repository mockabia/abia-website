import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as servicesPage from "../services/contentServices";
import loadable from "@loadable/component";
import LayoutGeneral from "../layouts/Layout/LayoutGeneral";

import Public from "../pages/General/Public";

const ContentRoutes = (props) => {
  const [routesFromApi, setRoutesFromApi] = useState([]);
  const location = useLocation();

  const LoadablePage = loadable((props) => import(`../pages/General/${props.page}`));

  useEffect(() => {
    fetchContentRoutes();
    /* fetchPreContentRoutes();
        fetchSupplierContentRoutes();
        fetchBrideContentRoutes();
        fetchBlogCatsRoutes();
        fetchBlogRoutes(); */
  }, []);
  const fetchContentRoutes = async () => {
    await servicesPage.fetchContentRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi(response.result);
        fetchPreContentRoutes();
      }
    });
  };
  const fetchPreContentRoutes = async () => {
    await servicesPage.fetchPreContentRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi((oldArray) => [...oldArray, response.result]);
        fetchSupplierContentRoutes();
      }
    });
  };
  const fetchSupplierContentRoutes = async () => {
    await servicesPage.fetchSupplierContentRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi((oldArray) => [...oldArray, response.result]);
        fetchBrideContentRoutes();
      }
    });
  };
  const fetchBrideContentRoutes = async () => {
    await servicesPage.fetchBrideContentRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi((oldArray) => [...oldArray, response.result]);
        fetchBlogCatsRoutes();
      }
    });
  };
  const fetchBlogCatsRoutes = async () => {
    await servicesPage.fetchBlogCatsRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi((oldArray) => [...oldArray, response.result]);
        fetchBlogRoutes();
      }
    });
  };
  const fetchBlogRoutes = async () => {
    await servicesPage.fetchBlogRoutes().then(function (response) {
      if (response.statuscode == 200) {
        setRoutesFromApi((oldArray) => [...oldArray, response.result]);
      }
    });
  };
  return (
    <LayoutGeneral {...props}>
      {(props.showLoader !== undefined && props.showLoader != true) ?
        <>
          <Routes>
            <Route path="/" element={<Public {...props} />} />
            {routesFromApi.map((routes, i) => (
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
