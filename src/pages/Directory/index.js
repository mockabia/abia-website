import React, { useEffect } from "react";
import NavBar from "../Login/NavBar";
import BreadCrumbs from "./BreadCrumbs";
import "./style.css";
import Main from "./Main";
import Cards from "./Cards";
import CardGrid from "./Cards";
import { useState } from "react";
import BottomFilter from "../../components/layouts/BottomFilter";
import * as servicesPage from "../../services/vendor/signupPageService";
import Footer from "../General/Footer/Footer";

const Directory = () => {
  const [mainCity, setMainCity] = useState(null);
  const [suburb, setSubUrb] = useState(null);



  console.log("Index city:", mainCity);
  const handleIndeCity = (newValue) => {
    setMainCity(newValue);
    // onChangeCityDir(newValue);
  };
  const handleIndexSubUrb = (newValue) => {
    setSubUrb(newValue);
    // onChangeSubUrbDir(newValue);
  };

  return (
    <div>
      <NavBar />
      <div className="directory-page-container">
        <BreadCrumbs mainCity={mainCity} suburb={suburb} />
        <Main
          onChangeCity={handleIndeCity}
          onChangeSubUrb={handleIndexSubUrb}
        />
        <CardGrid />
        <BottomFilter />
      </div>

      <Footer />
    </div>
  );
};

export default Directory;
