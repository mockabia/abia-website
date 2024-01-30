// import React, { useState, useEffect } from "react";
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

// import PhotoGalleryTest from "../../pages - Copy/My Profile/photos&videos/MyProfile-PhotoUplaoder/PhotoGalleryTest";
// import VideoGallery from "../../pages - Copy/My Profile/photos&videos/myProfileVideo";
// import { StyledAccordion } from "../../components/FormStyle";
// import * as BusinessJS from "../Business/Business";
// import Skeleton from "@mui/material/Skeleton";
// import { Preview } from "@mui/icons-material";
// import { NavLink } from "react-router-dom";
// import { FaSpinner } from "react-icons/fa";

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
//   const [previewListing, setPreviewListing] = useState("");
//   const [vendorinputs, setVendorInputs] = useState("");
//   const vendorID = vendorinputs.vid;
//   const businessID = vendorinputs.id;
//   const isScreenSizeAbove1250px = window.innerWidth > 1250;
//   const [expanded, setExpanded] = useState(false);

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
//   const [ownerRadioOption, setOwnerRadioOption] = useState(1);
//   const [croppedImage, setCroppedImage] = useState("");
//   const [imageTypes, setImageTypes] = useState({});
//   const [viewProfile, setViewProfile] = useState("");
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
//   const [questionDisplay, setQuestionDisplay] = useState([]);
//   const [qwordCount, setQwordCount] = useState(0);
//   const [qandaWordCountError, setqandaWordCountError] = useState(false);
//   // Pricing
//   const [pricingInputs, setPricingInputs] = useState({});
//   const [pricingDisplayStates, setPricingDisplayStates] = useState({});
//   const [accomState, setAccomState] = useState({});
//   const [capacity, setCapacity] = useState({});
//   const [cockTail, setCockTail] = useState({});
//   const [seated, setSeated] = useState({});
//   // const [inputsErrors, setInputsErrors] = useState({});
//   const [pricingFormValue, setPricingFormValue] = useState({});
//   const [pformValues, setPFormValues] = useState({});
//   // Inclusion
//   const [selectedInclusions, setSelectedInclusions] = useState({});
//   // expansion handling
//   const handleChange = (isExpanded: boolean, panel: string) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   // viewprofile
//   useEffect(() => {
//     BusinessJS.viewProfileSettings(vendorID, setViewProfile);
//     console.log("View profile:", viewProfile);
//   }, [vendorID]);

//   //preview listing
//   useEffect(() => {
//     const fetchData = async () => {
//       // console.log("Fetching data...");
//       await BusinessJS.fetchbusiness(setVendorInputs, setpreviewSet);
//       if (vendorID) {
//         await BusinessJS.vendorView(setPreviewListing, vendorID, setpreviewSet);
//       }
//     };
//     fetchData();
//   }, [vendorID]);

//   const handleQuickTexChange = (e) => {
//     const inputText = e.target.value;
//     const currentWordCount = inputText.split(/\s+/).filter(Boolean).length;
//     if (currentWordCount <= 100) {
//       setQuickText(inputText);
//       setWordCount(currentWordCount);
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setExpanded(false);
//     setSaveClicked(true);
//     //
//     const formValues = {
//       vid: vendorID,
//       profile_short_desc: quickText,
//     };

//     BusinessJS.updateBusinessMyProfile(
//       formValues,
//       vendorID,
//       1,
//       setInputsErrors,
//       setVendorInputs
//     );
//   };

//   const handleCancel = () => {
//     setExpanded(false);
//     // setDraftText("");
//     setWordCount(0);
//   };

//   const skeletonLines = [
//     { variant: "text", height: "1rem" },
//     { variant: "rectangular", width: "100%", height: "5rem" },
//   ];

//   // FULL DESC
//   useEffect(() => {
//     let html = convertToHTML(editorState.getCurrentContent());
//     setConvertedContent(html);
//     const plainText = editorState.getCurrentContent().getPlainText();
//     const words = plainText.trim().split(/\s+/);
//     const count = words.length;
//     setFulldesccount(count);

//     // Use html directly instead of relying on state update
//     setFullText(<div dangerouslySetInnerHTML={createMarkup(html)} />);
//   }, [editorState, convertedContent]);

//   function createMarkup(html) {
//     return {
//       __html: DOMPurify.sanitize(html),
//     };
//   }

//   const handleFullSubmit = (e) => {
//     e.preventDefault();
//     setExpanded(false);
//     setSaveClicked(true);

//     const formValues = {
//       vid: vendorID,
//       profile_short_desc: previewListing.profile_short_desc,
//       profile_long_desc: convertedContent, // Include the full text in the formValues
//     };
//     console.log("Formvalues from full desc:", formValues);
//     BusinessJS.updateBusinessMyProfile(
//       formValues,
//       vendorID,
//       1,
//       setInputsErrors,
//       setVendorInputs
//     );
//     console.log("Full Text entered:", convertedContent);
//   };

//   //   /********Meet the Team ********* */
//   const handleOwnerTextChange = (e) => {
//     const inputText = e.target.value;
//     const currentWordCount = inputText.split(/\s+/).filter(Boolean).length;

//     if (currentWordCount <= 100) {
//       setOWnerText(inputText);
//       setWordCount(currentWordCount);
//     }
//   };

//   const handleOwnerRadioChange = (value) => {
//     setOwnerRadioOption(value);
//   };
//   useEffect(() => {
//     // console.log("Radio option:", ownerRadioOption);
//   }, [ownerRadioOption]);

//   const handleImageCrop = (images) => {
//     setImageTypes({
//       thumbUrl: images.thumbUrl,
//       iconUrl: images.iconUrl,
//       imageUrl: images.imageUrl,
//     });
//   };
//   const handleImageChange = (thumbUrl) => {
//     setCroppedImage(thumbUrl);
//   };

//   const handleOwnerSubmit = (e) => {
//     e.preventDefault();
//     setExpanded(false);
//     setSaveClicked(true);

//     setOwnerContent(ownerText);
//     const formValues = {
//       vid: vendorID,
//       tempphoto: {
//         imageUrl: imageTypes.imageUrl,
//         thumbUrl: croppedImage,
//         iconUrl: imageTypes.iconUrl,
//       },
//       team_owner_details: ownerText,
//       team_type: ownerRadioOption,
//     };

//     BusinessJS.updateBusinessMyProfile(
//       formValues,
//       vendorID,
//       2,
//       setInputsErrors,
//       setVendorInputs
//     );
//   };

//   /*******PACKAGES*******8 */
//   const handleFileChange = (e) => {
//     const fileInput = e.target;
//     if (fileInput.files.length > 0) {
//       const uploadedFile = fileInput.files[0];
//       setPfile(uploadedFile);
//       setUploadedFileName(uploadedFile.name);
//       setFileUploaded(true);
//     } else {
//       setFileUploaded(false);
//       setUploadedFileName("");
//     }
//   };

//   const handlePackageSubmit = () => {
//     setSaveClicked(true);

//     if (fileUploaded) {
//       setPackagesText("Package Updated: Yes");
//       const formValues = {
//         vid: vendorID,
//         package_file: pfile,
//       };
//       // console.log("Package section:", formValues);
//       BusinessJS.updateBusinessMyProfile_Package(
//         formValues,
//         vendorID,
//         6,
//         setInputsErrors,
//         setViewFile
//       );
//     } else {
//       setPackagesText("Package Updated: No");
//     }
//   };

//   const deletePackage = async () => {
//     await BusinessJS.V_deeletePackages(vendorID, setDelPackages);
//     console.log("Delete package:", deletePackage);
//   };
//   //*****Q and A ***********/
//   const handleQandAWordCount = (text) => {
//     const words = text.trim().split(/\s+/);
//     const count = words.length;
//     setQwordCount(count);

//     if (count > 50) {
//       setqandaWordCountError(true);
//     } else {
//       setqandaWordCountError(false);
//     }
//   };

//   const addQuestion = () => {
//     const newId = questions.length + 1;
//     setQuestions([...questions, { id: newId, question: "", answer: "" }]);
//   };

//   const handleQuestionChange = (e, questionId) => {
//     const updatedQuestions = questions.map((q) =>
//       q.id === questionId ? { ...q, question: e.target.value } : q
//     );
//     setQuestions(updatedQuestions);
//     // onQandAType(e.target.value);
//   };

//   const handleRemoveQuestion = (questionId) => {
//     const updatedQuestions = questions.filter((q) => q.id !== questionId);
//     setQuestions(updatedQuestions);
//   };

//   const handleAnswerChange = (e, questionId) => {
//     const updatedQuestions = questions.map((q) =>
//       q.id === questionId ? { ...q, answer: e.target.value } : q
//     );
//     setQuestions(updatedQuestions);
//   };

//   const handleQuestionSave = () => {
//     setExpanded(false);
//     setSaveClicked(true);
//     // Check if any question or answer is not blank
//     const hasNonBlankQandA = questions.some(
//       (question) =>
//         question.question.trim() !== "" || question.answer.trim() !== ""
//     );

//     if (hasNonBlankQandA) {
//       // Build the formatted questionDisplay content
//       const formattedQuestions = questions.map((question) => {
//         return `Q${question.id}:${question.question}\n A${question.id}:${question.answer}`;
//       });
//       // Join the formatted questions and answers with line breaks
//       const newQuestionDisplay = formattedQuestions.join("\n\n");
//       setQuestionDisplay([newQuestionDisplay]);
//       console.log("formValues:", {
//         qanda: newQuestionDisplay,
//       });
//     }
//   };
//   /*****Pricing  ***********/
//   /*****Pricing  ***********/
//   // Handle pricing input change
//   const handlePricingInputChange = (categoryID, value) => {
//     setPricingInputs((prevInputs) => ({
//       ...prevInputs,
//       [categoryID]: value,
//     }));
//   };
//   // Handle display status change
//   const handleDisplayChange = (categoryID, value) => {
//     setPricingDisplayStates((prevDisplayStates) => ({
//       ...prevDisplayStates,
//       [categoryID]: value ? 1 : 0,
//     }));
//     // setSelectedDisplayState(categoryID, value);
//   };

//   const handleAccomodationChange = (categoryID, value) => {
//     setAccomState((prevAccomStates) => ({
//       ...prevAccomStates,
//       [categoryID]: value,
//     }));
//   };

//   const handleCapacityChange = (categoryID, value) => {
//     setCapacity((prevInputs) => ({
//       ...prevInputs,
//       [categoryID]: value,
//     }));
//   };
//   const handleCocktailChange = (categoryID, value) => {
//     setCockTail((prevInputs) => ({
//       ...prevInputs,
//       [categoryID]: value,
//     }));
//   };
//   const handleSeatedStyleChange = (categoryID, value) => {
//     setSeated((prevInputs) => ({
//       ...prevInputs,
//       [categoryID]: value,
//     }));
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

//   const handlePricingSubmit = () => {
//     setSaveClicked(true);
//     setExpanded(false);

//     // Create the output object
//     const newFormValues = {};
//     viewProfile.Category.forEach((category) => {
//       const categoryId = category.Categoryid;
//       newFormValues[categoryId] = {
//         display_price: pricingDisplayStates[categoryId] === 1 ? "1" : "0",
//         pricepp: pricingInputs[categoryId] || "0",
//         accomodation: accomState[categoryId] === 1 ? "1" : "0",
//         capacity: capacity[categoryId] || "0",
//         cockTail: cockTail[categoryId] || "0",
//         seated: seated[categoryId] || "0",
//       };
//     });

//     // Set formValues state
//     setPFormValues(newFormValues);

//     // Log the formValues
//     console.log("Formvalues:", newFormValues);

//     // Update business profile
//     BusinessJS.updateBusinessMyProfile(
//       newFormValues,
//       vendorID,
//       3,
//       setInputsErrors,
//       setVendorInputs
//     );
//   };

//   const handleInclusionSubmit = () => {
//     setSaveClicked(true);
//     setExpanded(false);

//     console.log("Selected Inclusions:", selectedInclusions);
//   };

//   return (
//     <div className="preview-listing-container">
//       {/* <pre>{JSON.stringify(previewListing, null, 2)}</pre> */}

//       {/* PROFILE BASICS */}
//       <div>
//         <div className="preview-listing-div">
//           <h4 className="font-bold">Preview Listing</h4>
//         </div>
//       </div>

//       <div className="mb-[1rem]"></div>
//       <>
//         <h2 className="profile-listing-header">Profile Basics</h2>
//       </>

//       <div>
//         <div className="grid grid-cols-1">
//           {/* QUICK DESCRPTION */}
//           <div>
//             {previewListing ? (
//               <StyledAccordion
//                 expanded={expanded === "panel1"}
//                 onChange={(e, isExpanded) => handleChange(isExpanded, "panel1")}
//               >
//                 <AccordionSummary
//                   style={{
//                     paddingLeft:
//                       expanded === "panel1"
//                         ? isScreenSizeAbove1250px
//                           ? "2rem"
//                           : "1rem"
//                         : "0",
//                     paddingRight:
//                       expanded === "panel1"
//                         ? isScreenSizeAbove1250px
//                           ? "2rem"
//                           : "1rem"
//                         : "1rem",
//                   }}
//                   id="panel1-header"
//                   aria-controls="panel1-content"
//                   expandIcon={
//                     <Typography
//                       sx={{
//                         color: "black",
//                         fontFamily: "inherit",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                       }}
//                     >
//                       {expanded === "panel1" ? (
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
//                     <h4
//                       style={{
//                         fontWeight: expanded === "panel1" ? "bold" : "normal",
//                       }}
//                     >
//                       Quick Description
//                     </h4>
//                     {saveClicked &&
//                     vendorinputs.profile_short_desc &&
//                     !expanded === "panel1" ? (
//                       <p className="myprofile-accordion-subheading">
//                         {vendorinputs.profile_short_desc}
//                       </p>
//                     ) : (
//                       <p className="myprofile-accordion-subheading">
//                         {expanded === "panel1"
//                           ? "Display a quick summary of your business. Tip includes what your service is and your location."
//                           : previewListing
//                           ? previewListing.profile_short_desc
//                           : "Display a quick summary of your business. Tip includes what your service is and your location."}
//                       </p>
//                     )}
//                   </div>
//                 </AccordionSummary>
//                 <AccordionDetails
//                   style={{
//                     paddingLeft:
//                       expanded === "panel1"
//                         ? isScreenSizeAbove1250px
//                           ? "2rem"
//                           : "1rem"
//                         : "0",
//                   }}
//                 >
//                   <div>
//                     <div className="myprofile-accordion-item-header"></div>
//                     <div className="mt-[0px]">
//                       <div className="profile-editor-position">
//                         <textarea
//                           name="profile_short_desc"
//                           id="text-area"
//                           // value={quickText}
//                           value={quickText || previewListing.profile_short_desc}
//                           onChange={handleQuickTexChange}
//                           className="myprofile-textarea-style"
//                         />

//                         <span className="text-[12px] mt-[5px]">
//                           {wordCount >= 100 ? (
//                             <p className="text-red-500 text-[12px] mt-2">
//                               Limit exceeded (100 words maximum)
//                             </p>
//                           ) : (
//                             `${wordCount}/100`
//                           )}
//                         </span>
//                         <div className="myprofile-button-group">
//                           <button
//                             className="myprofile-cancel-button"
//                             onClick={handleCancel}
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             className="myprofile-save-button"
//                             onClick={handleSubmit}
//                           >
//                             Save
//                           </button>
//                         </div>
//                       </div>
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
//           {/* Full desc */}
//           <div>
//             {previewListing ? (
//               <StyledAccordion
//                 expanded={expanded === "panel2"}
//                 onChange={(e, isExpanded) => handleChange(isExpanded, "panel2")}
//               >
//                 <AccordionSummary
//                   style={{
//                     paddingLeft:
//                       expanded === "panel2"
//                         ? isScreenSizeAbove1250px
//                           ? "2rem"
//                           : "1rem"
//                         : "0",
//                   }}
//                   id="panel2-header"
//                   aria-controls="panel2-content"
//                   expandIcon={
//                     <Typography
//                       sx={{
//                         color: "black",
//                         fontFamily: "inherit",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                       }}
//                     >
//                       {expanded === "panel2" ? (
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
//                     {/* <h4 className="myprofile-heading-expand">Full Description</h4> */}
//                     <h4
//                       style={{
//                         fontWeight: expanded === "panel2" ? "bold" : "normal",
//                       }}
//                     >
//                       Full Description
//                     </h4>
//                     {saveClicked &&
//                     vendorinputs.profile_long_desc &&
//                     !expanded === "panel2" ? (
//                       <p className="myprofile-accordion-subheading">
//                         <div
//                           dangerouslySetInnerHTML={{
//                             __html: vendorinputs.profile_long_desc,
//                           }}
//                         />
//                       </p>
//                     ) : expanded === "panel2" ? (
//                       <p className="myprofile-accordion-subheading">
//                         Give couples a sense of what is included when they book
//                         [insert business name]. Include information such as
//                         locations, inclusions, starting prices etc.
//                       </p>
//                     ) : saveClicked && fullText ? (
//                       typeof fullText === "string" ? (
//                         <div dangerouslySetInnerHTML={{ __html: fullText }} />
//                       ) : (
//                         <p className="myprofile-accordion-subheading">
//                           {fullText}
//                         </p>
//                       )
//                     ) : (
//                       <p className="myprofile-accordion-subheading">
//                         {(
//                           <div
//                             dangerouslySetInnerHTML={{
//                               __html: previewListing.profile_long_desc,
//                             }}
//                           />
//                         ) ||
//                           "Give couples a sense of what is included when they book [insert business name]. Include information such as locations, inclusions, starting prices etc."}
//                       </p>
//                     )}

//                     {/* {expanded === "panel2" && previewListing && (
//                       <p className="myprofile-accordion-subheading">
//                         {previewListing.profile_long_desc}
//                       </p>
//                     )} */}
//                   </div>
//                 </AccordionSummary>
//                 <AccordionDetails
//                   style={{
//                     paddingLeft:
//                       expanded === "panel2"
//                         ? isScreenSizeAbove1250px
//                           ? "2rem"
//                           : "1rem"
//                         : "0",
//                   }}
//                 >
//                   <div>
//                     <div className="myprofile-accordion-item-header"></div>
//                     {/* Editor */}
//                     <div>
//                       <div className="bprofile-editor-container">
//                         <Editor
//                           editorState={editorState}
//                           onEditorStateChange={setEditorState}
//                           toolbar={toolbarOptions}
//                         />
//                       </div>
//                       <div
//                         className="hidden"
//                         dangerouslySetInnerHTML={createMarkup(convertedContent)}
//                       />
//                       <span className="text-[12px] mt-[5px]">
//                         {fulldesccount >= 500 ? (
//                           <p className="text-red-500 text-[12px] mt-2">
//                             Limit exceeded (500 words maximum)
//                           </p>
//                         ) : (
//                           `${fulldesccount}/500`
//                         )}
//                       </span>
//                     </div>
//                     <div className="mt-[0px]">
//                       <div className="profile-editor-position">
//                         <div className="myprofile-button-group">
//                           <button
//                             className="myprofile-cancel-button"
//                             onClick={handleCancel}
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             className="myprofile-save-button"
//                             onClick={handleFullSubmit}
//                           >
//                             Save
//                           </button>
//                         </div>
//                       </div>
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
//           {/* TEAM AND OWNER DETAILS*/}
//           <div>
//             <StyledAccordion
//               expanded={expanded === "panel3"}
//               onChange={(e, isExpanded) => handleChange(isExpanded, "panel3")}
//             >
//               <AccordionSummary
//                 style={{
//                   paddingLeft:
//                     expanded === "panel3"
//                       ? isScreenSizeAbove1250px
//                         ? "2rem"
//                         : "1rem"
//                       : "0",
//                 }}
//                 id="panel3-header"
//                 aria-controls="panel3-content"
//                 expandIcon={
//                   <Typography
//                     sx={{
//                       color: "black",
//                       fontFamily: "inherit",
//                       fontSize: "14px",
//                       fontWeight: "600",
//                     }}
//                   >
//                     {expanded === "panel3" ? (
//                       <RxTriangleUp size={30} color="#6cc2bc" />
//                     ) : (
//                       "Edit"
//                     )}
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
//                   <h4
//                     style={{
//                       fontWeight: expanded === "panel3" ? "bold" : "normal",
//                     }}
//                   >
//                     Meet the Owner/Team
//                   </h4>

//                   {saveClicked && !expanded ? (
//                     <>
//                       <p className="myprofile-accordion-subheading">
//                         {ownerContent}
//                       </p>
//                       <p className="myprofile-accordion-subheading">
//                         Type:{" "}
//                         {ownerRadioOption === 1
//                           ? "The Owner"
//                           : ownerRadioOption === 2
//                           ? "The Team"
//                           : "Other Type"}
//                       </p>
//                     </>
//                   ) : (
//                     <p className="myprofile-accordion-subheading">
//                       Add a personal touch by letting couples get to know you,
//                       add a photo, and let us know if you are a team or owner.
//                     </p>
//                   )}
//                 </div>
//               </AccordionSummary>
//               <AccordionDetails
//                 style={{
//                   paddingLeft:
//                     expanded === "panel3"
//                       ? isScreenSizeAbove1250px
//                         ? "2rem"
//                         : "1rem"
//                       : "0",
//                 }}
//               >
//                 <div>
//                   <div className="myprofile-accordion-item-header">
//                     {/* <span className="myprofile-edit-button">Edit</span> */}
//                   </div>
//                   <div className="mt-[0px]">
//                     <div className="profile-editor-position">
//                       <textarea
//                         name="owner-desc"
//                         id="text-area"
//                         value={ownerText}
//                         onChange={handleOwnerTextChange}
//                         className="myprofile-textarea-style"
//                       />

//                       <span className="text-[12px] mt-[5px]">
//                         {wordCount >= 100 ? (
//                           <p className="text-red-500 text-[12px] mt-2">
//                             Limit exceeded (100 words maximum)
//                           </p>
//                         ) : (
//                           `${wordCount}/100`
//                         )}
//                       </span>
//                       <div className="myprofile-radio-group">
//                         <div className="owner-radio-inputs mt-[15px] space-y-3 ">
//                           <h4 className="text-[#222222] font-semibold">
//                             Who are we getting to know?
//                           </h4>

//                           <div className="flex items-center ">
//                             <label className="space-x-2 flex items-center">
//                               <input
//                                 type="radio"
//                                 value="The Owner"
//                                 checked={ownerRadioOption === 1}
//                                 onChange={() => handleOwnerRadioChange(1)}
//                               />
//                               <span className="font-semibold">The Owner</span>
//                             </label>
//                           </div>

//                           <div>
//                             <label className="space-x-2 flex items-center">
//                               <input
//                                 type="radio"
//                                 value="The Team"
//                                 checked={ownerRadioOption === 2}
//                                 onChange={() => handleOwnerRadioChange(2)}
//                               />
//                               <span className="font-semibold">The Team</span>
//                             </label>
//                           </div>
//                         </div>
//                         <div className="mb-[2rem]">
//                           <Cropper
//                             onImageCrop={handleImageCrop}
//                             onChangeCrop={handleImageChange}
//                           />
//                         </div>
//                       </div>

//                       {/* Submit and CAncel buttons */}
//                       <div className="myprofile-button-group-2 ">
//                         <button
//                           className="myprofile-cancel-button"
//                           onClick={handleCancel}
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           className="myprofile-save-button"
//                           onClick={handleOwnerSubmit}
//                         >
//                           Save
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </AccordionDetails>
//             </StyledAccordion>
//           </div>

//           {/* PHOTO GALLERY */}
//           <h2 className="profile-listing-header">Photos/Videos</h2>
//           <div className="myprofilePhotos-accordion-item-header">
//             Photo Gallery
//           </div>
//           <div className="photos-subheading-text">
//             <span>Drag and drop your photos to change the order. </span>
//           </div>
//           <div className="mt-[1rem] ">
//             <PhotoGalleryTest vendorID={vendorID} />
//           </div>
//           <br />
//           <div className="myprofilePhotos-accordion-item-header">Videos</div>
//           <VideoGallery vendorID={vendorID} />
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
//                     {saveClicked && !expanded ? (
//                       <>
//                         {Object.keys(pformValues).map((categoryId) => (
//                           <div key={categoryId}>
//                             {pformValues[categoryId].display_price === "1" ? (
//                               <div className="myprofile-accordion-subheading">
//                                 <p>
//                                   Display Price:{" "}
//                                   {pformValues[categoryId].display_price === "1"
//                                     ? "Yes"
//                                     : "No"}
//                                 </p>
//                                 <p>
//                                   Price per Head:{" "}
//                                   {pformValues[categoryId].pricepp}
//                                 </p>
//                                 <p>
//                                   Accommodation:{" "}
//                                   {pformValues[categoryId].accomodation === "1"
//                                     ? "Yes"
//                                     : "No"}
//                                 </p>
//                                 <p>
//                                   Capacity: {pformValues[categoryId].capacity}
//                                 </p>
//                                 <p>
//                                   Cocktail: {pformValues[categoryId].cockTail}
//                                 </p>
//                                 <p>
//                                   Seated Style: {pformValues[categoryId].seated}
//                                 </p>
//                               </div>
//                             ) : (
//                               <p className="myprofile-accordion-subheading">
//                                 Display Price: No
//                               </p>
//                             )}
//                           </div>
//                         ))}
//                       </>
//                     ) : (
//                       // If not saved or not expanded, display the default comment
//                       <p className="myprofile-accordion-subheading">
//                         Add a Starting Price. It is not mandatory to display
//                         your prices.
//                       </p>
//                     )}
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
//                       viewProfile.Category.map((item) => (
//                         <div className="mt-[0px]" key={item.Categoryid}>
//                           <div>
//                             <div className="pricing-category-label-section">
//                               <span className="pricing-cate-label">
//                                 {" "}
//                                 {item.CategoryName}
//                               </span>
//                             </div>
//                             {/* pricing input */}
//                             <div className="mt-[10px] relative">
//                               <h5 className="font-semibold flex flex-col">
//                                 {/* {item.id === "Wedding_Venues"
//                             ? "Price per Head:"
//                             : "Starting Price:"} */}
//                                 Price per Head
//                               </h5>
//                               <div className="">
//                                 <span className="dollar-icon"></span>
//                                 <input
//                                   name="pricepp"
//                                   type="number"
//                                   required
//                                   className="pricing-input-style"
//                                   onChange={(e) =>
//                                     handlePricingInputChange(
//                                       item.Categoryid,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               </div>
//                             </div>
//                             {/* display price status */}
//                             <div className="myprofile-button-group relative">
//                               {/* quickdec-button-group */}
//                               <div className="mt-[15px]">
//                                 <h5 className="font-semibold">
//                                   Display Price ?
//                                 </h5>
//                                 <div className="mt-[10px] space-x-2">
//                                   <button
//                                     className={`yes-button ${
//                                       pricingDisplayStates[item.Categoryid]
//                                         ? "selected"
//                                         : ""
//                                     }`}
//                                     onClick={() =>
//                                       handleDisplayChange(item.Categoryid, 1)
//                                     }
//                                   >
//                                     Yes
//                                   </button>
//                                   <button
//                                     className={`no-button ${
//                                       pricingDisplayStates[item.Categoryid] ===
//                                       0
//                                         ? "selected"
//                                         : ""
//                                     }`}
//                                     onClick={() =>
//                                       handleDisplayChange(item.Categoryid, 0)
//                                     }
//                                   >
//                                     No
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                             {/* Additional */}
//                             {/* Accomodation Availability */}
//                             <div className="myprofile-button-group relative">
//                               <div className="mt-[15px]">
//                                 <h5 className="font-semibold">
//                                   Accomodation Availability
//                                 </h5>
//                                 <div className="mt-[15px] space-x-2">
//                                   <button
//                                     className={`yes-button ${
//                                       accomState[item.Categoryid]
//                                         ? "selected"
//                                         : ""
//                                     }`}
//                                     onClick={() =>
//                                       handleAccomodationChange(
//                                         item.Categoryid,
//                                         1
//                                       )
//                                     }
//                                   >
//                                     Yes
//                                   </button>
//                                   <button
//                                     className={`no-button ${
//                                       accomState[item.Categoryid] === 0
//                                         ? "selected"
//                                         : ""
//                                     }`}
//                                     onClick={() =>
//                                       handleAccomodationChange(
//                                         item.Categoryid,
//                                         0
//                                       )
//                                     }
//                                   >
//                                     No
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                             {/* Capacity */}
//                             <div className="pricing-addons-container">
//                               <div className="pricing-addon-label ">
//                                 <h5 className="l">Capacity:</h5>
//                               </div>
//                               <input
//                                 name="capacity"
//                                 type="number"
//                                 required
//                                 className="capacity-input-style"
//                                 onChange={(e) =>
//                                   handleCapacityChange(
//                                     item.Categoryid,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             </div>
//                             {/* Cocktail */}
//                             <div className="pricing-addons-container">
//                               <div className="pricing-addon-label ">
//                                 <h5 className="l">Cocktail:</h5>
//                               </div>
//                               <input
//                                 name="cockTail"
//                                 type="number"
//                                 required
//                                 className="capacity-input-style"
//                                 onChange={(e) =>
//                                   handleCocktailChange(
//                                     item.Categoryid,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             </div>
//                             {/* Seated Style */}
//                             <div className="pricing-addons-container">
//                               <div className="pricing-addon-label ">
//                                 <h5 className="l">Seated Style</h5>
//                               </div>
//                               <input
//                                 type="number"
//                                 required
//                                 className="capacity-input-style"
//                                 onChange={(e) =>
//                                   handleSeatedStyleChange(
//                                     item.Categoryid,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     <br />

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
//                     expanded={expanded === "venueAmenities"}
//                     onChange={(e, isExpanded) =>
//                       handleChange(isExpanded, "venueAmenities")
//                     }
//                   >
//                     <AccordionSummary
//                       style={{
//                         paddingLeft:
//                           expanded === "venueAmenities"
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
//                           {expanded === "venueAmenities" ? (
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
//                         {saveClicked && !expanded ? (
//                           <>
//                             {Object.entries(selectedInclusions).map(
//                               ([inchid, data]) => (
//                                 <p
//                                   key={inchid}
//                                   className="myprofile-accordion-subheading"
//                                 >
//                                   {data.incTitle}:{" "}
//                                   {Object.values(data.selectedValues).join(
//                                     ", "
//                                   )}
//                                 </p>
//                               )
//                             )}
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
//                           expanded === "venueAmenities"
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
//                                                   ]
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
//           {/* QandA */}
//           <StyledAccordion
//             expanded={expanded === "panel5"}
//             onChange={(e, isExpanded) => handleChange(isExpanded, "panel5")}
//           >
//             <AccordionSummary
//               style={{
//                 paddingLeft:
//                   expanded === "panel5"
//                     ? isScreenSizeAbove1250px
//                       ? "2rem"
//                       : "1rem"
//                     : "0",
//               }}
//               id="panel5-header"
//               aria-controls="panel5-content"
//               expandIcon={
//                 <Typography
//                   sx={{
//                     color: "black",
//                     fontFamily: "inherit",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {expanded === "panel5" ? (
//                     <RxTriangleUp size={30} color="#6cc2bc" />
//                   ) : (
//                     "Edit"
//                   )}
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
//                 <h4 className="profile-listing-header">Q&A</h4>
//                 {saveClicked && questionDisplay.length > 0 && !expanded ? (
//                   <p className="whitespace-break-spaces mt-[10px]">
//                     {questionDisplay}
//                   </p>
//                 ) : expanded || questionDisplay.length > 0 ? null : (
//                   <p className="myprofile-accordion-subheading">
//                     Add the most common Q&A your business is asked, this helps
//                     couples get to know you further.
//                   </p>
//                 )}
//               </div>
//             </AccordionSummary>
//             <AccordionDetails
//               style={{
//                 paddingLeft:
//                   expanded === "panel5"
//                     ? isScreenSizeAbove1250px
//                       ? "2rem"
//                       : "1rem"
//                     : "0",
//               }}
//             >
//               <div>
//                 <div className="myprofile-accordion-item-header"></div>
//                 <div className="mt-[0px]">
//                   <div className="QandA-panel-container">
//                     <p className="whitespace-break-spaces">
//                       Add up to 5 common questions [businessname] is asked.
//                     </p>
//                     {questions.map((question, index) => (
//                       <div key={question.id}>
//                         <div className="mt-[15px] space-y-1">
//                           <span className="font-semibold">
//                             Question ({index + 1})
//                           </span>
//                           <br />
//                           <div className="">
//                             <input
//                               className="question-input-style"
//                               placeholder="Maximum 50 characters"
//                               value={question.question}
//                               onChange={(e) => {
//                                 handleQandAWordCount(e.target.value);
//                                 handleQuestionChange(e, question.id);
//                               }}
//                             />
//                             {qandaWordCountError && (
//                               <p className="error">Max word limit: 50 words</p>
//                             )}
//                             <div className="qandA-delete-button ">
//                               <button
//                                 className="remove-question-button"
//                                 onClick={() =>
//                                   handleRemoveQuestion(question.id)
//                                 }
//                               >
//                                 <DeleteForeverIcon />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="mt-[15px] space-y-1">
//                           <span className="font-semibold">
//                             Answer ({index + 1})
//                           </span>
//                           <br />
//                           <textarea
//                             className="answer-input-style"
//                             value={question.answer}
//                             onChange={(e) => handleAnswerChange(e, question.id)}
//                           />
//                         </div>
//                       </div>
//                     ))}

//                     <div className="myprofile-button-group relative">
//                       <button
//                         className="question-cancel-button"
//                         onClick={addQuestion}
//                       >
//                         Add a question
//                       </button>
//                       <button
//                         className="myprofile-save-button"
//                         onClick={handleQuestionSave}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </AccordionDetails>
//           </StyledAccordion>
//           {/* PACKAGES */}
//           <div>
//             {viewProfile ? (
//               <StyledAccordion
//                 expanded={expanded === "panel6"}
//                 onChange={(e, isExpanded) => handleChange(isExpanded, "panel6")}
//               >
//                 <AccordionSummary
//                   style={{
//                     paddingLeft:
//                       expanded === "panel6"
//                         ? isScreenSizeAbove1250px
//                           ? "2rem"
//                           : "1rem"
//                         : "0",
//                   }}
//                   id="panel6-header"
//                   aria-controls="panel6-content"
//                   expandIcon={
//                     <Typography
//                       sx={{
//                         color: "black",
//                         fontFamily: "inherit",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                       }}
//                     >
//                       {expanded === "panel6" ? (
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
//                     <h4 className="profile-listing-header">Packages</h4>

//                     <div className="myprofile-accordion-subheading-pricing">
//                       <>
//                         {" "}
//                         {viewProfile.package_file ||
//                         (uploadedFileName && saveClicked)
//                           ? "Package Updated: Yes"
//                           : "Package Updated: No"}
//                       </>

//                       <br />
//                       <br />
//                     </div>
//                   </div>
//                 </AccordionSummary>
//                 <AccordionDetails
//                   style={{
//                     paddingLeft:
//                       expanded === "panel6"
//                         ? isScreenSizeAbove1250px
//                           ? "2rem"
//                           : "1rem"
//                         : "0",
//                   }}
//                 >
//                   <div>
//                     <div className="myprofile-accordion-item-header">
//                       {/* <span className="myprofile-edit-button">Edit</span> */}
//                     </div>
//                     <div className="package-panel-container">
//                       <div>
//                         <span className="text-[14px] mt-[10px]">
//                           Add a PDF file, maximum 5MB. You are responsible to
//                           ensure the information in your PDF is up to date.
//                         </span>
//                       </div>
//                       <br />

//                       <div className="flex justify-start items-center gap-[1rem]">
//                         <label
//                           htmlFor="upload-files"
//                           className="text-[14px] cursor-pointer"
//                         >
//                           {uploadedFileName
//                             ? `File Uploaded: ${uploadedFileName}`
//                             : viewProfile.package_file}
//                         </label>
//                         {(viewProfile.package_file ||
//                           (uploadedFileName && saveClicked)) && (
//                           <>
//                             <NavLink to={viewFile.packageFile} title="View">
//                               <HiOutlineViewfinderCircle size={24} />
//                             </NavLink>
//                             <button title="Delete" onClick={deletePackage}>
//                               <MdDelete size={24} />
//                             </button>
//                           </>
//                         )}
//                       </div>

//                       <div className="myprofile-button-group relative">
//                         <div className="">
//                           <div className="packages-upload-button ">
//                             <input
//                               type="file"
//                               id="upload-files"
//                               className="hidden"
//                               onChange={handleFileChange}
//                             />
//                             <label
//                               htmlFor="upload-files"
//                               className="text-[14px] cursor-pointer"
//                             >
//                               Upload{" "}
//                             </label>
//                             <span className="package-upload-icons">
//                               <BiUpload />
//                             </span>
//                           </div>
//                         </div>
//                         <button
//                           className="myprofile-save-button"
//                           onClick={handlePackageSubmit}
//                         >
//                           Save
//                         </button>
//                       </div>
//                       <div id="displayText"></div>
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
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
