import React, { useEffect } from "react";
import Dropdown from "../../third-party-packs/dropDown";
import SingleSelect from "../../third-party-packs/singleSelect";
import { states } from "../../data/CategoryItems";

const MyLocation = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  return (
    <div className="mylocation-container">
      <div>
        <p className="text-[14px]">
          Select the area(s) [business name] services
        </p>
      </div>
      <div className="mt-[20px]">
        <form className="">
          <div className="space-y-2">
            <label className="font-semibold">State*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-select">
              <Dropdown options={states} />
            </div>
            <br />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Locations*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-location-multiselect">
              <Dropdown options={states} />
            </div>
            <br />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Primary Locations*</label>
            <br />
            <div className="relative lg:w-[52%] mylocation-primarylocaion-multiselect">
              <SingleSelect options={states} />
            </div>
            <br />
          </div>
          <div className="relative space-y-3">
            <button className="submit-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyLocation;
