// import React, { useState, useEffect, useCallback, useRef } from "react";
// import "../Style/BusinessProfile.css";
// // Accordion
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { RxTriangleUp } from "react-icons/rx";
// // Editor
// import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import { convertToHTML } from "draft-convert";
// import DOMPurify from "dompurify";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import {
//   Checkbox,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   Grid,
//   Stack,
//   Typography,
// } from "@mui/material";
// import Cropper from "../../components/Cropper";
// import ImageUploader from "../../components/ImageUploader";
// // packages
// import { BiUpload } from "react-icons/bi";
// import { HiOutlineViewfinderCircle } from "react-icons/hi2";
// import { MdDelete } from "react-icons/md";

// import PhotoGalleryTest from "./BusinessMyProfile/PhotoGalleryTest";
// import VideoGallery from "./BusinessMyProfile/myProfileVideo";
// import { PricingCheckbox, StyledAccordion } from "../../components/FormStyle";
// import * as BusinessJS from "../Business/Business";
// import Skeleton from "@mui/material/Skeleton";
// import { Preview } from "@mui/icons-material";
// import { NavLink } from "react-router-dom";
// import _ from "lodash";
// import PhotoPreview from "./BusinessMyProfile/PhotoPreview";
// import VideoPreview from "./BusinessMyProfile/VideoPreview";

// const toolbarOptions = {
//   options: ["inline", "list"],
//   inline: {
//     options: ["bold", "italic"],
//   },
//   list: {
//     options: ["unordered", "ordered"],
//   },
// };

// const Profile = () => {
//   const [viewProfile, setViewProfile] = useState("");

//   const [previewListing, setPreviewListing] = useState("");
//   const [vendorinputs, setVendorInputs] = useState("");
//   const vendorID = vendorinputs.vid;
//   const businessID = vendorinputs.id;
//   const isScreenSizeAbove1250px = window.innerWidth > 1250;
//   const [expanded, setExpanded] = useState(false);
//   // Quick desc
//   const quickRef = useRef();
//   const [quickText, setQuickText] = useState("");
//   const [saveClicked, setSaveClicked] = useState(false);
//   const [wordCount, setWordCount] = useState(0);
//   const [inputsErrors, setInputsErrors] = useState({});

//   const [previewSet, setpreviewSet] = useState(false);
//   // Full desc
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );
//   const [convertedContent, setConvertedContent] = useState(null);
//   const [fullText, setFullText] = useState("");
//   const [fulldesccount, setFulldesccount] = useState(0);
//   // Owner and Team
//   const [ownerText, setOWnerText] = useState("");
//   const [ownerContent, setOwnerContent] = useState("");
//   const [defaultContent, setDefaultcontent] = useState("");
//   const [ownerRadioOption, setOwnerRadioOption] = useState(1);
//   const [croppedImage, setCroppedImage] = useState("");
//   const [imageTypes, setImageTypes] = useState({});
//   const [ownerImage, setOwnerImage] = useState(viewProfile.teamownerpic || "");
//   // Packages
//   const [pfile, setPfile] = useState();
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const [packagesText, setPackagesText] = useState("");
//   const [uploadedFileName, setUploadedFileName] = useState("");
//   const [viewFile, setViewFile] = useState("");
//   const [delPackage, setDelPackages] = useState(false);
//   // QandA
//   const [questions, setQuestions] = useState([
//     { id: 1, question: "", answer: "" },
//   ]);
//   const [updateQanda, setUpdateQanda] = useState({});
//   const [questionDisplay, setQuestionDisplay] = useState([]);
//   const [qwordCount, setQwordCount] = useState(0);
//   const [qandaWordCountError, setqandaWordCountError] = useState(false);
//   // const [inputsErrors, setInputsErrors] = useState({});
//   const [questionRes, setQuestionRes] = useState({});
//   const [deleteQA, setDeleteQA] = useState("");
//   const [viewQandA, setViewQandA] = useState([]);
//   // Pricing
//   const [inputsPricing, setInputsPricing] = useState([]);
//   const [isActive, setIsActive] = useState({});
//   // const [inputsErrors, setInputsErrors] = useState({});
//   const [pricingFormValue, setPricingFormValue] = useState({});
//   const [pformValues, setPFormValues] = useState({});
//   // Inclusion
//   const [selectedInclusions, setSelectedInclusions] = useState({});
//   const [inclusionResult, setInclusionResult] = useState([]);
//   const [incResponse, setIncResponse] = useState([]);
//   // expansion handling
//   const handleChange = (isExpanded: boolean, panel: string) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   //preview listing
//   const fetchData = useCallback(async () => {
//     // console.log("Fetching data...");
//     await BusinessJS.fetchbusiness(setVendorInputs, setpreviewSet);
//     if (vendorID) {
//       await BusinessJS.vendorView(setPreviewListing, vendorID, setpreviewSet);
//     }
//   }, [vendorID]);

//   // Fetch data only when the component mounts or vendorID changes
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);
//   // console.log("Vendor Preview:", previewListing);

//   // console.log("Vendor inputs:", vendorinputs);

//   // viewprofile
//   useEffect(() => {
//     BusinessJS.viewProfileSettings(vendorID, setViewProfile);
//   }, [vendorID]);
//   console.log("view profile:", viewProfile);

//   useEffect(() => {
//     setOwnerImage(viewProfile.teamownerpic || "");
//     setDefaultcontent(viewProfile.team_owner_details);
//   }, [viewProfile]);
//   // console.log("Team owner detail:", viewProfile.team_owner_details);

//   /*****Pricing  ***********/
//   const handleDisplayChange = (categoryID, value) => {
//     setIsActive((prevDisplayStates) => ({
//       ...prevDisplayStates,
//       [categoryID]: value ? 1 : 0,
//     }));
//     // setSelectedDisplayState(categoryID, value);
//   };

//   const handlePricingInputChange = (name, value, props) => {
//     if (inputsPricing.length !== undefined && inputsPricing.length > 0) {
//       let pricingArray = [...inputsPricing];
//       let catKey = props.catKey;
//       let setKey = props.setKey;

//       if (typeof pricingArray[catKey] === "undefined") {
//         pricingArray[catKey] = {};
//       }

//       if (typeof pricingArray[catKey]["CategorySettings"] === "undefined") {
//         pricingArray[catKey]["CategorySettings"] = [];
//       }
//       if (
//         typeof pricingArray[catKey]["CategorySettings"][setKey] === "undefined"
//       ) {
//         pricingArray[catKey]["CategorySettings"][setKey] = {};
//       }

//       pricingArray[catKey]["categoryid"] = props.categoryid;
//       pricingArray[catKey]["vid"] = vendorinputs.vid;
//       pricingArray[catKey]["CategorySettings"][setKey]["csid"] = props.csid;
//       pricingArray[catKey]["CategorySettings"][setKey]["hid"] = props.hid;
//       pricingArray[catKey]["CategorySettings"][setKey]["vcids"] = props.vcids;
//       pricingArray[catKey]["CategorySettings"][setKey]["grpcid"] = props.grpcid;
//       pricingArray[catKey]["CategorySettings"][setKey][name] = value;
//       // pricingArray[catKey]["CategorySettings"][setKey]["subtype_val"] = value;

//       setInputsPricing(pricingArray);
//     } else {
//       let catKey = props.catKey;
//       let setKey = props.setKey;
//       let pricingArray = [];
//       pricingArray[catKey] = {};
//       pricingArray[catKey]["categoryid"] = props.categoryid;
//       pricingArray[catKey]["vid"] = vendorinputs.vid;
//       pricingArray[catKey]["CategorySettings"] = [];
//       pricingArray[catKey]["CategorySettings"][setKey] = {};
//       pricingArray[catKey]["CategorySettings"][setKey]["csid"] = props.csid;
//       pricingArray[catKey]["CategorySettings"][setKey]["hid"] = props.hid;
//       pricingArray[catKey]["CategorySettings"][setKey]["vcids"] = props.vcids;
//       pricingArray[catKey]["CategorySettings"][setKey]["grpcid"] = props.grpcid;
//       pricingArray[catKey]["CategorySettings"][setKey][name] = value;

//       setInputsPricing(pricingArray);
//     }

//     // Call handleDisplayChange when "Yes" button is clicked
//     if (name === "subtype_val" && value === 1) {
//       handleDisplayChange(props.categoryid, 1);
//     }

//     // Call handleDisplayChange when "No" button is clicked
//     if (name === "subtype_val" && value === 0) {
//       handleDisplayChange(props.categoryid, 0);
//     }
//   };

//   const handleInclusionChange = (
//     inchid,
//     incTitle,
//     valueId,
//     valueTitle,
//     checked
//   ) => {
//     setSelectedInclusions((prevSelected) => ({
//       ...prevSelected,
//       [inchid]: {
//         inchid,
//         incTitle,
//         selectedValues: {
//           ...(prevSelected[inchid]?.selectedValues || {}),
//           [valueId]: checked ? valueTitle : undefined,
//         },
//       },
//     }));
//   };

//   const handlePricingSubmit = async () => {
//     console.log("PRicing inputs:", inputsPricing);
//     BusinessJS.updateQandAProfile(
//       inputsPricing,
//       vendorID,
//       8,
//       setInputsErrors,
//       setVendorInputs
//     );
//   };

//   const handleInclusionSubmit = () => {
//     setSaveClicked(true);
//     setExpanded(false);

//     // console.log("Selected Inclusions:", selectedInclusions);
//     const selectedValuesIds = Object.values(selectedInclusions)
//       .map((inclusion) => Object.keys(inclusion.selectedValues)[0])
//       .filter(Boolean); // Filter out undefined values

//     const result = {
//       inclusionsValue: selectedValuesIds.join(","),
//       vid: vendorinputs.vid,
//     };
//     setInclusionResult(result);
//     // console.log("inclusion:", result);
//     BusinessJS.updateInclusions(
//       inclusionResult,
//       vendorID,
//       8,
//       setInputsErrors,
//       setIncResponse
//     );
//   };

//   const formattedInclsuionsData =
//     viewProfile.inclusions &&
//     viewProfile.inclusions.map((inclusion) => {
//       const selectedValues = inclusion.values
//         .filter((value) => value.type_val === "1")
//         .map((value) => value.title)
//         .join(", ");

//       return `${inclusion.title}: ${selectedValues}`;
//     });

//   const formattedCategoryData =
//     viewProfile.Category &&
//     viewProfile.Category.map((category) => {
//       const formattedSettings =
//         category.CategorySettings &&
//         category.CategorySettings.map((setting) => {
//           const amount = setting.type_val;
//           const title = setting.head_title;
//           const subtitle = setting.head_subtitle ? "Yes" : "No";

//           return {
//             title,
//             Amount: amount,
//             ...(setting.head_subtitle && { Head_Subtitle: subtitle }),
//           };
//         });

//       return {
//         CategoryName: category.CategoryName,
//         Settings: formattedSettings || [], // Provide an empty array if Settings is undefined
//       };
//     });
//   const skeletonLines = [
//     { variant: "text", height: "1rem" },
//     { variant: "rectangular", width: "100%", height: "5rem" },
//   ];

//   return (
//     <div className="preview-listing-container">
//       {/* <pre>{JSON.stringify(previewListing, null, 2)}</pre> */}

//       {/* PROFILE BASICS */}
//       <div className="grid grid-cols-1" style={{ justifyItems: "end" }}>
//         <div className="preview-listing-div">
//           <h4 className="font-bold">Preview Listing</h4>
//         </div>
//       </div>

//       <div className="mb-[1rem]"></div>
//       <>
//         <h2 className="profile-listing-header">Profile Basics</h2>
//       </>
//       <br />
//       <div>
//         <div className="grid grid-cols-1">
//           {/* PRICING */}
//           <div>
//             {viewProfile ? (
//               <StyledAccordion
//                 expanded={expanded === "panel4"}
//                 onChange={(e, isExpanded) => handleChange(isExpanded, "panel4")}
//               >
//                 <AccordionSummary
//                   style={{
//                     paddingLeft:
//                       expanded === "panel4"
//                         ? isScreenSizeAbove1250px
//                           ? "2rem"
//                           : "1rem"
//                         : "0",
//                   }}
//                   id="panel4-header"
//                   aria-controls="panel4-content"
//                   expandIcon={
//                     <Typography
//                       sx={{
//                         color: "black",
//                         fontFamily: "inherit",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                       }}
//                     >
//                       {expanded === "panel4" ? (
//                         <RxTriangleUp size={30} color="#6cc2bc" />
//                       ) : (
//                         "Edit"
//                       )}
//                     </Typography>
//                   }
//                   sx={{
//                     "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//                       transform: "rotate(0deg)",
//                       color: "black",
//                     },
//                   }}
//                 >
//                   <div>
//                     <h4 className="profile-listing-header">Pricing</h4>
//                     <p className="myprofile-accordion-subheading">
//                       {formattedCategoryData.map((category, index) => (
//                         <div key={index}>
//                           <div
//                             style={{
//                               fontWeight: "600",
//                               color: "#515151",
//                               textDecoration: "underline",
//                             }}
//                           >{`Category Name: ${category.CategoryName}`}</div>
//                           <div>
//                             {category.Settings.map((setting, settingIndex) => (
//                               <div key={settingIndex}>
//                                 <p
//                                   style={{
//                                     fontWeight: "600",
//                                     color: "#515151",
//                                   }}
//                                 >
//                                   {`${setting.title}:`}{" "}
//                                 </p>
//                                 <div>
//                                   {`Amount: ${setting.Amount}, ${
//                                     setting.Head_Subtitle
//                                       ? `Display Price: ${setting.Head_Subtitle}`
//                                       : ""
//                                   }`}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </p>
//                   </div>
//                 </AccordionSummary>

//                 <AccordionDetails
//                   style={{
//                     paddingLeft:
//                       expanded === "panel4"
//                         ? isScreenSizeAbove1250px
//                           ? "2rem"
//                           : "1rem"
//                         : "0",
//                   }}
//                 >
//                   <div>
//                     {viewProfile.Category &&
//                       viewProfile.Category.map((category, catKey) => (
//                         <div
//                           className="mt-[1rem] mb-[3rem]"
//                           key={category.Categoryid}
//                         >
//                           <div>
//                             <div className="pricing-category-label-section">
//                               <span className="pricing-cate-label">
//                                 {" "}
//                                 {category.CategoryName}
//                               </span>
//                             </div>
//                             {/* Category fields */}
//                             {category.CategorySettings.map(
//                               (categorySettings, setKey) => (
//                                 <div key={setKey} className="flex flex-col ">
//                                   {categorySettings.min_max == "1" ? (
//                                     <>
//                                       <div className="flex  gap-[3rem]">
//                                         <h5 className="font-semibold flex flex-col">
//                                           {categorySettings.head_title}:
//                                         </h5>
//                                         <div className="flex gap-[1rem]">
//                                           <input
//                                             type="text"
//                                             className="capacity-input-style"
//                                             containerClass=""
//                                             placeholder={`${categorySettings.head_title} min`}
//                                             name="type_val"
//                                             value={
//                                               inputsPricing[catKey]
//                                                 ? inputsPricing[catKey][
//                                                     "CategorySettings"
//                                                   ][setKey]
//                                                   ? inputsPricing[catKey][
//                                                       "CategorySettings"
//                                                     ][setKey]["type_val"]
//                                                   : ""
//                                                 : "" ||
//                                                   categorySettings.subtype_val
//                                             }
//                                             catKey={catKey}
//                                             setKey={setKey}
//                                             categoryid={category.Categoryid}
//                                             csid={categorySettings.csid}
//                                             hid={categorySettings.hid}
//                                             vcids={category.Categoryid}
//                                             grpcid={categorySettings.grpcid}
//                                             propsValue={true}
//                                             onChange={(e) =>
//                                               handlePricingInputChange(
//                                                 "type_val",
//                                                 e.target.value,
//                                                 {
//                                                   catKey,
//                                                   setKey,
//                                                   categoryid:
//                                                     category.Categoryid,
//                                                   csid: categorySettings.csid,
//                                                   hid: categorySettings.hid,
//                                                   vcids: category.Categoryid,
//                                                   grpcid:
//                                                     categorySettings.grpcid,
//                                                 }
//                                               )
//                                             }
//                                           />
//                                           <input
//                                             type="text"
//                                             className="capacity-input-style"
//                                             containerClass=""
//                                             placeholder={`${categorySettings.head_title} max`}
//                                             name="subtype_val"
//                                             value={
//                                               inputsPricing[catKey]
//                                                 ? inputsPricing[catKey][
//                                                     "CategorySettings"
//                                                   ][setKey]
//                                                   ? inputsPricing[catKey][
//                                                       "CategorySettings"
//                                                     ][setKey]["subtype_val"]
//                                                   : ""
//                                                 : "" ||
//                                                   categorySettings.type_val
//                                             }
//                                             catKey={catKey}
//                                             setKey={setKey}
//                                             categoryid={category.Categoryid}
//                                             csid={categorySettings.csid}
//                                             hid={categorySettings.hid}
//                                             vcids={category.Categoryid}
//                                             grpcid={categorySettings.grpcid}
//                                             propsValue={true}
//                                             onChange={(e) =>
//                                               handlePricingInputChange(
//                                                 "subtype_val",
//                                                 e.target.value,
//                                                 {
//                                                   catKey,
//                                                   setKey,
//                                                   categoryid:
//                                                     category.Categoryid,
//                                                   csid: categorySettings.csid,
//                                                   hid: categorySettings.hid,
//                                                   vcids: category.Categoryid,
//                                                   grpcid:
//                                                     categorySettings.grpcid,
//                                                 }
//                                               )
//                                             }
//                                           />
//                                         </div>
//                                       </div>
//                                     </>
//                                   ) : categorySettings.head_titletype ===
//                                     "1" ? (
//                                     <>
//                                       <div className="flex  gap-[1rem]">
//                                         <h5 className="font-semibold flex flex-col">
//                                           {categorySettings.head_title}
//                                         </h5>
//                                         <input
//                                           type="text"
//                                           className="capacity-input-style"
//                                           containerClass=""
//                                           label={categorySettings.head_title}
//                                           placeholder={
//                                             categorySettings.head_title
//                                           }
//                                           name="type_val"
//                                           value={
//                                             inputsPricing[catKey]
//                                               ?.CategorySettings[setKey]
//                                               ?.type_val ||
//                                             categorySettings.type_val
//                                           }
//                                           catKey={catKey}
//                                           setKey={setKey}
//                                           categoryid={category.Categoryid}
//                                           csid={categorySettings.csid}
//                                           hid={categorySettings.hid}
//                                           vcids={category.Categoryid}
//                                           grpcid={categorySettings.grpcid}
//                                           propsValue={true}
//                                           onChange={(e) =>
//                                             handlePricingInputChange(
//                                               "type_val",
//                                               e.target.value,
//                                               {
//                                                 catKey,
//                                                 setKey,
//                                                 categoryid: category.Categoryid,
//                                                 csid: categorySettings.csid,
//                                                 hid: categorySettings.hid,
//                                                 vcids: category.Categoryid,
//                                                 grpcid: categorySettings.grpcid,
//                                               }
//                                             )
//                                           }
//                                         />
//                                       </div>
//                                     </>
//                                   ) : categorySettings.head_titletype ===
//                                     "2" ? (
//                                     <>
//                                       <div>
//                                         <h5 className="font-semibold flex flex-col">
//                                           {categorySettings.head_title}
//                                         </h5>
//                                         <PricingCheckbox
//                                           className="yes-button"
//                                           containerClass=""
//                                           label={categorySettings.head_title}
//                                           placeholder={
//                                             categorySettings.head_title
//                                           }
//                                           name="type_val"
//                                           value={
//                                             inputsPricing[catKey]
//                                               ? inputsPricing[catKey][
//                                                   "CategorySettings"
//                                                 ][setKey]
//                                                 ? inputsPricing[catKey][
//                                                     "CategorySettings"
//                                                   ][setKey]["type_val"]
//                                                 : ""
//                                               : "" || categorySettings.type_val
//                                           }
//                                           catKey={catKey}
//                                           setKey={setKey}
//                                           categoryid={category.Categoryid}
//                                           csid={categorySettings.csid}
//                                           hid={categorySettings.hid}
//                                           vcids={category.Categoryid}
//                                           grpcid={categorySettings.grpcid}
//                                           propsValue={true}
//                                           onChange={(e) =>
//                                             handlePricingInputChange(
//                                               "subtype_val",
//                                               e.target.value ? 0 : 1,
//                                               {
//                                                 catKey,
//                                                 setKey,
//                                                 categoryid: category.Categoryid,
//                                                 csid: categorySettings.csid,
//                                                 hid: categorySettings.hid,
//                                                 vcids: category.Categoryid,
//                                                 grpcid: categorySettings.grpcid,
//                                               }
//                                             )
//                                           }
//                                         />
//                                       </div>
//                                     </>
//                                   ) : (
//                                     <></>
//                                   )}
//                                   {categorySettings.head_subtype === "1" ? (
//                                     <>
//                                       <div>
//                                         <h5 className="font-semibold flex flex-col">
//                                           {categorySettings.head_subtitle}
//                                         </h5>
//                                         <input
//                                           type="text"
//                                           className="pricing-input-style"
//                                           containerClass=""
//                                           label={categorySettings.head_subtitle}
//                                           placeholder={
//                                             categorySettings.head_subtitle
//                                           }
//                                           name="subtype_val"
//                                           value={
//                                             inputsPricing[catKey]
//                                               ? inputsPricing[catKey][
//                                                   "CategorySettings"
//                                                 ][setKey]
//                                                 ? inputsPricing[catKey][
//                                                     "CategorySettings"
//                                                   ][setKey]["subtype_val"]
//                                                 : ""
//                                               : ""
//                                           }
//                                           catKey={catKey}
//                                           setKey={setKey}
//                                           categoryid={category.Categoryid}
//                                           csid={categorySettings.csid}
//                                           hid={categorySettings.hid}
//                                           vcids={category.Categoryid}
//                                           grpcid={categorySettings.grpcid}
//                                           propsValue={true}
//                                           onChange={(e) =>
//                                             handlePricingInputChange(
//                                               "type_val",
//                                               e.target.value,
//                                               {
//                                                 catKey,
//                                                 setKey,
//                                                 categoryid: category.Categoryid,
//                                                 csid: categorySettings.csid,
//                                                 hid: categorySettings.hid,
//                                                 vcids: category.Categoryid,
//                                                 grpcid: categorySettings.grpcid,
//                                               }
//                                             )
//                                           }
//                                         />
//                                       </div>
//                                     </>
//                                   ) : categorySettings.head_subtype === "2" ? (
//                                     <>
//                                       <div className="flex items-center gap-[1.5rem]  my-[1rem]">
//                                         <h5 className="font-semibold flex flex-col ">
//                                           {categorySettings.head_subtitle}{" "}
//                                         </h5>

//                                         <div className="flex gap-[1rem]">
//                                           {/* price per head */}
//                                           <button
//                                             className={`yes-check-button ${
//                                               isActive[category.Categoryid] ===
//                                                 1 ||
//                                               (categorySettings.subtype_val ===
//                                                 "1" &&
//                                                 categorySettings.min_max == "0")
//                                                 ? "selected"
//                                                 : ""
//                                             }`}
//                                             containerClass=""
//                                             label={
//                                               categorySettings.head_subtitle
//                                             }
//                                             placeholder={
//                                               categorySettings.head_subtitle
//                                             }
//                                             name="subtype_val"
//                                             value={
//                                               inputsPricing[catKey]
//                                                 ? inputsPricing[catKey][
//                                                     "CategorySettings"
//                                                   ]
//                                                   ? inputsPricing[catKey][
//                                                       "CategorySettings"
//                                                     ][setKey]
//                                                     ? inputsPricing[catKey][
//                                                         "CategorySettings"
//                                                       ][setKey]["subtype_val"]
//                                                     : ""
//                                                   : ""
//                                                 : ""
//                                             }
//                                             catKey={catKey}
//                                             setKey={setKey}
//                                             categoryid={category.Categoryid}
//                                             csid={categorySettings.csid}
//                                             hid={categorySettings.hid}
//                                             vcids={category.Categoryid}
//                                             grpcid={categorySettings.grpcid}
//                                             propsValue={true}
//                                             onClick={(e) => {
//                                               console.log(
//                                                 "categorySettings.subtype_val:",
//                                                 categorySettings.subtype_val
//                                               );
//                                               handlePricingInputChange(
//                                                 "subtype_val",
//                                                 1,
//                                                 {
//                                                   catKey,
//                                                   setKey,
//                                                   categoryid:
//                                                     category.Categoryid,
//                                                   csid: categorySettings.csid,
//                                                   hid: categorySettings.hid,
//                                                   vcids: category.Categoryid,
//                                                   grpcid:
//                                                     categorySettings.grpcid,
//                                                   min_max:
//                                                     categorySettings.min_max,
//                                                 }
//                                               );
//                                             }}
//                                           >
//                                             Yes
//                                           </button>
//                                           {/* No */}
//                                           <button
//                                             className={`no-check-button ${
//                                               isActive[category.Categoryid] ===
//                                                 0 ||
//                                               (categorySettings.subtype_val ===
//                                                 "0" &&
//                                                 categorySettings.min_max == "0")
//                                                 ? "selected"
//                                                 : ""
//                                             }`}
//                                             containerClass=""
//                                             label={
//                                               categorySettings.head_subtitle
//                                             }
//                                             placeholder={
//                                               categorySettings.head_subtitle
//                                             }
//                                             name="subtype_val"
//                                             value={
//                                               inputsPricing[catKey]
//                                                 ? inputsPricing[catKey][
//                                                     "CategorySettings"
//                                                   ]
//                                                   ? inputsPricing[catKey][
//                                                       "CategorySettings"
//                                                     ][setKey]
//                                                     ? inputsPricing[catKey][
//                                                         "CategorySettings"
//                                                       ][setKey]["subtype_val"]
//                                                     : ""
//                                                   : ""
//                                                 : ""
//                                             }
//                                             catKey={catKey}
//                                             setKey={setKey}
//                                             categoryid={category.Categoryid}
//                                             csid={categorySettings.csid}
//                                             hid={categorySettings.hid}
//                                             vcids={category.Categoryid}
//                                             grpcid={categorySettings.grpcid}
//                                             propsValue={true}
//                                             onClick={(e) => {
//                                               console.log(
//                                                 "No categorySettings.subtype_val",
//                                                 categorySettings.subtype_val
//                                               );
//                                               handlePricingInputChange(
//                                                 "subtype_val",
//                                                 0,
//                                                 {
//                                                   catKey,
//                                                   setKey,
//                                                   categoryid:
//                                                     category.Categoryid,
//                                                   csid: categorySettings.csid,
//                                                   hid: categorySettings.hid,
//                                                   vcids: category.Categoryid,
//                                                   grpcid:
//                                                     categorySettings.grpcid,
//                                                   min_max:
//                                                     categorySettings.min_max,
//                                                 }
//                                               );
//                                             }}
//                                           >
//                                             No
//                                           </button>
//                                         </div>
//                                       </div>
//                                     </>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       ))}

//                     <div
//                       className="flex justify-center"
//                       onClick={handlePricingSubmit}
//                     >
//                       <button className="mt-[2rem] flex justify-center items-center w-[120px] h-[40px] rounded-full bg-[#6cc2bc] text-[16px] text-white font-bold cursor-pointer">
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 </AccordionDetails>
//               </StyledAccordion>
//             ) : (
//               skeletonLines.map((line, index) => (
//                 <div key={index}>
//                   <Skeleton
//                     variant={line.variant}
//                     sx={{ width: line.width, height: line.height }}
//                   />
//                   <br />
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Venue inclusion */}
//           {/* Venue Amenities and Service */}
//           <div>
//             {viewProfile
//               ? viewProfile.inclusions && (
//                   <StyledAccordion
//                     expanded={expanded === "panel5"}
//                     onChange={(e, isExpanded) =>
//                       handleChange(isExpanded, "panel5")
//                     }
//                   >
//                     <AccordionSummary
//                       style={{
//                         paddingLeft:
//                           expanded === "panel5"
//                             ? isScreenSizeAbove1250px
//                               ? "2rem"
//                               : "1rem"
//                             : "0",
//                       }}
//                       id="venueAmenities-header"
//                       aria-controls="venueAmenities-content"
//                       expandIcon={
//                         <Typography
//                           sx={{
//                             color: "black",
//                             fontFamily: "inherit",
//                             fontSize: "14px",
//                             fontWeight: "600",
//                           }}
//                         >
//                           {expanded === "panel5" ? (
//                             <RxTriangleUp size={30} color="#6cc2bc" />
//                           ) : (
//                             "Edit"
//                           )}
//                         </Typography>
//                       }
//                       sx={{
//                         "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":
//                           {
//                             transform: "rotate(0deg)",
//                             color: "black",
//                           },
//                       }}
//                     >
//                       <div>
//                         <h4 className="profile-listing-header">
//                           Venue Inclusions
//                         </h4>
//                         {!expanded ? (
//                           <>
//                             <p style={{ marginTop: "10px" }}>
//                               {formattedInclsuionsData.map(
//                                 (formattedString, index) => (
//                                   <div key={index}>{formattedString}</div>
//                                 )
//                               )}
//                             </p>
//                           </>
//                         ) : (
//                           <p className="myprofile-accordion-subheading">
//                             Add Your Venue Inclusions
//                           </p>
//                         )}
//                       </div>
//                     </AccordionSummary>

//                     <AccordionDetails
//                       style={{
//                         paddingLeft:
//                           expanded === "panel5"
//                             ? isScreenSizeAbove1250px
//                               ? "2rem"
//                               : "1rem"
//                             : "0",
//                       }}
//                     >
//                       {viewProfile.inclusions.map((inclusion, index) => (
//                         <div className="mt-[0px]" key={inclusion.inchid}>
//                           <div>
//                             {/* Additional fields for "wedding_venue" */}
//                             <>
//                               <br />
//                               {/* Venue Amenities */}
//                               <Stack spacing={1} direction="row">
//                                 <div className="pricing-addon-label ">
//                                   <span className="l">{inclusion.title}:</span>
//                                 </div>
//                                 <FormControl>
//                                   <FormGroup
//                                     sx={{
//                                       width: {
//                                         xs: "100%",
//                                         md: "31rem",
//                                       },
//                                     }}
//                                   >
//                                     <Grid
//                                       container
//                                       spacing={1}
//                                       container={false}
//                                     >
//                                       {inclusion.values.map((value) => (
//                                         <Grid
//                                           item
//                                           key={index}
//                                           direction="column"
//                                         >
//                                           <FormControlLabel
//                                             control={
//                                               <Checkbox
//                                                 checked={
//                                                   selectedInclusions[
//                                                     inclusion.inchid
//                                                   ]?.selectedValues?.[
//                                                     value.incid
//                                                   ] || value.type_val === "1"
//                                                 }
//                                                 onChange={(e) =>
//                                                   handleInclusionChange(
//                                                     inclusion.inchid,
//                                                     inclusion.title,
//                                                     value.incid,
//                                                     value.title,
//                                                     e.target.checked
//                                                   )
//                                                 }
//                                               />
//                                             }
//                                             label={
//                                               <Typography
//                                                 sx={{ whiteSpace: "normal" }}
//                                               >
//                                                 {value.title}
//                                               </Typography>
//                                             }
//                                           />
//                                         </Grid>
//                                       ))}
//                                     </Grid>
//                                   </FormGroup>
//                                 </FormControl>
//                               </Stack>
//                             </>
//                           </div>
//                         </div>
//                       ))}
//                       <div className="flex justify-center">
//                         <button
//                           className="mt-[2rem] flex justify-center items-center w-[120px] h-[40px] rounded-full bg-[#6cc2bc] text-[16px] text-white font-bold cursor-pointer"
//                           onClick={handleInclusionSubmit}
//                         >
//                           Save
//                         </button>
//                       </div>
//                     </AccordionDetails>
//                   </StyledAccordion>
//                 )
//               : skeletonLines.map((line, index) => (
//                   <div key={index}>
//                     <Skeleton
//                       variant={line.variant}
//                       sx={{ width: line.width, height: line.height }}
//                     />
//                     <br />
//                   </div>
//                 ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
