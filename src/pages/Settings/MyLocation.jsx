import React, { useEffect } from "react";
import Dropdown from "../../third-party-packs/dropDown";
import SingleSelect from "../../third-party-packs/singleSelect";
import { states } from "../../data/CategoryItems";

const MyLocation = () => {
  let state = [];
  let location = [];
  let primarylocation = "";

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const handleStateChange = (selectedOptions) => {
    // console.log("Selected Options:", selectedOptions);
    state = selectedOptions;
    console.log("State select:", state);
  };
  const handleLocationChange = (selectedOptions) => {
    // console.log("Selected Options:", selectedOptions);
    location = selectedOptions;
    console.log("Location select:", location);
  };
  const handlePrimaryLocation = (selectedOptions) => {
    // console.log("Selected Options:", selectedOptions);
    primarylocation = selectedOptions;
    console.log("Primary Location:", primarylocation);
  };

  // submit api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      state,
      location,
      primarylocation,
    };
    const vendorId = "<Vendor_id>";
    const apiEndpoint = `https://abia.abia-test.com/web/WebBusinessVendor/${vendorId}`;
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

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
            <label className="font-semibold">State*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-select">
              <Dropdown options={states} onFormSubmit={handleStateChange} />
            </div>
            <br />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Locations*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Dropdown options={states} onFormSubmit={handleLocationChange} />
            </div>
            <br />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Primary Locations*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-primarylocaion-multiselect">
              <SingleSelect
                options={states}
                onFormSubmit={handlePrimaryLocation}
              />
            </div>
            <br />
          </div>
          <div className="relative space-y-3" onClick={handleSubmit}>
            <button className="submit-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyLocation;
