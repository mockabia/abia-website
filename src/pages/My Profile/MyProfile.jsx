import React, { useState } from "react";
import "./MyProfile.css";
import TopBar from "../../layouts/sidebar/TopBar";
import ContentHeader from "../../layouts/sidebar/ContentHeader";
import { ReactComponent as MyProfileLocation } from "../../icons/location-my-profile.svg";
import PreviewListing from "./PreviewListing";
import TargetLocation from "./TargetLocation";

const MyProfile = () => {
  const [showPreviewListing, setShowPreviewListing] = useState(true);
  const [showTargetLocation, setShowTargetLocation] = useState(false);

  const handlePreviewListingClick = () => {
    setShowPreviewListing(true);
    setShowTargetLocation(false);
  };

  const handleTargetLocationClick = () => {
    setShowPreviewListing(false);
    setShowTargetLocation(true);
  };

  return (
    <>
      <TopBar className="md:hidden" title="My Profile" />
      <div className="md:hidden">
        <ContentHeader title="My Profile" />
      </div>
      <div className="profile-selection-postion">
        <button
          className="preview-listing-button"
          onClick={handlePreviewListingClick}
        >
          Preview listing
        </button>
        <button
          className="target-location-button"
          onClick={handleTargetLocationClick}
        >
          <div className="flex justify-center align-bottom">
            <MyProfileLocation className="w-[25px] fill-[#6cc2bc]" />
            <span className="target-location-text">Target Locations</span>
          </div>
        </button>
      </div>

      <div className="myprofile-container">
        {showPreviewListing && <PreviewListing />}
        {showTargetLocation && <TargetLocation />}
      </div>
    </>
  );
};

export default MyProfile;
