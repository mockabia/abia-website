import React, { useEffect, useRef, useState } from "react";
import * as BusinessJS from "../Business";
import Select, { components } from "react-select";
import * as yup from "yup";
import "../../Style/BusinessSettings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { customSelectStyles } from "../../../components/FormStyle";
import { CheckboxOption } from "../../../components/CustomerSelect";

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
  const [initialRegion, setInitialRegion] = useState({});
  const [selectedStates, setSelectedStates] = useState([]);

  const [regions, setRegions] = useState([]); //options
  const [selectedRegions, setSelectedRegions] = useState([]);

  const [inputsErrors, setInputsErrors] = useState({});
  const [settingResponse, setSettingResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const regionChange = (selectedOption) => {
    setInitialRegion([selectedOption]);
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
    // setInputsErrors((prevErrors) => ({
    //   ...prevErrors,
    //   target_region: null,
    // }));
  };

  // initial values of hte Select components
  useEffect(() => {
    const targetRegionArray =
      vendorDetails.target_region != null
        ? vendorDetails.target_region.split(",").map((region) => ({
            value: region.trim(),
            label:
              region.trim().charAt(0).toUpperCase() + region.trim().slice(1),
          }))
        : [];
    //console.log(targetRegionArray);
    setSelectedRegions(targetRegionArray);
  }, [vendorDetails.target_region]);

  useEffect(() => {
    // console.log("=======================================");
    // console.log(selectedRegions);
  }, [selectedRegions]);
  useEffect(() => {
    BusinessJS.fetchRegion(vendorDetails.state, setRegions);
  }, [vendorDetails.state]);

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formattedTargetRegion = selectedRegions.map((region) => region.value);

    const formValues = {
      primaryLocation:
        initialRegion.length > 0
          ? initialRegion[0].value
          : vendorDetails.primaryLocation,
      target_region: formattedTargetRegion,
      vid: vendorDetails.vid,
    };
    console.log("Form data:", formValues);
    setTimeout(() => {
      BusinessJS.updateBusiness(
        5,
        formValues,
        setInputsErrors,
        setSettingResponse
      );
      setLoading(false); // Set loading to false when the response is received
    }, 1000);
  };

  const getFieldError = (fieldName) => {
    return inputsErrors && inputsErrors[fieldName]
      ? inputsErrors[fieldName][0]
      : null;
  };

  //
  const modifiedRegion = regions.map((region) => ({
    value: region.url,
    label: region.label,
  }));
  return (
    <div className="mylocation-container">
      <div>
        <p className="text-[14px]">
          Select the area(s) [business name] services
        </p>
      </div>
      <div className="mt-[20px]">
        <form className="">
          {/* target regions */}
          <div className="space-y-2">
            <label className="font-semibold">Target Wedding Locations*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select
                name="target_region"
                sx={{ width: "100%" }}
                isMulti={true}
                options={modifiedRegion}
                value={selectedRegions}
                styles={customSelectStyles}
                onChange={(selectedOptions) =>
                  handleRegionChange(selectedOptions)
                }
                isClearable={false}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Menu,
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
                  Option: ({ innerProps, label, isSelected }) => (
                    <CheckboxOption
                      innerProps={innerProps}
                      label={label}
                      isSelected={isSelected}
                    />
                  ),
                }}
              />
              {getFieldError("target_region") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("target_region")}
                </p>
              )}
            </div>
            <br />
          </div>
          {/* Primary region -HQ */}
          <div className="space-y-2">
            <label className="font-semibold">Primary Location*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select
                name="primaryLocation"
                sx={{ width: "100%" }}
                // value={initialRegion}
                // value={selectedRegions}
                placeholder=""
                options={selectedRegions}
                onChange={regionChange}
                styles={customSelectStyles}
                components={{
                  Menu,
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
              {getFieldError("primaryLocation") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("primaryLocation")}
                </p>
              )}
            </div>
            <br />
          </div>
          {/* Submit */}
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

export default MyLocation;

// const Menu = (props) => {
//   const optionSelectedLength = props.getValue().length || 0;
//   return (
//     <components.Menu {...props}>
//       {optionSelectedLength < 4 ? (
//         props.children
//       ) : (
//         <div style={{ margin: "1rem", color: "red" }}>Max limit achieved</div>
//       )}
//     </components.Menu>
//   );
// };
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
