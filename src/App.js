import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<ContentRoutes />} />
        <Route path="/business/*" element={<BusinessRoutes />} />
      </Routes>
    </>
  );
};

export default App;
