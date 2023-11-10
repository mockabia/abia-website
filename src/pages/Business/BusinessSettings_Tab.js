import React, { useEffect, useState } from "react";
import "../Style/BusinessSettings.css";
import ImageUploader from "../../components/ImageUploader";
import * as Business from "./Business";

//
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

// BASIC INFO
export const BasicInfo = ({ vendorDetails }) => {
  const [inputs, setInputs] = useState({});
  const [inputsErrors, setInputsErrors] = useState({});

  const handleImageCrop = (images) => {
    console.log("ImageUrl:", images.imageUrl);
    console.log("Cropped image:", images.thumbUrl);
    console.log("Cropped thumbnail:", images.iconUrl);
  };

  const handleImageChange = (imageUrl) => {
    setInputs((values) => ({ ...values, ["photo"]: imageUrl }));
  };

  const handleChange = (e) => {
    Business.handleChange(e, setInputs, setInputsErrors);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setInputs((values) => ({
      ...values,
      ["name"]: vendorDetails.name,
      ["website"]: vendorDetails.website,
      ["photo"]: vendorDetails.photo,
      ["vid"]: vendorDetails.id,
    }));
  }, []);

  const updateSettings_1 = async (e) => {
    e.preventDefault();
    Business.updateBusiness(1, inputs, setInputsErrors);
  };
  let isValidForm =
    Object.values(inputsErrors).filter((error) => typeof error !== "undefined")
      .length === 0;
  return (
    <div className="basic-info-container">
      <div className="basic-sub-header">
        <p className="whitespace-break-spaces">
          Add your logo, business name and website to your ABIA Profile.{" "}
        </p>
      </div>
      <div className="mt-[20px]">
        <form className="space-y-7">
          <div>
            <label className="font-semibold">Business Name</label>
            <div>
              <input
                type="text"
                required
                name="name"
                className="basicinfo-input-style"
                defaultValue={inputs.name}
                onChange={handleChange}
              />
              {inputsErrors.name && (
                <div className="text-[12px] text-red-500 font-semibold mt-1">
                  {inputsErrors.name}
                </div>
              )}
            </div>
          </div>
          {/* Wesbite */}
          <div className="">
            <label className="font-semibold">Website</label>
            <div>
              <input
                type="text"
                required
                name="website"
                className="basicinfo-input-style"
                value={inputs.website}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="relative">
            <div>
              <label className="font-semibold">Upload Business Logo</label>
            </div>
            <ImageUploader
              onImageCrop={handleImageCrop}
              onChangeCrop={handleImageChange}
            />

            <div className="upload-recommendation">
              <span>Recommended Size: 400px x 300px</span>
              <br />
              <span>Maximum file size 1MB</span>
            </div>
            <div>
              <button
                className="basicinfo-submit-button"
                onClick={updateSettings_1}
                disabled={!isValidForm}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

/**CONTACT DETAILS*/

export const ContactDetails = ({ vendorDetails }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);

  const [inputs, setInputs] = useState({});
  const [inputsErrors, setInputsErrors] = useState({});

  console.log(vendorDetails.state);

  const handleChange = (e) => {
    Business.handleChange(e, setInputs, setInputsErrors);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  useEffect(() => {
    Business.fetchState(setStateOptions);
    setInputs((values) => ({
      ...values,
      ["contact_person"]: vendorDetails.contact_person,
      ["email"]: vendorDetails.email,
      ["mobile_phone"]: vendorDetails.mobile_phone,
      ["address"]: vendorDetails.address,
      ["postcode"]: vendorDetails.postcode,
      ["suburb"]: vendorDetails.suburb,
      ["state"]: vendorDetails.state,
    }));
  }, []);

  const updateSettings_2 = async (e) => {
    e.preventDefault();
    Business.updateBusiness(2, inputs, setInputsErrors);
  };

  const fieldConfig = [
    {
      name: "contact_person",
      label: "Contact Name*",
      type: "text",
      defaultValue: inputs.contact_person,
    },
    {
      name: "email",
      label: "Email*",
      type: "text",
      defaultValue: inputs.email,
    },
    {
      name: "mobile_phone",
      label: "Phone/Mobile*",
      type: "number",
      defaultValue: inputs.mobile_phone,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      defaultValue: inputs.address,
    },

    {
      name: "postcode",
      label: "Postcode*",
      type: "text",
      defaultValue: inputs.postcode,
    },
    {
      name: "suburb",
      label: "City/Region*",
      type: "text",
      defaultValue: inputs.suburb,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-details-container">
      <div className="mt-[20px]">
        <form className="space-y-5">
          {fieldConfig.map((field) => (
            <div key={field.name}>
              <label className="font-semibold">{field.label}</label>
              <div>
                <input
                  type={field.type}
                  name={field.name}
                  defaultValue={field.defaultValue}
                  onChange={handleChange}
                  className="contactdetails-input-style"
                />
              </div>
            </div>
          ))}
          {inputsErrors.contact_person && (
            <div className="text-[12px] text-red-500 font-semibold mt-1">
              {inputsErrors.contact_person}
            </div>
          )}
          {/* state */}
          <div>
            <label className="font-semibold">State*</label>{" "}
            <div className="relative lg:w-[52%] mylocation-primarylocaion-multiselect">
              <Select
                name="state"
                placeholder={inputs.state}
                onChange={handleSelectChange}
                options={stateOptions.map((state) => ({
                  value: state.value,
                  label: state.label,
                }))}
              />
            </div>
          </div>
          {/* save */}
          <div className="relative space-y-3" onClick={updateSettings_2}>
            <button className="basicinfo-submit-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
