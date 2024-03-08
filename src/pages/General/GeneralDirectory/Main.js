import React from "react";
import FilterSearch from "./FilterSearch";
import "../../Style/GeneralDirectory.css";

import SortFilter from "./SortFilter";
import { useState } from "react";

const Main = ({ onChangeCity, onChangeSubUrb }) => {
  const [mainCity, setMainCity] = useState(null);
  const [suburb, setSubUrb] = useState(null);

  console.log("location in Main:", mainCity);
  const handleLocationChange = (newValue) => {
    setMainCity(newValue);
    onChangeCity(newValue);
  };
  const handleSubUrban = (newValue) => {
    setSubUrb(newValue);
    onChangeSubUrb(newValue);
  };

  return (
    <div className="main-section">
      <div className="directory-main-grid">
        <h1 className="main-content-header">
          <span>{mainCity} </span> {""}Wedding Venues
        </h1>
      </div>
      <p className="directory-main-grid main-content-desc">
        Find the most popular <span>{mainCity}</span> Wedding Venues in
        Australia. You'll find a variety of ABIA-Awarded venues ranging from
        beach-front, hinterland, private estates, vineyards, luxury venues and
        more.
        <br />
        <br />
        Be sure to research you favourites and read their customer-reviews, if
        you like what you read, you can send them a direct email to organise
        your site-visit.{" "}
      </p>
      <div className="directory-main-grid filter-section">
        <FilterSearch
          onCityCahnge={handleLocationChange}
          oncSubUrbanChange={handleSubUrban}
        />
      </div>
      <div className="directory-main-grid sort-section">
        <SortFilter />
      </div>
    </div>
  );
};

export default Main;
