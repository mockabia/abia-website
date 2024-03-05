import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as servicesPage from "../../../services/coupleService";
import {
  CoupleAddCategoryButton,
  EnquirySelectStyle,
} from "../../../components/FormStyle";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../../Style/CoupleEnquiry.css";
import { useCallback } from "react";

const customStyles = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: "300px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px", // Set the width of the scrollbar
      height: "30px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#6cc2bc", // Set the color of the scrollbar thumb
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f5f5f5", // Set the color of the scrollbar track
    },
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  }),
};

const AddCategory = (props) => {
  const open = props.open;
  const setOpen = props.setOpen;
  const onUpdateBusinessDetails = props.onUpdateBusinessDetails;
  const [isMounted, setIsMounted] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBusinessDetails, setSelectedBusinessDetails] = useState({
    id: null,
    name: "",
    phone: "",
    email: "",
    budget: "",
    booked: 0,
  });
  const [vendorDetail, setVendorDetail] = useState(false);
  const [businessDetails, setBusinessDetails] = useState([]); // business detail array

  const closeDetailOpen = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchMarketCategory();
  }, []);

  const fetchMarketCategory = async () => {
    await servicesPage.marketCategoryjson().then(function (response) {
      if (response.statuscode == 200) {
        setCategoryList(response.result);
      }
    });
  };
  console.log("Category list:", categoryList);

  const toggleOpen = (category) => {
    setVendorDetail(true);
    setSelectedCategory(category);
    setSelectedBusinessDetails({
      id: null,
      name: "",
      phone: "",
      email: "",
      budget: "",
    }); // Reset to null, whnen a new category is selected
  };

  const handleBusinessChange = (selectedOption) => {
    const selectedBusiness = selectedCategory.businesses.find(
      (business) => business.id === selectedOption.value
    );
    setSelectedBusinessDetails({
      id: selectedBusiness.id,
      name: selectedBusiness.name,
      phone: selectedBusiness.phone,
      email: selectedBusiness.email,
      budget: selectedBusiness.budget || "",
      booked: selectedBusiness.booked,
    });
  };

  //   memoize the handleBusinessChange
  const handleBudgetChange = useCallback((e) => {
    const value = e.target.value;
    setSelectedBusinessDetails((prevDetails) => ({
      ...prevDetails,
      budget: value,
    }));
  }, []);

  useEffect(() => {
    console.log("Latest businessDetails state:", businessDetails);
  }, [businessDetails]);

  const handleSubmit = () => {
    console.log("Inside handleSubmit");

    const updatedBusinesses = [...businessDetails];
    const businessIndex = updatedBusinesses.findIndex(
      (business) => business.id === selectedBusinessDetails.id
    );

    if (businessIndex !== -1) {
      // Update the existing business details in the array
      updatedBusinesses[businessIndex] = {
        id: selectedBusinessDetails.id,
        business_name: selectedBusinessDetails.name,
        booked_val: 1,
        category_id: selectedCategory.id,
        category_name: selectedCategory.title,
      };
    } else {
      // Add a new business to the array
      updatedBusinesses.push({
        id: selectedBusinessDetails.id,
        business_name: selectedBusinessDetails.name,
        booked_val: 1,
        category_id: selectedCategory.id,
        category_name: selectedCategory.title,
      });
    }

    console.log("Updated JSON Data:", updatedBusinesses);
    setOpen(false);
    onUpdateBusinessDetails(updatedBusinesses); // Callback to update parent component state
  };

  return (
    <>
      {open && (
        <div className="inquiry-overlay">
          <div className="flex justify-end" onClick={closeDetailOpen}>
            <AiOutlineClose size={26} className=" fixed cursor-pointer " />
          </div>
          <div className="flex flex-col gap-[1rem]">
            {/* heading */}
            <div className="text-center mt-[3rem]">
              <h1>Who do you want to add ?</h1>
            </div>
            {/* Category item */}
            <div className="flex justify-center items-center flex-wrap gap-[0.5rem]">
              {categoryList.map((category, index) => (
                <div key={category.id}>
                  <CoupleAddCategoryButton onClick={() => toggleOpen(category)}>
                    {category.title}
                  </CoupleAddCategoryButton>
                </div>
              ))}
            </div>
            <div
              className="flex justify-end items-center mt-[3rem] mr-[10%]"
              onClick={closeDetailOpen}
            >
              <button className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/*Vendor Details */}
      {vendorDetail && selectedCategory && (
        <div className="inquiry-overlay">
          <div className="flex justify-end" onClick={closeDetailOpen}>
            <AiOutlineClose size={26} className=" fixed cursor-pointer " />
          </div>
          <div className="flex flex-col gap-[1rem]">
            {/* heading */}
            <div className=" mt-[3rem]">
              <h1>Their details</h1>
            </div>
            {/* Category item */}
            <div className="flex  items-center flex-wrap gap-[0.5rem]">
              <div className="flex flex-col gap-[5px]">
                <label>
                  Business Name
                  <span style={{ color: "red", fontSize: "16px" }}>*</span>
                </label>
                <Select
                  name="business_name"
                  placeholder=""
                  type="select"
                  style={{ width: "100%", fontSize: "14px" }}
                  styles={{ ...EnquirySelectStyle, ...customStyles }}
                  options={selectedCategory.businesses.map((business) => ({
                    value: business.id,
                    label: business.name,
                  }))}
                  onChange={handleBusinessChange}
                  //   onChange={(selectedOptions) =>
                  //     handleInputChangeVal("wedding_state", selectedOptions.url)
                  //   }
                  //   value={stateOptions.filter(
                  //     (option) => option.url === formValues.wedding_state
                  //   )}
                  components={{
                    Menu,
                    MultiValue,
                    IndicatorSeparator: null,
                    DropdownIndicator: () => (
                      <div>
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className="dropDown-position"
                          style={{ color: "#6cc2bc", marginRight: "0.5rem" }}
                        />
                      </div>
                    ),
                  }}
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label>
                  Phone{" "}
                  <span style={{ color: "red", fontSize: "16px" }}>*</span>
                </label>

                <input
                  disabled
                  name="phone"
                  type="number"
                  className="coupleenq-input-style"
                  value={selectedBusinessDetails.phone}
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label>
                  Email{" "}
                  <span style={{ color: "red", fontSize: "16px" }}>*</span>
                </label>
                <input
                  name="email"
                  disabled
                  className="coupleenq-input-style"
                  value={selectedBusinessDetails.email}
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label>
                  Cost of Product{" "}
                  <span style={{ color: "red", fontSize: "16px" }}>*</span>
                </label>
                <input
                  name="budget"
                  type="number"
                  className="coupleenq-input-style"
                  value={selectedBusinessDetails.budget}
                  onChange={handleBudgetChange}
                />
              </div>
            </div>
            <div className="flex justify-end items-center mt-[3rem] mr-[10%] gap-[1rem]">
              <button onClick={handleSubmit} className="save-button">
                Save
              </button>
              <button onClick={closeDetailOpen} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCategory;

const Menu = (props) => {
  return <components.Menu {...props}>{props.children}</components.Menu>;
};

const MoreSelectedBadge = ({ items }) => {
  const style = {
    marginLeft: "auto",
    background: "#d7d7d7",
    borderRadius: "4px",
    fontFamily: "Open Sans",
    fontSize: "11px",
    padding: "3px",
    order: 99,
  };

  const title = items.join(", ");
  const length = items.length;
  const label = `+ ${length} item${length !== 1 ? "s" : ""}`;

  return (
    <div style={style} title={title}>
      {label}
    </div>
  );
};

const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 2;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};

//  <p>{selectedCategory.id}</p>
//               <p>{selectedCategory.title}</p>

//               {/* Displaying businesses */}
//               {selectedCategory.businesses &&
//                 selectedCategory.businesses.length > 0 && (
//                   <div>
//                     <h2>Businesses:</h2>
//                     <ul>
//                       {selectedCategory.businesses.map((business) => (
//                         <li key={business.id}>{business.name}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
