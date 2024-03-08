import React, { useEffect, useState } from "react";
import "../../Style/CoupleEnquiry.css";
import * as servicesPage from "../../../services/coupleService";

import { useLocation, Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CoupleAddCategoryButton } from "../../components/FormStyle";
import { LuCheckCircle2 } from "react-icons/lu";
import {
  CoupleAddCategoryButton,
  EnquirySelectStyle,
} from "../../../components/FormStyle";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faL } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import * as CoupleJS from "../Couple";

export default function CouplePage(props) {
  const location = useLocation();
  const [pageContent, setPageContent] = useState({});
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [vendorDetail, setVendorDetail] = useState(false);
  const [EditDetail, setEditDetail] = useState(false); // Edit
  const [catBusiness, setcatBusiness] = useState({});
  const [selectedBusinessDetails, setSelectedBusinessDetails] = useState({});
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [business_name, setBusinessName] = useState("");
  const [budget, setBudget] = useState("");
  const [editBusinessDetail, setEditBusinessDetail] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false); // searchable
  const [formValues, setFormValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [data, setData] = useState([]);

  const url = location.pathname.split("/").pop();

  /* useEffect(() => {
    fetchPageContent();
    setSelectedBusinessDetails({});
  }, [url]); */
  // In the useEffect block where you fetch the page content, set the initial value for selectedBusinessDetails when the component mounts.

  useEffect(() => {
    //CoupleJS.fetchMarketCategory(setCategoryList);
    CoupleJS.coupleBooking(setData, setCategoryList);
  }, []);

  const fetchPageContent = async () => {
    await servicesPage.fetchBridePage(url).then(function (response) {
      if (response.statuscode == 200) {
        setPageContent(response.result);
      }
    });
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors);
  };
  const handleInputChangeVal = (name, value) => {
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors);
  };

  const toggleOpen = () => {
    setCategoryOpen(!categoryOpen);
  };

  const handleCategoryClose = () => {
    setCategoryOpen(false);
  };

  const handleVendorBoxClose = () => {
    setCategoryOpen(false);
    setVendorDetail(false);
    setSelectedBusinessDetails({});
  };

  const toggleOpenBusiness = (category) => {
    setCategoryOpen(false);
    setVendorDetail(true);
    //setSelectedCategory(category);
    //setcatBusiness(category.businesses);
    /* setSelectedBusinessDetails(null);
    setPhone("");
    setEmail("");
    setBudget(""); */
    //console.log(category);
    CoupleJS.autoCompleteVendorOnCategory(category.id, setcatBusiness);
  };

  console.log("Selected category:", selectedCategory);
  console.log("Businesses: ", catBusiness);
  console.log("business details passed:", businessDetails);

  const mainMenus = [
    {
      id: 1,
      item: "Wedding Directory",
      link: `${window.WEDDING_DIRECTORY}`,
    },
    {
      id: 2,
      item: "Enquiries",
      link: `${window.CVENQUIRY}`,
    },
    {
      id: 3,
      item: "Booked vendors",
      link: `${window.BOOKING}`,
    },
  ];

  // Edit
  const handleEdit = (vendor) => {
    setVendorDetail(true);
    setSelectedBusinessDetails(vendor);
    // setSelectedCategory(vendor);
    // setSelectedBusinessDetails({
    //   category_id: vendor.category_id,
    //   category_name: vendor.category_name,
    //   business_name: vendor.business_name,
    //   phone: vendor.phone,
    //   email: vendor.email,
    //   budget: vendor.budget,
    // });
    setBudget(vendor.budget || "");
    setEditBusinessDetail(vendor);
  };

  const handleBusinessSubmit = () => {
    const newBusinessDetail = {
      category_id: selectedCategory?.id || "",
      category_name: selectedCategory?.title || "",
      business_name: selectedBusinessDetails?.name || "",
      phone: selectedBusinessDetails?.phone || "",
      email: selectedBusinessDetails?.email || "",
      imageUrl: selectedBusinessDetails?.imageUrl || "",
      budget: budget || "",
    };

    if (editBusinessDetail) {
      // If editing, replace the existing business detail with the updated one
      setBusinessDetails((prevBusinessDetails) =>
        prevBusinessDetails.map((prevBusiness) =>
          prevBusiness === editBusinessDetail ? newBusinessDetail : prevBusiness
        )
      );
    } else {
      // If adding a new one, append to the list
      setBusinessDetails((prevBusinessDetails) => [
        ...prevBusinessDetails,
        newBusinessDetail,
      ]);
    }
    console.log("Form Values:", newBusinessDetail);
    setCategoryOpen(false);
    setVendorDetail(false);
  };

  return (
    <section className="w-[100%]">
      {/* section header */}
      <div className="main-menu-section">
        <ul className="enquiry-page-header ">
          {mainMenus.map((menuItem) => (
            <li
              key={menuItem.id}
              className={
                menuItem.id == "3"
                  ? "underline decoration-4 decoration-[#6cc2bc]"
                  : ""
              }
            >
              <Link to={menuItem.link}>{menuItem.item}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
      <React.Fragment>
        <div className="main-content">
          <h2>{pageContent.title}</h2>
          {/* info content */}
          <div className="">
            <p className="flex justify-start items-start gap-[0.5rem] mt-[0.5rem] mb-[0.5rem]">
              <h6>Track your whole team in one easy place.</h6>
              <IoIosInformationCircleOutline fill="#000" size={16} />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[1rem] mt-[1rem]">
            {/* Category */}
            <div className="flex items-center justify-between w-[100%] sm:w-[350px]">
              <div>{data.length} booked vendors</div>
              <div onClick={() => toggleOpen()}>
                <CoupleAddCategoryButton>Add category</CoupleAddCategoryButton>
              </div>
            </div>
            {/* Display businessDetails in Booking Card */}
            <div className="booking-cotainer">
              {data?.map((vendor) => {
                return (
                  <div className="booked-card">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-[10px]">
                        <LuCheckCircle2 size={40} fill="#fff" color="#d7d7d7" />
                        <h4>Booked</h4>
                      </div>
                      <h4
                        className="font-[600] underline cursor-pointer"
                        onClick={() => handleEdit(vendor)}
                      >
                        Edit
                      </h4>
                    </div>
                    <h2>{vendor.category}</h2>
                    <j4>{vendor.vname}</j4>
                    <div className="booked-image-container">
                      <img className="" src={vendor.imageUrl} />
                    </div>
                  </div>
                );
              })}
              {/* {businessDetails.map((vendor) => (
                <div className="booked-card">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-[10px]">
                      <LuCheckCircle2 size={40} fill="#fff" color="#d7d7d7" />
                      <h4>Booked</h4>
                    </div>
                    <h4
                      className="font-[600] underline cursor-pointer"
                      onClick={() => handleEdit(vendor)}
                    >
                      Edit
                    </h4>
                  </div>
                  <h2>{vendor.category_name}</h2>
                  <j4>{vendor.business_name}</j4>
                  <div className="booked-image-container">
                    <img className="" src={vendor.imageUrl} />
                  </div>
                </div>
              ))} */}
            </div>

            {/* ADD CATEGORY  */}
            <Modal
              open={categoryOpen}
              onClose={handleCategoryClose}
              aria-labelledby="modal-modal-category"
              aria-describedby="modal-category-add"
            >
              <div>
                <div className="booked-modal-container">
                  <div className="booked-modal-content">
                    <div
                      className="flex justify-end"
                      onClick={handleCategoryClose}
                    >
                      <AiOutlineClose
                        size={26}
                        className=" fixed cursor-pointer "
                      />
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
                            <CoupleAddCategoryButton
                              onClick={() => toggleOpenBusiness(category)}
                            >
                              {category.title}
                            </CoupleAddCategoryButton>
                          </div>
                        ))}
                      </div>
                      <div
                        className="flex justify-end items-center mt-[3rem] mr-[10%]"
                        onClick={handleCategoryClose}
                      >
                        <button className="cancel-button">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>

            {/* VENDOR DETAIL */}
            {vendorDetail && selectedCategory && (
              <Modal
                open={vendorDetail}
                onClose={handleVendorBoxClose}
                aria-labelledby="modal-modal-vendor-detail"
                aria-describedby="modal-vendor-detail"
              >
                <div className="booked-modal-container">
                  <div className="booked2-modal-content">
                    <div
                      className="flex justify-end"
                      onClick={handleVendorBoxClose}
                    >
                      <AiOutlineClose
                        size={26}
                        className=" fixed cursor-pointer "
                      />
                    </div>
                    <div className="flex flex-col gap-[1rem] pr-[1rem] pl-[1rem]">
                      {/* heading */}
                      <div className=" mt-[3rem]">
                        <h1>Their details</h1>
                      </div>
                      <pre>{JSON.stringify(formValues, null, 2)}</pre>
                      {/* Category item */}
                      <div className="flex  items-center flex-wrap gap-[0.5rem]">
                        <div className="flex flex-col gap-[5px]">
                          <label>
                            Business Name
                            <span style={{ color: "red", fontSize: "16px" }}>
                              *
                            </span>
                          </label>
                          <Select
                            name="business_name"
                            type="select"
                            style={{ width: "100%", fontSize: "14px" }}
                            placeholder=""
                            isSearchable={true}
                            onInputChange={(inputValue) =>
                              setMenuIsOpen(inputValue.length > 0)
                            }
                            menuIsOpen={menuIsOpen}
                            filterOption={({ label, value }, inputValue) =>
                              label
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            }
                            styles={{ ...EnquirySelectStyle, ...customStyles }}
                            options={selectedCategory.businesses.map(
                              (business) => ({
                                value: business.id,
                                label: business.name,
                              })
                            )}
                            value={
                              selectedBusinessDetails
                                ? {
                                    value: selectedBusinessDetails.id,
                                    label: selectedBusinessDetails.name,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              const selectedBusiness =
                                selectedCategory.businesses.find(
                                  (business) =>
                                    business.id === selectedOption.value
                                );
                              handleInputChangeVal(
                                "business_name",
                                selectedBusiness
                              );
                              //setSelectedBusinessDetails(selectedBusiness);
                            }}
                            components={{
                              Menu,
                              MultiValue,
                              IndicatorSeparator: null,
                              DropdownIndicator: () => (
                                <div className="hidden">
                                  <FontAwesomeIcon
                                    icon={faCaretDown}
                                    className="dropDown-position"
                                    style={{
                                      color: "#6cc2bc",
                                      marginRight: "0.5rem",
                                    }}
                                  />
                                </div>
                              ),
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[5px]">
                          <label>
                            Phone{" "}
                            <span style={{ color: "red", fontSize: "16px" }}>
                              *
                            </span>
                          </label>

                          <input
                            disabled
                            name="phone"
                            type="number"
                            className="coupleenq-input-style"
                            value={formValues.phone}
                          />
                        </div>
                        <div className="flex flex-col gap-[5px]">
                          <label>
                            Email{" "}
                            <span style={{ color: "red", fontSize: "16px" }}>
                              *
                            </span>
                          </label>
                          <input
                            name="email"
                            disabled
                            className="coupleenq-input-style"
                            value={formValues.email}
                          />
                        </div>
                        <div className="flex flex-col gap-[5px]">
                          <label>
                            Cost of Product{" "}
                            <span style={{ color: "red", fontSize: "16px" }}>
                              *
                            </span>
                          </label>
                          <input
                            name="budget"
                            type="number"
                            className="coupleenq-input-style"
                            value={formValues.budget}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end items-center mt-[3rem] mr-[10%] gap-[1rem]">
                        <button
                          onClick={handleBusinessSubmit}
                          className="save-button"
                        >
                          Save
                        </button>
                        <button
                          className="cancel-button"
                          onClick={handleVendorBoxClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </React.Fragment>
    </section>
  );
}

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

//CUSTOMSTYLE

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
