import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faL } from "@fortawesome/free-solid-svg-icons";
import { EnquirySelectStyle } from "../../../components/FormStyle";
import Select, { components } from "react-select";
import Modal from "@mui/material/Modal";
import * as CoupleJS from "../Couple";

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
const Menu = (props) => {
  return <components.Menu {...props}>{props.children}</components.Menu>;
};
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

function AddBusiness(props) {
  const enquiry = props.enquiry;
  const open = props.open;
  const setOpen = props.setOpen;
  const setData = props.setData;
  const autocompleteVendors = props.autocompleteVendors;
  const formValues = props.formValues;
  const setFormValues = props.setFormValues;
  const setChoosenCategory = props.setChoosenCategory;
  const [vendorList, setVendorList] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBusinessDetails, setSelectedBusinessDetails] = useState({});
  const [menuIsOpen, setMenuIsOpen] = useState(false); // searchable

  useEffect(() => {
    if (autocompleteVendors.length > 0) {
      const vendors = autocompleteVendors.map((vendor) => ({
        value: vendor.id,
        label: vendor.name,
        phone: vendor.phone,
        email: vendor.email,
      }));
      setVendorList(vendors);
    }
  }, [autocompleteVendors]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors);
  };
  const handleInputChangeVal = (name, value) => {
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors);
  };
  const handleModalClose = () => {
    setChoosenCategory(0);
    setOpen(false);
    setSelectedBusinessDetails({});
  };
  const handleBusinessSubmit = () => {
    setOpen(false);
    console.log("formvalues:", formValues);
    // CoupleJS.addBooking(formValues,setErrors,setData,setOpen);
  };

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-vendor-detail"
          aria-describedby="modal-vendor-detail"
        >
          <div className="booked-modal-container">
            <div className="booked2-modal-content">
              <div className="flex justify-end" onClick={handleModalClose}>
                <AiOutlineClose size={26} className=" fixed cursor-pointer " />
              </div>
              <div className="flex flex-col gap-[1rem] pr-[1rem] pl-[1rem]">
                {/* heading */}
                <div className=" mt-[3rem]">
                  <h1>Their details</h1>
                </div>
                {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
                {/* Category item */}
                <div className="flex  items-center flex-wrap gap-[0.5rem]">
                  <div className="flex flex-col gap-[5px]">
                    <label>
                      Business Name
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </label>
                    <Select
                      name="business_id"
                      type="select"
                      style={{ width: "100%", fontSize: "14px" }}
                      placeholder=""
                      isSearchable={true}
                      onInputChange={(inputValue) =>
                        setMenuIsOpen(inputValue.length > 0)
                      }
                      menuIsOpen={menuIsOpen}
                      filterOption={({ label, value }, inputValue) =>
                        label.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      styles={{ ...EnquirySelectStyle, ...customStyles }}
                      options={vendorList}
                      value={
                        vendorList.length > 0 &&
                        vendorList.filter((option) => {
                          if (option.value == formValues.business_id) {
                            return option;
                          }
                        })
                      }
                      onChange={(selectedOption) => {
                        handleInputChangeVal(
                          "business_id",
                          selectedOption.value
                        );
                        handleInputChangeVal("phone", selectedOption.phone);
                        handleInputChangeVal("email", selectedOption.email);
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
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
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
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
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
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
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
                  <button className="cancel-button" onClick={handleModalClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default AddBusiness;
