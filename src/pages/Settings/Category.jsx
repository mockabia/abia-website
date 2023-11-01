import React, { useEffect, useState } from "react";
import FormLayout from "../../components/FormLayout";
import SingleSelect from "../../third-party-packs/singleSelect";
import Dropdown from "../../third-party-packs/dropDown";

import { primaryCategory } from "../../data/CategoryItems";
import { CATEGORY_DROPDOWN_API, BUSINESS_SETTINGS4 } from "../../api/apiUrls";
import Select, { components } from "react-select";
import axios from "axios";

const Category = ({ vendorDetails }) => {
  const [primaryCatSelect, setPrimaryCatSelect] = useState(
    vendorDetails.first_category
  );
  const [addcategory, setAddCategory] = useState(vendorDetails.other_category);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [formValues, setFormValues] = useState({
    first_category: primaryCatSelect,
    other_category: [addcategory],
  });

  useEffect(() => {
    setPrimaryCatSelect(vendorDetails.first_category); // Update primaryCatSelect when vendorDetails changes
  }, [vendorDetails.first_category]);
  useEffect(() => {
    setAddCategory(vendorDetails.other_category); // Update setAddCategory when vendorDetails changes
  }, [vendorDetails.other_category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(CATEGORY_DROPDOWN_API);
      if (response.status === 200) {
        setCategoryOptions(response.data.result);
      }
    } catch (error) {
      console.error("Error while fetching states:", error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  // for Multi select
  // const handleDropdownChange = (selectedOptions) => {
  //   other_category = selectedOptions;
  //   console.log("Multi select:", other_category);
  // };

  // const handleSingleSelectChange = (selectedOptions) => {
  //   first_category = selectedOptions;
  //   console.log("SingleSelect:", first_category);
  // };

  console.log("Category resposne:", categoryOptions);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      first_category: primaryCatSelect,
      other_category: addcategory,
    };

    try {
      const response = await fetch(BUSINESS_SETTINGS4, {
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

  console.log("Primary select in api :", vendorDetails.first_category);
  console.log("Primary2 select in api :", primaryCatSelect);
  console.log("Add category select in api :", addcategory);

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
              {/* <SingleSelect options={primaryCategory} /> */}
              <Select
                name="first_category"
                placeholder={primaryCatSelect}
                options={categoryOptions.map((category) => ({
                  value: category.value,
                  label: category.label,
                }))}
                value={categoryOptions.find(
                  (option) => option.value === primaryCatSelect
                )}
                onChange={(selectedOption) => {
                  const categoryValue = selectedOption
                    ? selectedOption.value
                    : "";
                  setPrimaryCatSelect(categoryValue);
                }}
              />
            </div>
            <br />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Additional Categories</label>
            <br />
            <div className="relative lg:w-[52%] category-multi-select">
              <Select
                name="other_category"
                isMulti={true}
                placeholder={addcategory}
                options={categoryOptions.map((category) => ({
                  value: category.value,
                  label: category.label,
                }))}
                value={categoryOptions.find(
                  (option) => option.value === setAddCategory
                )}
                onChange={(selectedOption) => {
                  const categoryValue = selectedOption
                    ? selectedOption.value
                    : "";
                  setAddCategory(categoryValue);
                }}
              />
              {/* <Dropdown
                options={primaryCategory}
                defaultValue={vendorDetails.other_category}
              /> */}
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
