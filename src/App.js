import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
import Loader from "./plugins/Loader/Loader";
import CoupleRoutes from "./Routes/CoupleRoutes";

import * as RoutesJS from "./Routes/RoutesJS";

const App = () => {
  const [showLoader, setShowLoader]         = useState(false);

  const [publicMenu, setPublicMenu]         = useState([]);
  const [blogMenu, setBlogMenu]             = useState([]);
  const [businessMenu, setBusinessMenu]     = useState([]);
  const [coupleMenu, setCoupleMenu]         = useState([]);

useEffect(() => {
    RoutesJS.fetchContentRoutes(setPublicMenu,setBlogMenu);
    RoutesJS.fetchBusinessRoutes(setBusinessMenu,setShowLoader);
    RoutesJS.fetchCoupleRoutes(setCoupleMenu,setShowLoader);
  }, []);

  return (
    <>
    <Loader active={showLoader}/>
      <Routes>
        <Route path="/business/*" element={<BusinessRoutes  showLoader={showLoader} setShowLoader={setShowLoader} 
            menu={businessMenu} />} />
        <Route path="/wedding/*" element={<CoupleRoutes  showLoader={showLoader} setShowLoader={setShowLoader} 
            menu={coupleMenu}  />} />
        <Route path="/*" element={<ContentRoutes  showLoader={showLoader} setShowLoader={setShowLoader} 
            publicMenu={publicMenu} blogMenu={blogMenu} />} />
      </Routes>
    </>
  );
};

export default App;
