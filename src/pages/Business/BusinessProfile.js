import React from "react";
// import makeStyles from "@mui/styles/makeStyles";
import "../Style/BusinessProfile.css";
import PreviewLisitng2 from "../../pages - Copy/MyProfile2/PreviewLisitng2";
import BusinessFullDesc from "../Business/BusinessMyProfile/BusinessFullDesc";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import ShowMoreText from "react-show-more-text";

const useStyles = styled((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleFullAccordionChange = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="preview-listing-container">
      {/* PROFILE BASICS */}
      <div>
        <div>
          <h2 className="profile-listing-header">Profile Basics</h2>
        </div>
        <div className="mt-[0px] md:mt-[10px]">
          {/* <BusinessFullDesc /> */}
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <div className="myprofile-accordion-item-header">
                <h4 className="myprofile-heading-expand">Full Description</h4>
                {/* <span className="myprofile-edit-button">Edit</span> */}
                {/* <RxTriangleUp size={30} className="myprofile-up-aroww" /> */}
              </div>
              <br/>
              <div
                id="quickdesc-subheading"
                className="myprofile-accordion-subheading"
              >
                <p className="leading-[24px]">
                  Give couples a sense of what is included when they book
                  [insert business name]. Include information such as locations,
                  inclusions, starting prices etc.
                </p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <BusinessFullDesc
                handleFullAccordionChange={handleFullAccordionChange}
              />
            </AccordionDetails>
          </Accordion>
          {/* <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Users</Typography>
              <Typography className={classes.secondaryHeading}>
                You are currently not an owner
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat
                lectus, varius pulvinar diam eros in elit. Pellentesque
                convallis laoreet laoreet.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}>
                Advanced settings
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Filtering has been entirely disabled for whole web server
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography className={classes.heading}>Personal data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion> */}
        </div>
      </div>
      <div className="mb-[100px]"></div>
    </div>
  );
};

export default Profile;

// import React, { useRef, useState } from "react";
// import "../Style/BusinessProfile.css";
// import { Accordion, AccordionItem } from "react-accessible-accordion";
// import BusinessFullDesc from "./BusinessMyProfile/BusinessFullDesc";
// import FullDescription from "../../pages - Copy/MyProfile2/FullDescription2"
// // import QuickDescription from "../MyProfile2/QuickDescription";
// // import FullDescription from "./FullDescription2";
// // import VideoGallery from "../My Profile/photos&videos/myProfileVideo";
// // import MeetTheOwner2 from "./MeetTheOwner2";
// // import PhotoGalleryTest from "../My Profile/photos&videos/MyProfile-PhotoUplaoder/PhotoGalleryTest";
// // import Pricing2 from "./Pricing2";
// // import QandA2 from "./QandA2";
// // import Packages2 from "./Packages2";

// const PreviewListing = () => {
//   //accordion style change by state management
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isFullDescExpanded, setIsFullDescExpanded] = useState(false);
//   const [isOwnerExpanded, setIsOwnerExpanded] = useState(false);
//   const [isPricingExpanded, setIsPricingExpanded] = useState(false);
//   const [isQandAExpanded, setIsQandAExpanded] = useState(false);
//   const [isPackagesExpanded, setIsPackagesExpanded] = useState(false);
//   const [showMore, setShowMore] = useState(false);

//   const handleAccordionChange = () => {
//     setIsExpanded(!isExpanded);
//     setIsFullDescExpanded(false);
//     setIsOwnerExpanded(false);
//     setIsPricingExpanded(false);
//     setIsQandAExpanded(false);
//     setIsPackagesExpanded(false);

//     // console.log("Item 1 expanded:", !isExpanded);
//   };
//   const handleFullAccordionChange = () => {
//     setIsFullDescExpanded(!isFullDescExpanded);
//     setIsOwnerExpanded(false);
//     setIsExpanded(false);
//     setIsPricingExpanded(false);
//     setIsQandAExpanded(false);
//     setIsPackagesExpanded(false);

//     // console.log("Item 2 expanded:", !isFullDescExpanded);
//   };
//   const handleOwnerAccordionChange = () => {
//     setIsOwnerExpanded(!isOwnerExpanded);
//     setIsExpanded(false);
//     setIsFullDescExpanded(false);
//     setIsPricingExpanded(false);
//     setIsQandAExpanded(false);
//     setIsPackagesExpanded(false);
//   };
//   const handlePricingAccordionChange = () => {
//     setIsPricingExpanded(!isPricingExpanded);
//     setIsOwnerExpanded(false);
//     setIsExpanded(false);
//     setIsFullDescExpanded(false);
//     setIsQandAExpanded(false);
//     setIsPackagesExpanded(false);
//   };
//   const handleQandAccordionChange = () => {
//     setIsQandAExpanded(!isQandAExpanded);
//     setIsPricingExpanded(false);
//     setIsOwnerExpanded(false);
//     setIsExpanded(false);
//     setIsFullDescExpanded(false);
//     setIsPackagesExpanded(false);
//   };
//   const handlePackagesccordionChange = () => {
//     setIsPackagesExpanded(!isPackagesExpanded);
//     setIsQandAExpanded(false);
//     setIsPricingExpanded(false);
//     setIsOwnerExpanded(false);
//     setIsExpanded(false);
//     setIsFullDescExpanded(false);
//   };
//   // border style
//   const accordionItemStyle = {
//     border: isExpanded ? "1px solid #d6d6d6 " : "none",
//     borderRadius: "20px",
//   };
//   const accordionItemFullStyle = {
//     border: isFullDescExpanded ? "1px solid #d6d6d6" : "none",
//     borderRadius: "20px",
//   };
//   const accordionItemOwnerStyle = {
//     border: isOwnerExpanded ? "1px solid #d6d6d6" : "none",
//     borderRadius: "20px",
//   };
//   const accordionItemPricingStyle = {
//     border: isPricingExpanded ? "1px solid #d6d6d6" : "none",
//     borderRadius: "20px",
//   };
//   const accordionItemQandAStyle = {
//     border: isQandAExpanded ? "1px solid #d6d6d6" : "none",
//     borderRadius: "20px",
//   };
//   const accordionItemPackagesStyle = {
//     border: isPackagesExpanded ? "1px solid #d6d6d6" : "none",
//     borderRadius: "20px",
//   };

//   return (
//     <div className="preview-listing-container">
//       {/* PROFILE BASICS */}
//       <div>
//         <div>
//           <h2 className="profile-listing-header">Profile Basics</h2>
//         </div>
//         <div className="mt-[0px] md:mt-[10px]">
//           <Accordion
//             className="myprofile-accordion space-y-[20px]"
//             allowZeroExpanded
//           >
//             <AccordionItem
//               style={accordionItemStyle}
//               uuid={1}
//               onClick={() => {
//                 handleAccordionChange();
//               }}
//             >
//               {/* <QuickDescription handleAccordionChange={handleAccordionChange} /> */}
//             </AccordionItem>
//             <AccordionItem
//               style={accordionItemFullStyle}
//               uuid={2}
//               onClick={handleFullAccordionChange}
//             >
//               <BusinessFullDesc
//                 handleFullAccordionChange={handleFullAccordionChange}
//               />
//             </AccordionItem>
//             <AccordionItem
//               style={accordionItemOwnerStyle}
//               uuid={3}
//               onClick={handleOwnerAccordionChange}
//             >
//               {/* <MeetTheOwner2
//                 handleOwnerAccordionChange={handleOwnerAccordionChange}
//               /> */}
//             </AccordionItem>
//             <br />
//             <div className="mt-[25px]">
//               <h1 className="profile-listing-header">Photos/Videos</h1>
//             </div>

//             <AccordionItem uuid={4}>
//               <div className="myprofilePhotos-accordion-item-header">
//                 Photo Gallery
//               </div>
//               <div className="photos-subheading-text">
//                 <span>Drag and drop your photos to change the order. </span>
//               </div>
//               {/* <PhotoGalleryTest /> */}
//               <div className="myprofilePhotos-accordion-item-header">
//                 Videos
//               </div>

//               {/* <VideoGallery /> */}
//             </AccordionItem>
//             {/* <hr /> */}

//             <AccordionItem
//               style={accordionItemPricingStyle}
//               uuid={5}
//               onClick={handlePricingAccordionChange}
//             >
//               {/* <Pricing2 /> */}
//             </AccordionItem>
//             <AccordionItem
//               style={accordionItemQandAStyle}
//               uuid={5}
//               onClick={handleQandAccordionChange}
//             >
//               {/* <QandA2 /> */}
//             </AccordionItem>
//             <AccordionItem
//               style={accordionItemPackagesStyle}
//               uuid={5}
//               onClick={handlePackagesccordionChange}
//             >
//               {/* <Packages2 /> */}
//             </AccordionItem>
//           </Accordion>
//         </div>
//       </div>
//       <div className="mb-[100px]"></div>
//     </div>
//   );
// };

// export default PreviewListing;
