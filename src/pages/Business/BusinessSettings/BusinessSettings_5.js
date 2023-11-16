import React, { useEffect, useState } from "react";
import * as BusinessJS from "../Business";
import Select, { components } from "react-select";
import * as yup from "yup";
import "../../Style/BusinessSettings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object().shape({
  primaryLocation: yup
    .array()
    .min(1, "Primary Locations is required")
    .required("Primary Locations is required"),
  target_state: yup
    .array()
    .min(1, "Target Locations is required")
    .required("Target Locations is required"),
  target_region: yup
    .array()
    .min(1, "Target Locations is required")
    .required("Target Locations is required"),
});

const MyLocation = ({ vendorDetails }) => {
  const [initialState, setInitialState] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  const [regions, setRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const [inputsErrors, setInputsErrors] = useState({});

  console.log("Target details:", vendorDetails.target_state);
  console.log("Target region:", vendorDetails.target_region);

  const stateChange = (selectedOption) => {
    setInitialState(selectedOption);
  };

  const handleChange = (selectedOption) => {
    setSelectedStates(selectedOption);
    setInputsErrors((prevErrors) => ({
      ...prevErrors,
      primaryLocation: null,
    }));
  };

  const handleRegionChange = (selectedOption) => {
    setSelectedRegions(selectedOption);
    setInputsErrors((prevErrors) => ({
      ...prevErrors,
      target_region: null,
    }));
  };

  const updatedStateOptions = stateOptions.map((state) => ({
    value: state.url,
    label: state.url,
  }));

  // initial values of hte Select components
  useEffect(() => {
    setInitialState([
      { value: vendorDetails.state, label: vendorDetails.state },
    ]);
    const targetStateArray = vendorDetails.target_state
      .split(",")
      .map((region) => ({ value: region, label: region.trim() }));
    setSelectedStates(targetStateArray);
    const targetRegionArray = vendorDetails.target_region
      .split(",")
      .map((region) => ({ value: region, label: region.trim() }));
    setSelectedRegions(targetRegionArray);
  }, [
    vendorDetails.state,
    vendorDetails.target_state,
    vendorDetails.target_region,
  ]);

  useEffect(() => {
    BusinessJS.fetchState(setStateOptions);
  }, []);
  // fetch region for selected states
  useEffect(() => {
    const selectedStateUrls = selectedStates.map((state) => state.value);
    BusinessJS.fetchRegion(`/${selectedStateUrls}`, setRegions);
  }, [selectedStates]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = {
      primaryLocation: initialState,
      target_state: selectedStates,
      target_region: selectedRegions,
      vid: vendorDetails.vid,
    };
    try {
      await schema.validate(formValues, { abortEarly: false });
      console.log("Form data:", formValues);
      BusinessJS.updateBusiness(5, formValues, setInputsErrors);
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.errors;
      });
      setInputsErrors(validationErrors);
    }
  };

  const getFieldError = (fieldName) => {
    return inputsErrors && inputsErrors[fieldName]
      ? inputsErrors[fieldName][0]
      : null;
  };

  //

  return (
    <div className="mylocation-container">
      <div>
        <p className="text-[14px]">
          Select the area(s) [business name] services
        </p>
      </div>
      <div className="mt-[20px]">
        <form className="">
          {/* state */}
          <div className="space-y-2">
            <label className="font-semibold">Primary Location*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select
                name="primaryLocation"
                sx={{ width: "100%" }}
                value={initialState}
                options={stateOptions}
                onChange={stateChange}
              />
              {getFieldError("primaryLocation") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("primaryLocation")}
                </p>
              )}
            </div>
            <br />
          </div>
          {/* Target Location */}
          <div className="space-y-2">
            <label className="font-semibold">Target Wedding States*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select
                name="target_state"
                sx={{ width: "100%" }}
                options={updatedStateOptions}
                isMulti
                value={selectedStates}
                onChange={handleChange}
                isClearable={false}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{ MultiValue, IndicatorSeparator: null }}
              />
              {getFieldError("target_state") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("target_state")}
                </p>
              )}
            </div>
            <br />
          </div>
          {/* target regions */}
          <div className="space-y-2">
            <label className="font-semibold">Target Wedding Locations*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select
                name="target_region"
                sx={{ width: "100%" }}
                isMulti={true}
                options={regions}
                value={selectedRegions}
                onChange={handleRegionChange}
                isClearable={false}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{ MultiValue }}
              />
              {getFieldError("target_region") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("target_region")}
                </p>
              )}
            </div>
            <br />
          </div>
          <div
            className="basicinfo-submit-button relative space-y-3"
            onClick={handleSubmit}
          >
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyLocation;

const MoreSelectedBadge = ({ items }) => {
  const style = {
    marginLeft: "auto",
    background: "#d4eefa",
    borderRadius: "4px",
    fontFamily: "Open Sans",
    fontSize: "11px",
    padding: "3px",
    order: 99,
  };

  const title = items.join(", ");
  const length = items.length;
  const label = `+ ${length} item${length !== 1 ? "s" : ""} selected`;

  return (
    <div style={style} title={title}>
      {label}
    </div>
  );
};

const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 3;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};
