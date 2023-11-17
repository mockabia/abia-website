import React from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import PreviewLisitng2 from "./PreviewLisitng2";
import "./Profile.css";
import LayoutVendor from "../../layouts/Layout/LayoutVendor";

const Profile = () => {
  return (
    <>
      <div className="relative mt-[20px]">
        <div className="preview-lisitng-div">
          <button className="preview-listing-button ">Preview Listing</button>
        </div>
      </div>
      {/* Section */}
      <div className="myprofile-container">
        <PreviewLisitng2 />
      </div>
    </>
  );
};

export default Profile;
