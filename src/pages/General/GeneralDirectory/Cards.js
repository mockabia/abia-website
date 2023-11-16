import React, { useEffect } from "react";
import Card from "./Card";
import "../../Style/GeneralDirectory.css";

import { list } from "../../../assets/hotels/card-listdata";
import { useState } from "react";
import * as servicesPage from "../../../services/vendor/signupPageService";

const CardGrid = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [servicesOptions, setServicesOptions] = useState([]);
  //api
  const fetchState = async () => {
    await servicesPage.stateDropdown().then(function (response) {
      if (response.statuscode == 200) {
        setLocationOptions(response.result);
      }
    });
  };
  const fetchCategory = async () => {
    await servicesPage.categoryDropdwon().then(function (response) {
      if (response.statuscode == 200) {
        setServicesOptions(response.result);
      }
    });
  };
  useEffect(() => {
    fetchState();
    fetchCategory();
  }, []);

  return (
    <div>
      <div className="cards-grid-container">
        {list.map((card, i) => (
          <Card
            card={card}
            key={i}
            locationOptions={locationOptions}
            servicesOptions={servicesOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
