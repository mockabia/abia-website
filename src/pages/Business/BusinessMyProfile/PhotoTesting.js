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
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

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
//   const [viewQandA, setViewQandA] = useState({});
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
//     BusinessJS.viewVendorQandA(vendorID, setViewQandA);
//   }, [vendorID]);
//   console.log("View Qanda:", viewQandA);

//   useEffect(() => {
//     setOwnerImage(viewProfile.teamownerpic || "");
//     setDefaultcontent(viewProfile.team_owner_details);
//   }, [viewProfile]);
//   console.log("Team owner detail:", viewProfile.team_owner_details);

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
//     setFileUploaded(false);
//     setUploadedFileName("");
//   };
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
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
