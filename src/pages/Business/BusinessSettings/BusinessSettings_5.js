import React, { useEffect, useState } from "react";
import Dropdown from "../../../third-party-packs/dropDown";
import SingleSelect from "../../../third-party-packs/singleSelect";
import { MenuItem, styled } from "@mui/material";
import * as BusinessJS from "../Business";
import Select, { components } from "react-select";

const MyLocation = ({ vendorDetails }) => {
  let target_region = [];
  const [primaryLocation, setPrimaryLocation] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [multiLocation, setMultiLocation] = useState([]);
  const [selected, setSelected] = useState(null);

  const initialState = {
    value: vendorDetails.state,
    label: vendorDetails.state,
  };
  // target state
  const targetState = vendorDetails.target_state;
  const initialTargetState = targetState.split(",").map((state) => ({
    value: state,
    label: state,
  }));
  // target region
  const targetRegion = vendorDetails.target_region;
  const initialTargetRegion = targetRegion.split(",").map((region) => ({
    value: region,
    label: region,
  }));

  // option state
  const targetStateOptions = stateOptions.map((stateOption) => ({
    value: stateOption.url,
    label: stateOption.url,
  }));

 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    BusinessJS.fetchRegion(vendorDetails.state, setPrimaryLocation);
  }, [vendorDetails.state]);

  useEffect(() => {
    BusinessJS.fetchState(setStateOptions);
  }, []);

  // console.log("states in MyLcoation:", stateOptions);
  // submit api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      target_region,
      primaryLocation,
    };
  };

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };

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
          <div className="hidden space-y-2">
            <label className="font-semibold">State*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select sx={{ width: "100%" }} defaultValue={initialState} />
            </div>
            <br />
          </div>
          {/* Target state */}
          <div className="space-y-2">
            <label className="font-semibold">Target States*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select
                sx={{ width: "100%" }}
                isMulti
                defaultValue={initialTargetState}
                options={targetStateOptions}
                onChange={handleChange}
              />
            </div>
            <br />
          </div>
          {/* target regions */}
          <div className="space-y-2">
            <label className="font-semibold">Locations*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select
                sx={{ width: "100%" }}
                isMulti={true}
                defaultValue={initialTargetRegion}
                options={primaryLocation}
                onChange={handleChange}
              />
            </div>
            <br />
          </div>
          {/* Primary Location */}
          <div className="space-y-2">
            <label className="font-semibold">Primary Location*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select
                sx={{ width: "100%" }}
                options={primaryLocation}
                onChange={handleChange}
              />
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
