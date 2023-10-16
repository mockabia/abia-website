import React from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import PreviewLisitng2 from "./PreviewLisitng2";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <TopBar className="md:hidden" title="My Profile" />
      {/* head */}

      {/* <div className="headergroup-container relative">
        <div className="preview-lisitng-div ">
          <button className="preview-listing-button">Preview Listing</button>
        </div>
      </div> */}
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
