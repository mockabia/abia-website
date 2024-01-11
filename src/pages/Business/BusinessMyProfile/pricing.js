// import React, { useState, useEffect } from "react";
// import "../Style/BusinessProfile.css";
// // Accordion
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { RxTriangleUp } from "react-icons/rx";
// import { BorderBottom } from "@mui/icons-material";
// import DraftJsEditor2 from "../../components/Editor/DraftJsEditor2";
// // import DraftEditor from "../../third-party-packs/Editor-Draft/DraftEditor";
// import PreviewListing2 from "../../pages - Copy/MyProfile2/PreviewLisitng2";
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
// import PhotoGalleryTest from "../../pages - Copy/My Profile/photos&videos/MyProfile-PhotoUplaoder/PhotoGalleryTest";
// import VideoGallery from "../../pages - Copy/My Profile/photos&videos/myProfileVideo";
// import { StyledAccordion } from "../../components/FormStyle";
// import * as BusinessJS from "./Business";

// const toolbarOptions = {
//   options: ["inline", "list"],
//   inline: {
//     options: ["bold", "italic"],
//   },
//   list: {
//     options: ["unordered", "ordered"],
//   },
// };

// const dynamicFields = [
//   {
//     id: "first_category_val",
//     label: "First Category",
//   },
//   {
//     id: "other_category",
//     label: "Other Category",
//     subFields: [
//       {
//         id: "label",
//         label: "Label",
//       },
//       // Add more subfields as needed
//     ],
//   },
//   {
//     id: "Wedding_Venues",
//     label: "Wedding Venues",
//   },
//   // Add more dynamic fields as needed
// ];

// const Profile = ({ preview }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [draftText, setDraftText] = useState("");
//   const [quickText, setQuickText] = useState("");
//   const [saveClicked, setSaveClicked] = useState(false);
//   const [wordCount, setWordCount] = useState(0);
//   // Editor
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );
//   const [convertedContent, setConvertedContent] = useState(null);
//   const [fullText, setFullText] = useState(null);
//   const [fullDescContent, setFullDescContent] = useState(false);
//   // Owner and Team
//   const [ownerText, setOWnerText] = useState("");
//   const [ownerContent, setOwnerContent] = useState("");
//   const [ownerRadioOption, setOwnerRadioOption] = useState("The Owner");
//   const [croppedImage, setCroppedImage] = useState("");
//   //Pricing
//   const [amount, setAmount] = useState("");
//   const [displayPrice, setDisplayPrice] = useState(false);
//   const [displayStates, setDisplayStates] = useState({});
//   const [accomodatiion, setAccomodatiion] = useState({});
//   const [capacity, setCapacity] = useState("");
//   const [cocktail, setCocktail] = useState("");
//   const [seatedStyle, setSeatedStyle] = useState("");
//   const [venueAmenities, setVenueAmmenities] = useState([]);
//   const [serviceOfferings, setServiceOfferings] = useState([]);

//   //Qand A
//   const [questions, setQuestions] = useState([
//     { id: 1, question: "", answer: "" },
//   ]);
//   const [questionDisplay, setQuestionDisplay] = useState([]);
//   // PACKAGES
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const [packagesText, setPackagesText] = useState("");
//   const [uploadedFileName, setUploadedFileName] = useState("");
//   const [dataSet, setDataSet] = useState(false);
//   const [inputs, setInputs] = useState({});

//   // console.log("Inputs:", inputs);
//   // pricing
//   useEffect(() => {
//     // Initialize display states for each dynamic field
//     const initialDisplayStates = {};
//     dynamicFields.forEach((field) => {
//       initialDisplayStates[field.id] = false;
//     });
//     setDisplayStates(initialDisplayStates);
//     setAccomodatiion(initialDisplayStates);
//   }, []);

//   useEffect(() => {
//     let html = convertToHTML(editorState.getCurrentContent());
//     setConvertedContent(html);
//     setFullText(
//       <div dangerouslySetInnerHTML={createMarkup(convertedContent)} />
//     );
//   }, [editorState, convertedContent]);

//   /********************************************************8****** */

//   const handleChange = (isExpanded: boolean, panel: string) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   /*****PRICING***************** */

//   const handleInputChange = (fieldId, value) => {
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       [fieldId]: value,
//     }));
//   };
//   const handlePricingInputsChange = (fieldId, value) => {
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       [fieldId]: value,
//     }));
//   };
//   const handleCapacityChange = (fieldId, value) => {
//     setCapacity(value);
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       [fieldId]: value,
//     }));
//   };
//   const handleCocktailChange = (fieldId, value) => {
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       [fieldId]: value,
//     }));
//     setCocktail(value);
//   };
//   const handleSeatedStyleChange = (fieldId, value) => {
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       [fieldId]: value,
//     }));
//     setSeatedStyle(value);
//   };

//   const handleDisplayChange = (fieldId, value) => {
//     setDisplayStates((prevDisplayStates) => ({
//       ...prevDisplayStates,
//       [fieldId]: value,
//     }));
//   };
//   const handleAccomodationChange = (fieldId, value) => {
//     setAccomodatiion((prevAccomStates) => ({
//       ...prevAccomStates,
//       [fieldId]: value,
//     }));
//   };
//   const handleVenueAmenitiesChange = (e, index) => {
//     const value = dynamicFields[index].label;
//     setVenueAmmenities((prevVenueAmmenities) => {
//       if (prevVenueAmmenities.includes(value)) {
//         return prevVenueAmmenities.filter((amenities) => amenities !== value);
//       } else {
//         return [...prevVenueAmmenities, value];
//       }
//     });
//   };

//   const handleSErviceOfferings = (e, index) => {
//     const value = dynamicFields[index].label;
//     setServiceOfferings((prevVenueAmmenities) => {
//       if (prevVenueAmmenities.includes(value)) {
//         return prevVenueAmmenities.filter((amenities) => amenities !== value);
//       } else {
//         return [...prevVenueAmmenities, value];
//       }
//     });
//   };
//   const handlePricingSubmit = () => {
//     setExpanded(false);
//     setSaveClicked(true);

//     // Log values of state variables
//     // console.log("Capacity:", capacity);
//     // console.log("Cocktail:", cocktail);
//     // console.log("Seated Style:", seatedStyle);
//     // console.log("Venue Amenities:", venueAmenities);

//     const formData = dynamicFields.reduce((acc, field) => {
//       const fieldName = field.id;
//       const fieldPrice = inputs[fieldName] || "";
//       const fieldDisplayStatus = displayStates[fieldName] ? "Yes" : "No";

//       return {
//         ...acc,
//         [fieldName]: fieldPrice,
//         [`display_${fieldName}`]: fieldDisplayStatus,
//       };
//     }, {});

//     console.log("formValues:", formData);
//   };

//   // console.log("Draft Editor content:", fullText);

//   function createMarkup(html) {
//     return {
//       __html: DOMPurify.sanitize(html),
//     };
//   }

//   return (
//     <div className="preview-listing-container">
//       <div className="preview-lisitng-div">
//         <h3>Preview Lisitng</h3>
//       </div>
//       {/* PROFILE BASICS */}
//       {/* <pre>{JSON.stringify(inputs, null, 2)}</pre> */}
//       <div>
//         <div className="mb-[1rem]">
//           <h2 className="profile-listing-header">Profile Basics</h2>
//         </div>
//         <div className="grid grid-cols-1">
//           {/* PRICING */}
//           <StyledAccordion
//             expanded={expanded === "panel4"}
//             onChange={(e, isExpanded) => handleChange(isExpanded, "panel4")}
//           >
//             <AccordionSummary
//               id="panel4-header"
//               aria-controls="panel4-content"
//               expandIcon={
//                 <Typography
//                   sx={{
//                     color: "black",
//                     fontFamily: "inherit",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   Edit
//                 </Typography>
//               }
//               sx={{
//                 "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//                   transform: "rotate(0deg)",
//                   color: "black",
//                 },
//               }}
//             >
//               <div>
//                 <h4 className="profile-listing-header">Pricing</h4>
//                 {saveClicked && !expanded ? (
//                   <>
//                     {/* Check if there is at least one category with Display Price set to "Yes" */}
//                     {dynamicFields.some((field) => displayStates[field.id]) ? (
//                       // Render starting prices for categories with Display Price set to "Yes"
//                       dynamicFields.map((field) => (
//                         <div key={field.id}>
//                           {displayStates[field.id] && (
//                             <>
//                               <p className="myprofile-accordion-subheading">
//                                 {field.label} Starting Price: $
//                                 {inputs[field.id]}
//                               </p>
//                               <p className="myprofile-accordion-subheading">
//                                 Display Price:{" "}
//                                 {displayStates[field.id] ? "Yes" : "No"}
//                               </p>
//                               {field.id === "Wedding_Venues" &&
//                                 accomodatiion[field.id] !== undefined && (
//                                   <p className="myprofile-accordion-subheading">
//                                     Accommodation Availability:{" "}
//                                     {accomodatiion[field.id] ? "Yes" : "No"}
//                                   </p>
//                                 )}

//                               {field.id === "Wedding_Venues" && capacity && (
//                                 <p className="myprofile-accordion-subheading">
//                                   Capacity: {capacity}
//                                 </p>
//                               )}
//                               {field.id === "Wedding_Venues" && cocktail && (
//                                 <p className="myprofile-accordion-subheading">
//                                   Cocktail: ${cocktail}
//                                 </p>
//                               )}
//                               {field.id === "Wedding_Venues" && seatedStyle && (
//                                 <p className="myprofile-accordion-subheading">
//                                   Seated Style: {seatedStyle}
//                                 </p>
//                               )}
//                             </>
//                           )}
//                         </div>
//                       ))
//                     ) : (
//                       // If all Display Price states are "No", display the comment
//                       <p className="myprofile-accordion-subheading">
//                         Add a Starting Price. It is not mandatory to display
//                         your prices.
//                       </p>
//                     )}
//                   </>
//                 ) : (
//                   // If not saved or not expanded, display the default comment
//                   <p className="myprofile-accordion-subheading">
//                     Add a Starting Price. It is not mandatory to display your
//                     prices.
//                   </p>
//                 )}
//               </div>
//             </AccordionSummary>
//             <AccordionDetails>
//               <div>
//                 {dynamicFields.map((field, index) => (
//                   <div className="mt-[0px]" key={field.id}>
//                     <div>
//                       <div className="pricing-category-label-section">
//                         <span className="pricing-cate-label">
//                           {" "}
//                           {field.label}
//                         </span>
//                       </div>
//                       {/* pricing input */}
//                       <div className="mt-[10px] relative">
//                         <span className="font-semibold flex flex-col">
//                           {field.id === "Wedding_Venues"
//                             ? "Price per Head:"
//                             : "Starting Price:"}
//                         </span>
//                         <div className="">
//                           <span className="dollar-icon"></span>
//                           <input
//                             type="number"
//                             required
//                             className="pricing-input-style"
//                             value={inputs[field.id] || ""}
//                             onChange={(e) =>
//                               handlePricingInputsChange(
//                                 field.id,
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </div>
//                       </div>
//                       {/* display price status */}
//                       <div className="myprofile-button-group relative">
//                         {/* quickdec-button-group */}
//                         <div className="mt-[15px]">
//                           <span className="font-semibold">Display Price ?</span>
//                           <div className="mt-[15px] space-x-2">
//                             <button
//                               className={`yes-button ${
//                                 displayStates[field.id] ? "selected" : ""
//                               }`}
//                               onClick={() =>
//                                 handleDisplayChange(field.id, true)
//                               }
//                             >
//                               Yes
//                             </button>
//                             <button
//                               className={`no-button ${
//                                 !displayStates[field.id] ? "selected" : ""
//                               }`}
//                               onClick={() =>
//                                 handleDisplayChange(field.id, false)
//                               }
//                             >
//                               No
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Additional fields for "wedding_venue" */}
//                       {field.id === "Wedding_Venues" && (
//                         <>
//                           {/* Accomodation Availability */}
//                           <div className="myprofile-button-group relative">
//                             <div className="mt-[15px]">
//                               <span className="font-semibold">
//                                 Accomodation Availability
//                               </span>
//                               <div className="mt-[15px] space-x-2">
//                                 <button
//                                   className={`yes-button ${
//                                     accomodatiion[field.id] ? "selected" : ""
//                                   }`}
//                                   onClick={() =>
//                                     handleAccomodationChange(field.id, true)
//                                   }
//                                 >
//                                   Yes
//                                 </button>
//                                 <button
//                                   className={`no-button ${
//                                     !accomodatiion[field.id] ? "selected" : ""
//                                   }`}
//                                   onClick={() =>
//                                     handleAccomodationChange(field.id, false)
//                                   }
//                                 >
//                                   No
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                           <br />
//                           {/* Capacity */}
//                           <div className="pricing-addons-container">
//                             <div className="pricing-addon-label ">
//                               <span className="l">Capacity:</span>
//                             </div>
//                             <input
//                               type="number"
//                               required
//                               className="capacity-input-style"
//                               value={capacity}
//                               onChange={(e) =>
//                                 handleCapacityChange("Capacity", e.target.value)
//                               }
//                             />
//                           </div>

//                           {/* Cocktail */}
//                           <div className="pricing-addons-container">
//                             <div className="pricing-addon-label ">
//                               <span className="l">Cocktail:</span>
//                             </div>
//                             <input
//                               type="number"
//                               required
//                               className="capacity-input-style"
//                               value={cocktail}
//                               onChange={(e) =>
//                                 handleCocktailChange("Cocktail", e.target.value)
//                               }
//                             />
//                           </div>

//                           {/* Seated Style */}
//                           <div className="pricing-addons-container">
//                             <div className="pricing-addon-label ">
//                               <span className="l">Seated Style</span>
//                             </div>
//                             <input
//                               type="number"
//                               required
//                               className="capacity-input-style"
//                               value={seatedStyle}
//                               onChange={(e) =>
//                                 handleSeatedStyleChange(
//                                   "Seated",
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </div>
//                           <br />
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 <br />

//                 <div className="flex justify-center">
//                   <button
//                     className="mt-[2rem] flex justify-center items-center w-[120px] h-[40px] rounded-full bg-[#6cc2bc] text-[16px] text-white font-bold cursor-pointer"
//                     onClick={handlePricingSubmit}
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </AccordionDetails>
//           </StyledAccordion>
//           {/* Venue Amenities and Service */}
//           {dynamicFields.some((field) => field.id === "Wedding_Venues") && (
//             <StyledAccordion
//               expanded={expanded === "venueAmenities"}
//               onChange={(e, isExpanded) =>
//                 handleChange(isExpanded, "venueAmenities")
//               }
//             >
//               <AccordionSummary
//                 id="venueAmenities-header"
//                 aria-controls="venueAmenities-content"
//                 expandIcon={
//                   <Typography
//                     sx={{
//                       color: "black",
//                       fontFamily: "inherit",
//                       fontSize: "14px",
//                       fontWeight: "600",
//                     }}
//                   >
//                     Edit
//                   </Typography>
//                 }
//                 sx={{
//                   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//                     transform: "rotate(0deg)",
//                     color: "black",
//                   },
//                 }}
//               >
//                 <div>
//                   <h4 style={{ fontWeight: expanded ? "bold" : "normal" }}>
//                     Venue Inclusions
//                   </h4>
//                   {saveClicked && !expanded ? (
//                     <>
//                       {venueAmenities.length > 0 && (
//                         <p className="myprofile-accordion-subheading">
//                           Venue Amenities: {venueAmenities.join(", ")}
//                         </p>
//                       )}
//                       {serviceOfferings.length > 0 && (
//                         <p className="myprofile-accordion-subheading">
//                           Service Offerings : {serviceOfferings.join(", ")}
//                         </p>
//                       )}
//                     </>
//                   ) : (
//                     <p className="myprofile-accordion-subheading">
//                       Add Your Venue inclusions
//                     </p>
//                   )}
//                 </div>
//               </AccordionSummary>
//               <AccordionDetails>
//                 {dynamicFields.map((field, index) => (
//                   <div className="mt-[0px]" key={field.id}>
//                     <div>
//                       {/* Additional fields for "wedding_venue" */}
//                       {field.id === "Wedding_Venues" && (
//                         <>
//                           <br />
//                           {/* Venue Amenities */}
//                           <Stack spacing={1} direction="row">
//                             <div className="pricing-addon-label ">
//                               <span className="l">Venue Amenities:</span>
//                             </div>
//                             <FormControl>
//                               <FormGroup
//                                 sx={{
//                                   width: {
//                                     xs: "100%",
//                                     md: "31rem",
//                                   },
//                                 }}
//                               >
//                                 <Grid container spacing={1} container={false}>
//                                   {dynamicFields.map((option, index) => (
//                                     <Grid item key={index} direction="column">
//                                       <FormControlLabel
//                                         control={
//                                           <Checkbox
//                                             value={option.value}
//                                             checked={
//                                               venueAmenities[option.value]
//                                             }
//                                             onChange={(e) =>
//                                               handleVenueAmenitiesChange(
//                                                 e,
//                                                 index
//                                               )
//                                             }
//                                           />
//                                         }
//                                         label={
//                                           <Typography
//                                             sx={{ whiteSpace: "normal" }}
//                                           >
//                                             {option.label}
//                                           </Typography>
//                                         }
//                                       />
//                                     </Grid>
//                                   ))}
//                                 </Grid>
//                               </FormGroup>
//                             </FormControl>
//                           </Stack>
//                           <Stack spacing={1} direction="row">
//                             <div className="pricing-addon-label ">
//                               <span className="l">
//                                 Venue Service Offerings:
//                               </span>
//                             </div>
//                             <FormControl>
//                               <FormGroup
//                                 sx={{
//                                   width: {
//                                     xs: "100%",
//                                     md: "31rem",
//                                   },
//                                 }}
//                               >
//                                 <Grid container spacing={1} container={false}>
//                                   {dynamicFields.map((option, index) => (
//                                     <Grid item key={index} direction="column">
//                                       <FormControlLabel
//                                         control={
//                                           <Checkbox
//                                             value={option.value}
//                                             checked={
//                                               serviceOfferings[option.value]
//                                             }
//                                             onChange={(e) =>
//                                               handleSErviceOfferings(e, index)
//                                             }
//                                           />
//                                         }
//                                         label={
//                                           <Typography
//                                             sx={{ whiteSpace: "normal" }}
//                                           >
//                                             {option.label}
//                                           </Typography>
//                                         }
//                                       />
//                                     </Grid>
//                                   ))}
//                                 </Grid>
//                               </FormGroup>
//                             </FormControl>
//                           </Stack>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 <div className="flex justify-center">
//                   <button
//                     className="mt-[2rem] flex justify-center items-center w-[120px] h-[40px] rounded-full bg-[#6cc2bc] text-[16px] text-white font-bold cursor-pointer"
//                     onClick={handlePricingSubmit}
//                   >
//                     Save
//                   </button>
//                 </div>
//               </AccordionDetails>
//             </StyledAccordion>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
