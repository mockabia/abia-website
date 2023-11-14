import React, { useEffect, useState } from "react";
import Dropdown from "../../../third-party-packs/dropDown";
import SingleSelect from "../../../third-party-packs/singleSelect";
import { MenuItem, Select, styled } from "@mui/material";
import * as BusinessJS from "../Business"; 

const MenuItemStyle = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  fontFamily: "Raleway",
  fontWeight: "600",
  backgroundColor: "transparent",
}));

const MyLocation = () => {
  let target_region = [];
  const [primaryLocation, setPrimaryLocation] = useState([]);
  const [primarySelect, setPrimarySelect] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const handleStateChange = (selectedOptions) => {
    target_region = selectedOptions;
    console.log("State select:", target_region);
  };
  const handleLocationChange = (selectedOptions) => {
    target_region = selectedOptions;
    console.log("Location select:", target_region);
  };
  const handlePrimaryLocation = (selectedOptions) => {
    primaryLocation = selectedOptions.value;
    console.log("Primary Location:", primaryLocation);
  };

  //api
//   const fetchRegion = async () => {
//     try {
//       const response = await axios.get(apiurls.REGION_DROPDOWN);
//       if (response.status === 200) {
//         const locationTitles = response.data.result;
//         setPrimaryLocation(locationTitles);
//         console.log("List Response", response);
//         console.log("List Regions", primaryLocation);
//       } else {
//         console.error("API Error:", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error("API Request Error:", error);
//     }
//   };
//   useEffect(() => {
//     fetchRegion();
//   }, []);

  useEffect(() => {
      BusinessJS.fetchRegion(setPrimaryLocation );
  }, [])

  // submit api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      target_region,
      primaryLocation,
    };

 
  };

  const options = primaryLocation.map((region) => ({
    value: region.rid,
    label: region.title,
  }));

  return (
    <div className="mylocation-container">
      <div>
        <p className="text-[14px]">
          Select the area(s) [business name] services
        </p>
      </div>
      <div className="mt-[20px]">
        <form className="">
          <div className="space-y-2">
            {/* Locations */}
            <label className="font-semibold">Locations*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Dropdown options={options} onFormSubmit={handleLocationChange} />
            </div>
            <br />
          </div>
          {/* Primary Location */}
          <div className="space-y-2">
            <label className="font-semibold">Primary Location*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-primarylocaion-multiselect">
              <SingleSelect
                options={options}
                onFormSubmit={handlePrimaryLocation}
              />
            </div>
            <br />
          </div>
          <div className="basicinfo-submit-button relative space-y-3" onClick={handleSubmit}>
            <button >Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyLocation;
