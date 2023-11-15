import React, { useEffect, useState } from "react";
import Dropdown from "../../../third-party-packs/dropDown";
import SingleSelect from "../../../third-party-packs/singleSelect";
import { MenuItem, styled } from "@mui/material";
import * as BusinessJS from "../Business";
import Select, { components } from "react-select";

const MyLocation = ({ vendorDetails }) => {
  const [selectedStates, setSelectedStates] = useState([]);
  const [regions, setRegions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  useEffect(() => {
    BusinessJS.fetchState(setStateOptions);
  }, []);

  console.log("State options:", stateOptions);
  console.log("region options:", regions);

  const handleChange = (selectedOption) => {
    setSelectedStates(selectedOption);
  };
  useEffect(() => {
    BusinessJS.fetchRegion(selectedStates, setRegions);
  }, [setSelectedStates]);

  const updatedStateOptions = stateOptions.map((state) => ({
    value: state.url,
    label: `${state.label} (${state.url})`,
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
          {/* state */}
          <div className=" space-y-2">
            <label className="font-semibold">State*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select
                sx={{ width: "100%" }}
                options={updatedStateOptions}
                isMulti
                value={selectedStates}
                onChange={handleChange}
              />
            </div>
            <br />
          </div>
          {/* Target state */}
          <div className="space-y-2">
            <label className="font-semibold">Target States*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select sx={{ width: "100%" }} isMulti />
            </div>
            <br />
          </div>
          {/* target regions */}
          <div className="space-y-2">
            <label className="font-semibold">Locations*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select sx={{ width: "100%" }} isMulti={true} options={regions} />
            </div>
            <br />
          </div>
          {/* Primary Location */}
          <div className="space-y-2">
            <label className="font-semibold">Primary Location*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Select sx={{ width: "100%" }} />
            </div>
            <br />
          </div>

          <div
            className="basicinfo-submit-button relative space-y-3"
            // onClick={handleSubmit}
          >
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyLocation;
