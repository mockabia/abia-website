import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import * as servicesPage from "../services/contentServices";
import loadable from "@loadable/component";

/* const LoadablePage = loadable((props) => import(`../pages/General/${props.page}`)); */
const LoadablePage = loadable((props) => { console.log('loadable--'+props.page); return import(`../pages/General/${props.page}`) });

const ContentRoutes = (props) => {
    const [routesFromApi, setRoutesFromApi] = useState([]);
    const location                          = useLocation();
    const url                               = location.pathname.split("/").pop();

    useEffect(() => { 
        console.log(props.location)
        console.log("dummyState's state has updated to: " + url)
    }, [url]); 

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
                //fetchPreContentRoutes();
            }
        });
    };
    const fetchPreContentRoutes = async () => {
        await servicesPage.fetchPreContentRoutes().then(function (response) {
            if (response.statuscode == 200) {
                setRoutesFromApi(oldArray => [...oldArray, response.result]);
                fetchSupplierContentRoutes();
            }
        });
    };
    const fetchSupplierContentRoutes = async () => {
        await servicesPage.fetchSupplierContentRoutes().then(function (response) {
            if (response.statuscode == 200) {
                setRoutesFromApi(oldArray => [...oldArray, response.result]);
                fetchBrideContentRoutes();
            }
        });
    };
    const fetchBrideContentRoutes = async () => {
        await servicesPage.fetchBrideContentRoutes().then(function (response) {
            if (response.statuscode == 200) {
                setRoutesFromApi(oldArray => [...oldArray, response.result]);
                fetchBlogCatsRoutes();
            }
        });
    };
    const fetchBlogCatsRoutes = async () => {
        await servicesPage.fetchBlogCatsRoutes().then(function (response) {
            if (response.statuscode == 200) {
                setRoutesFromApi(oldArray => [...oldArray, response.result]);
                fetchBlogRoutes();
            }
        });
    };
    const fetchBlogRoutes = async () => {
        await servicesPage.fetchBlogRoutes().then(function (response) {
            if (response.statuscode == 200) {
                setRoutesFromApi(oldArray => [...oldArray, response.result]);
            }
        });
    };
    return (
        <>
            <Routes>
                {routesFromApi.map((routes, i) => (
                    <Route
                        path={`/${routes.url}`}
                        element={<LoadablePage page={routes.pagename} {...props} />}
                    />
                ))}
            </Routes>
        </>
    );
};
export default ContentRoutes;
