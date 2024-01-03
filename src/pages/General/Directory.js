import React, { useEffect } from "react";

import BreadCrumbs from "./GeneralDirectory/BreadCrumbs";
import Main from "./GeneralDirectory/Main";
import Cards from "./GeneralDirectory/Cards";
import CardGrid from "./GeneralDirectory/Cards";
import { useState } from "react";
import BottomFilter from "../../components/layouts/BottomFilter";
import "../Style/GeneralDirectory.css";

const Directory = () => {
  const [mainCity, setMainCity] = useState(null);
  const [suburb, setSubUrb] = useState(null);

  // console.log("Index city:", mainCity);
  const handleIndeCity = (newValue) => {
    setMainCity(newValue);
    // onChangeCityDir(newValue);
  };
  const handleIndexSubUrb = (newValue) => {
    setSubUrb(newValue);
    // onChangeSubUrbDir(newValue);
  };

  return (
    <div className="directory-page-container">
      <BreadCrumbs mainCity={mainCity} suburb={suburb} />
      <Main
        onChangeCity={handleIndeCity}
        onChangeSubUrb={handleIndexSubUrb}
      />
      <CardGrid />
      <BottomFilter />
    </div>
  );
};

export default Directory;
