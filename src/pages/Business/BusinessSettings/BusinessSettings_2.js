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

  const handleStateChange = (selectedOption, field) => {
    const stateValue = selectedOption ? selectedOption.label : "";
    setSelectedState(stateValue);
    field.onChange(stateValue);
  };

  const fieldConfig = [
    {
      name: "contact_person",
      label: "Contact Name*",
      type: "text",
    },
    {
      name: "email",
      label: "Email*",
      type: "text",
    },
    {
      name: "mobile_phone",
      label: "Phone/Mobile*",
      type: "tel",
    },
    {
      name: "address",
      label: "Address",
      type: "text",
    },

    {
      name: "postcode",
      label: "Postcode*",
      type: "text",
    },
    {
      name: "suburb",
      label: "City/Region*",
      type: "text",
    },
  ];

  useEffect(() => {
    BusinessJS.fetchState(setStateOptions);
  }, []);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    const formValues = {};
    for (const field of fieldConfig) {
      formValues[field.name] = data[field.name] || formValues[field.name];
    }
    formValues.state = selectedState; // Set the state property
    formValues.vid = vendorDetails.vid;
    const formValuesJSON = JSON.stringify(formValues);
    console.log("Console:", formValuesJSON);
    BusinessJS.updateBusiness(2, formValuesJSON, setInputsErrors);
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
          {fieldConfig.map((field) => (
            <div key={field.name}>
              <label className="font-semibold">{field.label}</label>
              <div>
                <input
                  type={field.type}
                  name={field.name}
                  className="contactdetails-input-style"
                  //   className={`contactdetails-input-style ${
                  //     errors[field.name] ? "contactdetails-error-border" : ""
                  //   }`}
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
                    value={{ label: selectedState, value: selectedState }}
                    options={stateOptions.map((state) => ({
                      value: state.value,
                      label: state.label,
                    }))}
                    onChange={(selectedOption) =>
                      handleStateChange(selectedOption, field)
                    }
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
          {/*  */}
          <div className="relative space-y-3">
            <button
              className="basicinfo-submit-button"
              //   disabled={!isValid || isSubmitted}
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
