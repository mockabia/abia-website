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

// const Profile = ({ preview }) => {
//   const [viewProfile, setViewProfile] = useState("");

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
//   const [questionDisplay, setQuestionDisplay] = useState([]);
//   const [qwordCount, setQwordCount] = useState(0);
//   const [qandaWordCountError, setqandaWordCountError] = useState(false);
//   // const [inputsErrors, setInputsErrors] = useState({});
//   const [questionRes, setQuestionRes] = useState({});
//   const [deleteQA, setDeleteQA] = useState("");
//   const [viewQandA, setViewQandA] = useState([]);
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

//   // viewprofile
//   useEffect(() => {
//     BusinessJS.viewProfileSettings(vendorID, setViewProfile);
//     console.log("View profile:", viewProfile);
//   }, [vendorID]);

//   useEffect(() => {
//     if (vendorID) {
//       BusinessJS.viewVendorQandA(vendorID, setViewQandA);
//     }
//   }, [vendorID]);

//   console.log("View Qanda:", viewQandA);
//   useEffect(() => {
//     setOwnerImage(viewProfile.teamownerpic || "");
//     setDefaultcontent(viewProfile.team_owner_details);
//   }, [viewProfile]);
//   // console.log("Team owner detail:", viewProfile.team_owner_details);

//   //*****Q and A ***********/
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
//   // DELETE Q AND A
//   const handleRemoveQuestion = (questionId) => {
//     const updatedQuestions = questions.filter((q) => q.id !== questionId);
//     setQuestions(updatedQuestions);
//     handleRemoveQuestionFunction(questionId);
//   };
//   //
//   const handleRemoveQuestionFunction = (qid) => {
//     const updatedQuestions = questions.filter((q) => q.id !== qid);
//     setQuestions(updatedQuestions);
//     const formValues = updatedQuestions.map((question) => {
//       return {
//         qid: question.id,
//         vid: vendorID,
//         question: question.question,
//         answer: question.answer,
//       };
//     });
//     const formattedQuestions = formValues
//       .map(
//         (question) =>
//           `${question.qid}: ${question.question}\n${question.qid}: ${question.answer}`
//       )
//       .join("\n\n");
//     setQuestionDisplay([formattedQuestions]);
//     BusinessJS.V_deeleteQA(vendorID, qid, setDeleteQA);
//   };

//   const handleAnswerChange = (e, questionId) => {
//     e.preventDefault();
//     const updatedQuestions = questions.map((q) =>
//       q.id === questionId ? { ...q, answer: e.target.value } : q
//     );
//     setQuestions(updatedQuestions);
//   };

//   const handleQuestionSubmit = async () => {
//     setExpanded(false);
//     setSaveClicked(true);

//     // Check if any question or answer is not blank
//     const hasNonBlankQandA = questions.some(
//       (question) =>
//         question.question.trim() !== "" || question.answer.trim() !== ""
//     );

//     if (hasNonBlankQandA) {
//       // Build the formatted questionDisplay content
//       const formValues = questions.map((question) => {
//         return {
//           qid: question.id,
//           vid: vendorID,
//           question: question.question,
//           answer: question.answer,
//         };
//       });
//       BusinessJS.updateQandAProfile(
//         formValues,
//         vendorID,
//         7,
//         setInputsErrors,
//         setQuestionRes
//       );
//       // Format to Display in the Accordion Summary
//       const formattedQuestions = formValues
//         .map(
//           (question) =>
//             `${question.qid}: ${question.question}\n${question.qid}: ${question.answer}`
//         )
//         .join("\n\n");

//       setQuestionDisplay([formattedQuestions]);
//       // console.log("Display question :", {
//       //   formValues,
//       // });
//     }
//   };

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
//                 {saveClicked && questionDisplay && !expanded ? (
//                   <div className="whitespace-break-spaces mt-[10px]">
//                     {questionDisplay}
//                   </div>
//                 ) : expanded ||
//                   (questionDisplay && questionDisplay.length > 0) ? null : (
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
//                         onClick={handleQuestionSubmit}
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
