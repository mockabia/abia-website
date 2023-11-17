import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
import Loader from "./plugins/Loader/Loader";


const App = () => {
  const [showLoader, setShowLoader]           = useState(true);
  return (
    <>
    <Loader active={showLoader}/>
      <Routes>
        <Route path="/*" element={<ContentRoutes  showLoader={showLoader} setShowLoader={setShowLoader} />} />
        <Route path="/business/*" element={<BusinessRoutes  showLoader={showLoader} setShowLoader={setShowLoader} />} />
      </Routes>
    </>
  );
};

export default App;
