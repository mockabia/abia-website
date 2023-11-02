import React, { useRef, useState } from "react";
import "../Style/BusinessPreviewListing.css";
import { Accordion, AccordionItem } from "react-accessible-accordion";
import QuickDescription from "../MyProfile2/QuickDescription";
import FullDescription from "./FullDescription2";
import VideoGallery from "../My Profile/photos&videos/myProfileVideo";
import MeetTheOwner2 from "./MeetTheOwner2";
import PhotoGalleryTest from "../My Profile/photos&videos/MyProfile-PhotoUplaoder/PhotoGalleryTest";
import Pricing2 from "./Pricing2";
import QandA2 from "./QandA2";
import Packages2 from "./Packages2";

const PreviewListing = () => {
  //accordion style change by state management
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullDescExpanded, setIsFullDescExpanded] = useState(false);
  const [isOwnerExpanded, setIsOwnerExpanded] = useState(false);
  const [isPricingExpanded, setIsPricingExpanded] = useState(false);
  const [isQandAExpanded, setIsQandAExpanded] = useState(false);
  const [isPackagesExpanded, setIsPackagesExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleAccordionChange = () => {
    setIsExpanded(!isExpanded);
    setIsFullDescExpanded(false);
    setIsOwnerExpanded(false);
    setIsPricingExpanded(false);
    setIsQandAExpanded(false);
    setIsPackagesExpanded(false);

    // console.log("Item 1 expanded:", !isExpanded);
  };
  const handleFullAccordionChange = () => {
    setIsFullDescExpanded(!isFullDescExpanded);
    setIsOwnerExpanded(false);
    setIsExpanded(false);
    setIsPricingExpanded(false);
    setIsQandAExpanded(false);
    setIsPackagesExpanded(false);

    // console.log("Item 2 expanded:", !isFullDescExpanded);
  };
  const handleOwnerAccordionChange = () => {
    setIsOwnerExpanded(!isOwnerExpanded);
    setIsExpanded(false);
    setIsFullDescExpanded(false);
    setIsPricingExpanded(false);
    setIsQandAExpanded(false);
    setIsPackagesExpanded(false);
  };
  const handlePricingAccordionChange = () => {
    setIsPricingExpanded(!isPricingExpanded);
    setIsOwnerExpanded(false);
    setIsExpanded(false);
    setIsFullDescExpanded(false);
    setIsQandAExpanded(false);
    setIsPackagesExpanded(false);
  };
  const handleQandAccordionChange = () => {
    setIsQandAExpanded(!isQandAExpanded);
    setIsPricingExpanded(false);
    setIsOwnerExpanded(false);
    setIsExpanded(false);
    setIsFullDescExpanded(false);
    setIsPackagesExpanded(false);
  };
  const handlePackagesccordionChange = () => {
    setIsPackagesExpanded(!isPackagesExpanded);
    setIsQandAExpanded(false);
    setIsPricingExpanded(false);
    setIsOwnerExpanded(false);
    setIsExpanded(false);
    setIsFullDescExpanded(false);
  };
  // border style
  const accordionItemStyle = {
    border: isExpanded ? "1px solid #d6d6d6 " : "none",
    borderRadius: "20px",
  };
  const accordionItemFullStyle = {
    border: isFullDescExpanded ? "1px solid #d6d6d6" : "none",
    borderRadius: "20px",
  };
  const accordionItemOwnerStyle = {
    border: isOwnerExpanded ? "1px solid #d6d6d6" : "none",
    borderRadius: "20px",
  };
  const accordionItemPricingStyle = {
    border: isPricingExpanded ? "1px solid #d6d6d6" : "none",
    borderRadius: "20px",
  };
  const accordionItemQandAStyle = {
    border: isQandAExpanded ? "1px solid #d6d6d6" : "none",
    borderRadius: "20px",
  };
  const accordionItemPackagesStyle = {
    border: isPackagesExpanded ? "1px solid #d6d6d6" : "none",
    borderRadius: "20px",
  };

  return (
    <div className="preview-listing-container">
      {/* PROFILE BASICS */}
      <div>
        <div>
          <h2 className="profile-listing-header">Profile Basics</h2>
        </div>
        <div className="mt-[0px] md:mt-[10px]">
          <Accordion className="myprofile-accordion space-y-[20px]" allowZeroExpanded>
            <AccordionItem
              style={accordionItemStyle}
              uuid={1}
              onClick={() => {
                handleAccordionChange();
              }}
            >
              <QuickDescription handleAccordionChange={handleAccordionChange} />
            </AccordionItem>
            <AccordionItem
              style={accordionItemFullStyle}
              uuid={2}
              onClick={handleFullAccordionChange}
            >
              <FullDescription
                handleFullAccordionChange={handleFullAccordionChange}
              />
            </AccordionItem>
            <AccordionItem
              style={accordionItemOwnerStyle}
              uuid={3}
              onClick={handleOwnerAccordionChange}
            >
              <MeetTheOwner2
                handleOwnerAccordionChange={handleOwnerAccordionChange}
              />
            </AccordionItem>
            <br />
            <div className="mt-[25px]">
              <h1 className="profile-listing-header">Photos/Videos</h1>
            </div>

            <AccordionItem uuid={4}>
              <div className="myprofilePhotos-accordion-item-header">
                Photo Gallery
              </div>
              <div className="photos-subheading-text">
                <span>Drag and drop your photos to change the order. </span>
              </div>
              <PhotoGalleryTest />
              <div className="myprofilePhotos-accordion-item-header">
                Videos
              </div>

              <VideoGallery />
            </AccordionItem>
            {/* <hr /> */}

            <AccordionItem
              style={accordionItemPricingStyle}
              uuid={5}
              onClick={handlePricingAccordionChange}
            >
              <Pricing2 />
            </AccordionItem>
            <AccordionItem
              style={accordionItemQandAStyle}
              uuid={5}
              onClick={handleQandAccordionChange}
            >
              <QandA2 />
            </AccordionItem>
            <AccordionItem
              style={accordionItemPackagesStyle}
              uuid={5}
              onClick={handlePackagesccordionChange}
            >
              <Packages2 />
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="mb-[100px]"></div>
    </div>
  );
};

export default PreviewListing;
