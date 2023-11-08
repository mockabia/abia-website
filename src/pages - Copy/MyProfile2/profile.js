import React from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import PreviewLisitng2 from "./PreviewLisitng2";
import "./Profile.css";
import LayoutVendor from "../../pages/Common/LayoutVendor";

const Profile = () => {
  return (
    <>
      <LayoutVendor>
        <div className="relative mt-[20px]">
          <div className="preview-lisitng-div">
            <button className="preview-listing-button ">Preview Listing</button>
          </div>
        </div>
        {/* Section */}
        <div className="myprofile-container">
          <PreviewLisitng2 />
        </div>
      </LayoutVendor>
    </>
  );
};

export default Profile;
