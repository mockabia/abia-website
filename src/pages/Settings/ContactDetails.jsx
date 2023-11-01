import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select, { components } from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./ContactDetails.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  BUSINESS_VENDOR,
  STATE_DROPDOWN,
  STATE_VS_REGION_API,
  BUSINESS_SETTINGS2,
} from "../../api/apiUrls";

const phoneRegExp = /^\d{10,}$/;

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    background: "#fafafa",
    border: "1px solid #c3bebe",
    boxShadow: "none",
    borderRadius: "10px",
    borderColor: state.isFocused ? "grey" : "red",
    padding: "5px",
    width: "100%",
    height: "100%",
    maxHeight: "50px",
    maxWidth: "100%",
    "@media (min-width: 1190px)": {
      width: "96%",
      maxWidth: "96%",
    },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "10px",
    borderRadius: "20px",
    padding: "15px",
    border: "1px solid #c3bebe",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#e7f5f4"
      : state.isFocused
      ? "#e7f5f4"
      : "white",
    color: state.isSelected ? "black" : "inherit",
    padding: "12px",
  }),
  indicatorSeparator: (defaultStyles) => {
    return {
      ...defaultStyles,
      display: "none",
    };
  },
  input: (provided) => ({
    ...provided,
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    inputMode: "none",
    tabIndex: "0",
  }),
};

const schema = yup.object().shape({
  contact_person: yup.string().required("Contact name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  mobile_phone: yup
    .string()
    .required("Phone no: is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  state: yup.string().required("Please select an option"),
  postcode: yup.string().required("Postcode is required"),
  suburb: yup.string().required("Suburb is required"),
});

const ContactDetails = ({ vendorDetails }) => {
  const [selectedState, setSelectedState] = useState(vendorDetails.state);
  const [stateOptions, setStateOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState();

  const [formValues, setFormValues] = useState({
    contact_person: "",
    email: "",
    mobile_phone: "",
    address: "",
    state: selectedState,
    suburb: "",
    postcode: "",
  });

  const navigate = useNavigate();

  // userForm from rect-hook-form
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    control,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  useEffect(() => {
    setSelectedState(vendorDetails.state); // Set the default value
  }, [vendorDetails.state]);

  // common handleChange
  const handleChange = (event) => {
    if (event && event.target) {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }
  };

  const fieldConfig = [
    {
      name: "contact_person",
      label: "Contact Name*",
      type: "text",
      defaultValue: vendorDetails.contact_person,
    },
    {
      name: "email",
      label: "Email*",
      type: "text",
      defaultValue: vendorDetails.email,
    },
    {
      name: "mobile_phone",
      label: "Phone/Mobile*",
      type: "number",
      defaultValue: vendorDetails.mobile_phone,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      defaultValue: vendorDetails.address,
    },

    {
      name: "postcode",
      label: "Postcode*",
      type: "text",
      defaultValue: vendorDetails.postcode,
    },
    {
      name: "suburb",
      label: "City/Region*",
      type: "text",
      defaultValue: vendorDetails.suburb,
    },
  ];

  const fetchState = async () => {
    try {
      const response = await axios.get(STATE_DROPDOWN);
      if (response.status === 200) {
        setStateOptions(response.data.result);
      }
    } catch (error) {
      console.error("Error while fetching states:", error);
    }
  };

  useEffect(() => {
    fetchState();
    if (selectedState) {
      fetchRegion(selectedState);
    } else {
      setRegionOptions([]);
    }
  }, [selectedState]);

  const fetchRegion = async () => {
    try {
      const response = await axios.get(STATE_VS_REGION_API);
      if (response.status === 200) {
        setRegionOptions(response.data.result);
        // console.log("Region resposne:", regionOptions);
      }
    } catch (error) {
      console.error("Error while fetching states:", error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(BUSINESS_SETTINGS2, formData);
      if (response.status == 200) {
        console.log("API Response:", response.data);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-details-container">
      <div className="mt-[20px]">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {fieldConfig.map((field) => (
            <div key={field.name}>
              <label className="font-semibold">{field.label}</label>
              <div>
                <input
                  type={field.type}
                  name={field.name}
                  defaultValue={field.defaultValue}
                  className={`contactdetails-input-style ${
                    errors[field.name] ? "contactdetails-error-border" : ""
                  }`}
                  {...register(field.name)}
                />

                {errors[field.name] && (
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            </div>
          ))}
          {/* state */}
          <div>
            <label className="font-semibold">State*</label>{" "}
            <div className="relative lg:w-[52%] mylocation-primarylocaion-multiselect">
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select
                    name="state"
                    placeholder={selectedState}
                    style={customStyles}
                    options={stateOptions.map((state) => ({
                      value: state.value,
                      label: state.label,
                    }))}
                    {...field}
                    onChange={(selectedOption) => {
                      const stateValue = selectedOption
                        ? selectedOption.label
                        : "";
                      setSelectedState(stateValue);
                      field.onChange(stateValue);
                    }}
                  />
                )}
              />

              
            </div>
           
          </div>

          <div className="relative space-y-3">
            <button
              className="submit-button"
              disabled={!isValid || isSubmitted}
              components={{
                DropdownIndicator: () => (
                  <div>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="dropDown-position"
                      style={{ color: "#7c7c7c" }}
                    />
                  </div>
                ),
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;
