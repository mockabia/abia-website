import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import "../../Style/BusinessSettings.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as BusinessJS from "../Business";
import { customSelectStyles, MultiValue } from "../../../components/FormStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object().shape({
  contact_person: yup.string().required("Contact name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  mobile_phone: yup
    .string()
    .required("Phone no: is required")
    .max(13, "Phone number must not exceed 13 characters"),

  postcode: yup.string().required("Postcode is required"),
  suburb: yup.string().required("Suburb is required"),
});

const ContactDetails = ({ vendorDetails }) => {
  const [selectedState, setSelectedState] = useState(vendorDetails.state);
  const [stateOptions, setStateOptions] = useState([]);
  const [inputsErrors, setInputsErrors] = useState({});
  const [settingResponse, setSettingResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    contact_person: "",
    email: "",
    mobile_phone: "",
    address: "",
    state: selectedState,
    suburb: "",
    postcode: "",
    vid: vendorDetails.vid,
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      contact_person: vendorDetails.contact_person,
      email: vendorDetails.email,
      mobile_phone: vendorDetails.mobile_phone,
      address: vendorDetails.address,
      postcode: vendorDetails.postcode,
      suburb: vendorDetails.suburb,
      state: vendorDetails.state,
    },
  });

  useEffect(() => {
    setSelectedState(vendorDetails.state);
  }, [vendorDetails.state]);

  const fieldConfig = [
    {
      id: 1,
      name: "contact_person",
      label: "Contact Name*",
      type: "text",
    },
    {
      id: 2,
      name: "email",
      label: "Email*",
      type: "text",
    },
    {
      id: 3,
      name: "mobile_phone",
      label: "Phone/Mobile*",
      type: "tel",
    },
    {
      id: 4,
      name: "address",
      label: "Address",
      type: "text",
    },

    {
      id: 5,
      name: "postcode",
      label: "Postcode*",
      type: "text",
    },
    {
      id: 6,
      name: "suburb",
      label: "City/Region*",
      type: "text",
    },
    {
      id: 7,
      name: "state", // Include the state field
      label: "State*",
      type: "text", // You might want to adjust this based on the actual type
    },
  ];

  useEffect(() => {
    BusinessJS.fetchState(setStateOptions);
  }, []);

  const onSubmit = (data) => {
    const formValues = {};
    setLoading(true);
    for (const field of fieldConfig) {
      formValues[field.name] = data[field.name] || formValues[field.name];
    }

    const selectedState = stateOptions.find(
      (option) => option.value === data.state.value
    );

    formValues.state = selectedState ? selectedState.url : vendorDetails.state;
    formValues.vid = vendorDetails.vid;

    // If you want a separate property for the state abbreviation

    const formValuesJSON = JSON.stringify(formValues);
    console.log("Console:", formValuesJSON);
    setTimeout(() => {
      BusinessJS.updateBusiness(
        2,
        formValuesJSON,
        setInputsErrors,
        setSettingResponse
      );
      setLoading(false); // Set loading to false when the response is received
    }, 1000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getFieldError = (fieldName) => {
    return inputsErrors && inputsErrors[fieldName]
      ? inputsErrors[fieldName][0]
      : null;
  };

  return (
    <div className="contact-details-container">
      <div className="mt-[20px]">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* {fieldConfig.map((field) => (
            <div key={field.name}>
              <label className="font-semibold">{field.label}</label>
              <div>
                <input
                  type={field.type}
                  name={field.name}
                  className="basicinfo-input-style"
                  {...register(field.name)}
                />
                <div>
                  {errors[field.name] && (
                    <p className="text-[12px] text-red-500 font-semibold mt-1">
                      {errors[field.name].message}
                    </p>
                  )}
                  {getFieldError(field.name) && (
                    <p className="text-[12px] text-red-500 font-semibold mt-1">
                      {getFieldError(field.name)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))} */}
          {fieldConfig.slice(0, 4).map((field) => (
            <div key={field.id}>
              <label className="font-semibold">{field.label}</label>
              <div>
                <input
                  type={field.type}
                  name={field.name}
                  className="basicinfo-input-style"
                  {...register(field.name)}
                />
                <div>
                  {errors[field.name] && (
                    <p className="text-[12px] text-red-500 font-semibold mt-1">
                      {errors[field.name].message}
                    </p>
                  )}
                  {getFieldError(field.name) && (
                    <p className="text-[12px] text-red-500 font-semibold mt-1">
                      {getFieldError(field.name)}
                    </p>
                  )}
                </div>
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
                    {...field}
                    name="state"
                    value={stateOptions.find(
                      (option) => option.value === field.value
                    )}
                    defaultValue={{
                      label: vendorDetails.state,
                      value: vendorDetails.state,
                    }}
                    options={stateOptions}
                    styles={customSelectStyles}
                    components={{
                      MultiValue,
                      IndicatorSeparator: null,
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
                  />
                )}
              />
              {getFieldError("state") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("state")}
                </p>
              )}
            </div>
          </div>
          {fieldConfig.slice(4, 6).map((field) => (
            <div key={field.id}>
              <label className="font-semibold">{field.label}</label>
              <div>
                <input
                  type={field.type}
                  name={field.name}
                  className="basicinfo-input-style"
                  {...register(field.name)}
                />
                <div>
                  {errors[field.name] && (
                    <p className="text-[12px] text-red-500 font-semibold mt-1">
                      {errors[field.name].message}
                    </p>
                  )}
                  {getFieldError(field.name) && (
                    <p className="text-[12px] text-red-500 font-semibold mt-1">
                      {getFieldError(field.name)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/*  */}
          <div
            className={`basicinfo-submit-button ${
              settingResponse ? "focused" : ""
            }`}
            onClick={handleSubmit}
          >
            <button>{loading ? "Loading..." : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;
