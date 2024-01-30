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
// import PhotoGalleryTest from "../../pages - Copy/My Profile/photos&videos/MyProfile-PhotoUplaoder/PhotoGalleryTest";
// import VideoGallery from "../../pages - Copy/My Profile/photos&videos/myProfileVideo";
// import { StyledAccordion } from "../../components/FormStyle";
// import * as BusinessJS from "../Business/Business";
// import Skeleton from "@mui/material/Skeleton";
// import { Preview } from "@mui/icons-material";

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
//   // const [draftText, setDraftText] = useState("");
//   const [quickText, setQuickText] = useState("");
//   const [saveClicked, setSaveClicked] = useState(false);
//   const [wordCount, setWordCount] = useState(0);
//   const [inputsErrors, setInputsErrors] = useState({});
//   // const [dataSet, setDataSet] = useState(false);
//   const [previewSet, setpreviewSet] = useState(false);
//   // Full desc
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );
//   const [convertedContent, setConvertedContent] = useState(null);
//   const [fullText, setFullText] = useState(vendorinputs.profile_long_desc);
//   const [fulldesccount, setFulldesccount] = useState(0);

//   // expansion handling
//   const handleChange = (isExpanded: boolean, panel: string) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   //preview listing
//   useEffect(() => {
//     const fetchData = async () => {
//       // console.log("Fetching data...");
//       await BusinessJS.fetchbusiness(setVendorInputs, setpreviewSet);
//       // console.log("Vendor ID:", vendorID);

//       if (vendorID) {
//         await BusinessJS.vendorView(setPreviewListing, vendorID, setpreviewSet);
//         // console.log(
//         //   "Previewlisting short desc:",
//         //   previewListing.profile_short_desc
//         // );
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

//   // Full desc
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
//   return (
//     <div className="preview-listing-container">
//       {/* <pre>{JSON.stringify(vendorinputs, null, 2)}</pre> */}

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
        
//           {/* Full desc */}
//           <StyledAccordion
//             expanded={expanded === "panel2"}
//             onChange={(e, isExpanded) => handleChange(isExpanded, "panel2")}
//           >
//             <AccordionSummary
//               style={{
//                 paddingLeft:
//                   expanded === "panel2"
//                     ? isScreenSizeAbove1250px
//                       ? "2rem"
//                       : "1rem"
//                     : "0",
//               }}
//               id="panel2-header"
//               aria-controls="panel2-content"
//               expandIcon={
//                 <Typography
//                   sx={{
//                     color: "black",
//                     fontFamily: "inherit",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {expanded === "panel2" ? (
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
//                 {/* <h4 className="myprofile-heading-expand">Full Description</h4> */}
//                 <h4
//                   style={{
//                     fontWeight: expanded === "panel2" ? "bold" : "normal",
//                   }}
//                 >
//                   Full Description
//                 </h4>
//                 {saveClicked && fullText.length > 0 && !expanded ? (
//                   <p className="myprofile-accordion-subheading">{fullText}</p>
//                 ) : (
//                   <p className="myprofile-accordion-subheading">
//                     Give couples a sense of what is included when they book
//                     [insert business name]. Include information such as
//                     locations, inclusions, starting prices etc.
//                   </p>
//                 )}
//               </div>
//             </AccordionSummary>
//             <AccordionDetails
//               style={{
//                 paddingLeft:
//                   expanded === "panel2"
//                     ? isScreenSizeAbove1250px
//                       ? "2rem"
//                       : "1rem"
//                     : "0",
//               }}
//             >
//               <div>
//                 <div className="myprofile-accordion-item-header"></div>
//                 {/* Editor */}
//                 <div>
//                   <div className="bprofile-editor-container">
//                     <Editor
//                       editorState={editorState}
//                       onEditorStateChange={setEditorState}
//                       toolbar={toolbarOptions}
//                     />
//                   </div>
//                   <div
//                     className="hidden"
//                     dangerouslySetInnerHTML={createMarkup(convertedContent)}
//                   />
//                   <span className="text-[12px] mt-[5px]">
//                     {fulldesccount >= 500 ? (
//                       <p className="text-red-500 text-[12px] mt-2">
//                         Limit exceeded (500 words maximum)
//                       </p>
//                     ) : (
//                       `${fulldesccount}/500`
//                     )}
//                   </span>
//                 </div>
//                 <div className="mt-[0px]">
//                   <div className="profile-editor-position">
//                     <div className="myprofile-button-group">
//                       <button
//                         className="myprofile-cancel-button"
//                         onClick={handleCancel}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         className="myprofile-save-button"
//                         onClick={handleSubmit}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </AccordionDetails>
//           </StyledAccordion>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
