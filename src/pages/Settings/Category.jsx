import React, { useEffect, useState } from "react";
import FormLayout from "../../components/FormLayout";
import SingleSelect from "../../third-party-packs/singleSelect";
import Dropdown from "../../third-party-packs/dropDown";

import { primaryCategory } from "../../data/CategoryItems";

const Category = () => {
  let primarySelect = "";
  let multiCategory = [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // for Multi select
  const handleDropdownChange = (selectedOptions) => {
    // console.log("Selected Options:", selectedOptions);
    multiCategory = selectedOptions;
    console.log("Multi select:", multiCategory);
  };

  const handleSingleSelectChange = (selectedOptions) => {
    primarySelect = selectedOptions;
    console.log("SingleSelect:", selectedOptions);
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      primarySelect,
      multiCategory,
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
    <div className="category-container">
      <div>
        <p className="text-[14px] whitespace-break-spaces">
          Only select categories that your business services.
        </p>
      </div>
      <div className="mt-[20px]">
        <form className="">
          <div className="space-y-2">
            <label className="font-semibold">Primary Category</label>
            <br />
            <div className="relative lg:w-[52%] category-single-select">
              <SingleSelect
                options={primaryCategory}
                onFormSubmit={handleSingleSelectChange}
              />
            </div>
            <br />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Additional Categories</label>
            <br />
            <div className="relative lg:w-[52%] category-multi-select">
              <Dropdown
                options={primaryCategory}
                onFormSubmit={handleDropdownChange}
              />
            </div>
            <br />
          </div>
          <div className="relative" onClick={handleSubmit}>
            <button className="submit-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Category;
