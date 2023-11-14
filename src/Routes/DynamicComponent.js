import React, { lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainContent from "../pages/General/MainContent";

const DynamicComponent = (props) => {
    console.log(props.data.pagename)
    const componentName = props.data.pagename;
    const DynamicRoute = import(`../pages/General/${componentName}`);
    //const DynamicRoute = lazy(()=> import(`../pages/General/${componentName}.js`));

  return (
    <>
      <Routes>
        <Route
          path="/wedding-promotions"
          element={<DynamicRoute {...props} />}
        />
      </Routes>
    </>
  );
};
export default DynamicComponent;
