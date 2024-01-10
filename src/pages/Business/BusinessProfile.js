import React, { useState, useEffect } from "react";
import "../Style/BusinessProfile.css";
// Accordion
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RxTriangleUp } from "react-icons/rx";
import { BorderBottom } from "@mui/icons-material";
import DraftJsEditor2 from "../../components/Editor/DraftJsEditor2";
// import DraftEditor from "../../third-party-packs/Editor-Draft/DraftEditor";
import PreviewListing2 from "../../pages - Copy/MyProfile2/PreviewLisitng2";
// Editor
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Cropper from "../../components/Cropper";
import ImageUploader from "../../components/ImageUploader";
// packages
import { BiUpload } from "react-icons/bi";
import PhotoGalleryTest from "../../pages - Copy/My Profile/photos&videos/MyProfile-PhotoUplaoder/PhotoGalleryTest";
import VideoGallery from "../../pages - Copy/My Profile/photos&videos/myProfileVideo";
import { StyledAccordion } from "../../components/FormStyle";
import * as BusinessJS from "./Business";

const toolbarOptions = {
  options: ["inline", "list"],
  inline: {
    options: ["bold", "italic"],
  },
  list: {
    options: ["unordered", "ordered"],
  },
};

const dynamicFields = [
  {
    id: "first_category_val",
    label: "First Category",
  },
  {
    id: "other_category",
    label: "Other Category",
    subFields: [
      {
        id: "label",
        label: "Label",
      },
      // Add more subfields as needed
    ],
  },
  {
    id: "Wedding_Venues",
    label: "Wedding Venues",
  },
  // Add more dynamic fields as needed
];

const Profile = ({ preview }) => {
  const [expanded, setExpanded] = useState(false);
  const [draftText, setDraftText] = useState("");
  const [quickText, setQuickText] = useState("");
  const [saveClicked, setSaveClicked] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  // Editor
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [fullText, setFullText] = useState(null);
  const [fullDescContent, setFullDescContent] = useState(false);
  // Owner and Team
  const [ownerText, setOWnerText] = useState("");
  const [ownerContent, setOwnerContent] = useState("");
  const [ownerRadioOption, setOwnerRadioOption] = useState("The Owner");
  const [croppedImage, setCroppedImage] = useState("");
  //Pricing
  const [amount, setAmount] = useState("");
  const [displayPrice, setDisplayPrice] = useState(false);
  const [displayStates, setDisplayStates] = useState({});
  const [accomodatiion, setAccomodatiion] = useState({});
  const [capacity, setCapacity] = useState("");
  const [cocktail, setCocktail] = useState("");
  const [seatedStyle, setSeatedStyle] = useState("");
  const [venueAmenities, setVenueAmmenities] = useState([]);

  //Qand A
  const [questions, setQuestions] = useState([
    { id: 1, question: "", answer: "" },
  ]);
  const [questionDisplay, setQuestionDisplay] = useState([]);
  // PACKAGES
  const [fileUploaded, setFileUploaded] = useState(false);
  const [packagesText, setPackagesText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [dataSet, setDataSet] = useState(false);
  const [inputs, setInputs] = useState({});

  // console.log("Inputs:", inputs);
  // pricing
  useEffect(() => {
    // Initialize display states for each dynamic field
    const initialDisplayStates = {};
    dynamicFields.forEach((field) => {
      initialDisplayStates[field.id] = false;
    });
    setDisplayStates(initialDisplayStates);
    setAccomodatiion(initialDisplayStates);
  }, []);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    setFullText(
      <div dangerouslySetInnerHTML={createMarkup(convertedContent)} />
    );
  }, [editorState, convertedContent]);

  /********************************************************8****** */

  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleQuickTexChange = (e) => {
    const inputText = e.target.value;
    const currentWordCount = inputText.split(/\s+/).filter(Boolean).length;

    if (currentWordCount <= 100) {
      setDraftText(inputText);
      setWordCount(currentWordCount);
    }
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleSubmit = () => {
    setExpanded(false);
    setSaveClicked(true);
    setQuickText(draftText);
    // setDraftText(""); // Reset the textarea
    // setWordCount(0);
    console.log("formValues:", {
      "quick-desc": quickText,
    });
  };

  const handleFullDescSubmit = () => {
    setExpanded(false);
    setSaveClicked(true);
    const htmlContent = convertToHTML(editorState.getCurrentContent());
    const plainTextContent = stripHtmlTags(htmlContent);
    setFullText(plainTextContent);
    // setDraftText(""); // Reset the textarea
    // setWordCount(0);
    console.log("formValues:", {
      "quick-desc": quickText,
      "full-desc": plainTextContent,
    });
  };

  const handleOwnerSubmit = () => {
    setExpanded(false);
    setSaveClicked(true);
    setOwnerContent(ownerText);
    console.log("formValues:", {
      "owner-desc": ownerText,
      "owner-type": ownerRadioOption,
      "owner-image": croppedImage,
    });
  };
// QandA submit
 const handleQuestionSave = () => {
   setExpanded(false);
   setSaveClicked(true);
   // Check if any question or answer is not blank
   const hasNonBlankQandA = questions.some(
     (question) =>
       question.question.trim() !== "" || question.answer.trim() !== ""
   );

   if (hasNonBlankQandA) {
     // Build the formatted questionDisplay content
     const formattedQuestions = questions.map((question) => {
       return `Q${question.id}:${question.question}\n A${question.id}:${question.answer}`;
     });
     // Join the formatted questions and answers with line breaks
     const newQuestionDisplay = formattedQuestions.join("\n\n");
     setQuestionDisplay([newQuestionDisplay]);
     console.log("formValues:", {
       qanda: newQuestionDisplay,
     });
   }
 };

  const handlePackageSubmit = () => {
    if (fileUploaded) {
      setPackagesText("Package Updated: Yes");
    } else {
      setPackagesText("Package Updated: No");
    }
    console.log("formValues:", {
      package: fileUploaded,
    });
  };

  const handleCancel = () => {
    setExpanded(false);
    // setDraftText("");
    setWordCount(0);
  };

  /**************Editor *******/
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  /*****PRICING***************** */

  const handleInputChange = (fieldId, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldId]: value,
    }));
  };
  const handlePricingInputsChange = (fieldId, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldId]: value,
    }));
  };
  const handleCapacityChange = (fieldId, value) => {
    setCapacity(value);
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldId]: value,
    }));
  };
  const handleCocktailChange = (fieldId, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldId]: value,
    }));
    setCocktail(value);
  };
  const handleSeatedStyleChange = (fieldId, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldId]: value,
    }));
    setSeatedStyle(value);
  };

  const handleDisplayChange = (fieldId, value) => {
    setDisplayStates((prevDisplayStates) => ({
      ...prevDisplayStates,
      [fieldId]: value,
    }));
  };
  const handleAccomodationChange = (fieldId, value) => {
    setAccomodatiion((prevAccomStates) => ({
      ...prevAccomStates,
      [fieldId]: value,
    }));
  };
  const handleVenueAmenitiesChange = (e, index) => {
    const value = dynamicFields[index].id;
    setVenueAmmenities((prevVenueAmmenities) => {
      if (prevVenueAmmenities.includes(value)) {
        return prevVenueAmmenities.filter((amenities) => amenities !== value);
      } else {
        return [...prevVenueAmmenities, value];
      }
    });
  };
  const handlePricingSubmit = () => {
    setExpanded(false);
    setSaveClicked(true);

    // Log values of state variables
    console.log("Capacity:", capacity);
    console.log("Cocktail:", cocktail);
    console.log("Seated Style:", seatedStyle);
    console.log("Venue Amenities:", venueAmenities);

    const formData = dynamicFields.reduce((acc, field) => {
      const fieldName = field.id;
      const fieldPrice = inputs[fieldName] || "";
      const fieldDisplayStatus = displayStates[fieldName] ? "Yes" : "No";

      return {
        ...acc,
        [fieldName]: fieldPrice,
        [`display_${fieldName}`]: fieldDisplayStatus,
      };
    }, {});

    console.log("formValues:", formData);
  };

  // console.log("Draft Editor content:", fullText);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }
  /********Meet the Team ********* */
  const handleOwnerTextChange = (e) => {
    const inputText = e.target.value;
    const currentWordCount = inputText.split(/\s+/).filter(Boolean).length;

    if (currentWordCount <= 100) {
      setOWnerText(inputText);
      setWordCount(currentWordCount);
    }
  };

  const handleOwnerRadioChange = (value) => {
    setOwnerRadioOption(value);
  };
  useEffect(() => {
    // console.log("Radio option:", ownerRadioOption);
  }, [ownerRadioOption]);

  const handleImageCrop = (images) => {
    // console.log("ImageUrl:", images.imageUrl);
    // console.log("Cropped image:", images.thumbUrl);
    // console.log("Cropped thumbnail:", images.iconUrl);
  };

  const handleImageChange = (thumbUrl) => {
    setCroppedImage(thumbUrl);
  };

  /******Question and Answer *************/

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, question: "", answer: "" }]);
  };

  const handleQuestionChange = (e, questionId) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, question: e.target.value } : q
    );
    setQuestions(updatedQuestions);
    // onQandAType(e.target.value);
  };

  const handleAnswerChange = (e, questionId) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, answer: e.target.value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (questionId) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(updatedQuestions);
  };

  
  /*******PACKAGES*******8 */
  const handleFileChange = (e) => {
    const fileInput = e.target;

    if (fileInput.files.length > 0) {
      const uploadedFile = fileInput.files[0];
      setUploadedFileName(uploadedFile.name);
      setFileUploaded(true);
    } else {
      setFileUploaded(false);
      setUploadedFileName("");
    }

    // Log the fileUploaded status and filename to the console
    console.log("File Uploaded Status:", fileUploaded);
    console.log("Uploaded Filename:", uploadedFileName);
  };

  // console.log("this is the Cropped image:", croppedImage);
  /**************************************** ***********************************/
  useEffect(() => {
    // BusinessJS.fetchbusiness(setInputs, setDataSet);
  }, []);

  // Log the selected value to the console
  // console.log(`Field ${fieldId} - Display Price: ${value ? "Yes" : "No"}`);

  return (
    <div className="preview-listing-container">
      <div className="preview-lisitng-div">
        <h3>Preview Lisitng</h3>
      </div>
      {/* PROFILE BASICS */}
      {/* <pre>{JSON.stringify(inputs, null, 2)}</pre> */}
      <div>
        <div className="mb-[1rem]">
          <h2 className="profile-listing-header">Profile Basics</h2>
        </div>
        <div className="grid grid-cols-1">
          {/* QUICK DESCRPTION */}
          <StyledAccordion
            expanded={expanded === "panel1"}
            onChange={(e, isExpanded) => handleChange(isExpanded, "panel1")}
          >
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Typography>
              }
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(0deg)",
                  color: "black",
                },
              }}
            >
              <div>
                <h4 style={{ fontWeight: expanded ? "bold" : "normal" }}>
                  Quick Description
                </h4>
                {saveClicked && quickText.length > 0 && !expanded ? (
                  <p className="myprofile-accordion-subheading">{quickText}</p>
                ) : (
                  <p className="myprofile-accordion-subheading">
                    Display a quick summary of your business. Tip include what
                    your service is and your location.
                  </p>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="myprofile-accordion-item-header"></div>
                <div className="mt-[0px]">
                  <div className="profile-editor-position">
                    <textarea
                      name="quick-desc"
                      id="text-area"
                      value={draftText}
                      onChange={handleQuickTexChange}
                      className="myprofile-textarea-style"
                    />

                    <span className="text-[12px] mt-[5px]">
                      {wordCount >= 100 ? (
                        <p className="text-red-500 text-[12px] mt-2">
                          Limit exceeded (100 words maximum)
                        </p>
                      ) : (
                        `${wordCount}/100`
                      )}
                    </span>
                    <div className="myprofile-button-group">
                      <button
                        className="myprofile-cancel-button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="myprofile-save-button"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
          {/* Full DESCRPTION */}
          <StyledAccordion
            expanded={expanded === "panel2"}
            onChange={(e, isExpanded) => handleChange(isExpanded, "panel2")}
          >
            <AccordionSummary
              id="panel2-header"
              aria-controls="panel2-content"
              expandIcon={
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Typography>
              }
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(0deg)",
                  color: "black",
                },
              }}
            >
              <div>
                {/* <h4 className="myprofile-heading-expand">Full Description</h4> */}
                <h4 style={{ fontWeight: expanded ? "bold" : "normal" }}>
                  Full Description
                </h4>
                {saveClicked && fullText.length > 0 && !expanded ? (
                  <p className="myprofile-accordion-subheading">{fullText}</p>
                ) : (
                  <p className="myprofile-accordion-subheading">
                    Give couples a sense of what is included when they book
                    [insert business name]. Include information such as
                    locations, inclusions, starting prices etc.
                  </p>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="myprofile-accordion-item-header">
                  {/* <span className="myprofile-edit-button">Edit</span> */}
                  {/* <RxTriangleUp size={30} className="myprofile-up-aroww" /> */}
                </div>
                {/* Editor */}
                {/* <DraftJsEditor2 /> */}
                <div>
                  <div className="bprofile-editor-container">
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      toolbar={toolbarOptions}
                    />
                    {/* {convertedContent}
                    {fullText} */}
                  </div>
                  <div
                    className="hidden"
                    dangerouslySetInnerHTML={createMarkup(convertedContent)}
                  />
                </div>
                <div className="mt-[0px]">
                  <div className="profile-editor-position">
                    <div className="myprofile-button-group">
                      <button
                        className="myprofile-cancel-button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="myprofile-save-button"
                        onClick={handleFullDescSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
          {/* TEAM AND MEMBERS DETAILS*/}
          <StyledAccordion
            expanded={expanded === "panel3"}
            onChange={(e, isExpanded) => handleChange(isExpanded, "panel3")}
          >
            <AccordionSummary
              id="panel3-header"
              aria-controls="panel3-content"
              expandIcon={
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Typography>
              }
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(0deg)",
                  color: "black",
                },
              }}
            >
              <div>
                <h4 style={{ fontWeight: expanded ? "bold" : "normal" }}>
                  Meet the Owner/Team
                </h4>
                {saveClicked && ownerContent.length > 0 && !expanded ? (
                  <>
                    <p className="myprofile-accordion-subheading">
                      {ownerContent}
                    </p>
                    <p className="myprofile-accordion-subheading">
                      Type: {ownerRadioOption}
                    </p>
                  </>
                ) : (
                  <p className="myprofile-accordion-subheading">
                    Add a personal touch by letting couples get to know you, add
                    a photo and let us know if you are a team or owner.
                  </p>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="myprofile-accordion-item-header">
                  {/* <span className="myprofile-edit-button">Edit</span> */}
                </div>
                <div className="mt-[0px]">
                  <div className="profile-editor-position">
                    <textarea
                      name="owner-desc"
                      id="text-area"
                      value={ownerText}
                      onChange={handleOwnerTextChange}
                      className="myprofile-textarea-style"
                    />

                    <span className="text-[12px] mt-[5px]">
                      {wordCount >= 100 ? (
                        <p className="text-red-500 text-[12px] mt-2">
                          Limit exceeded (100 words maximum)
                        </p>
                      ) : (
                        `${wordCount}/100`
                      )}
                    </span>
                    <div className="myprofile-radio-group">
                      <div className="owner-radio-inputs mt-[15px] space-y-3 ">
                        <h4 className="text-[#222222] font-semibold">
                          Who are we getting to know?
                        </h4>

                        <div className="flex items-center ">
                          <label className="space-x-2 flex items-center">
                            <input
                              type="radio"
                              value="The Owner"
                              checked={ownerRadioOption === "The Owner"}
                              onChange={() =>
                                handleOwnerRadioChange("The Owner")
                              }
                            />
                            <span className="font-semibold">The Owner</span>
                          </label>
                        </div>

                        <div>
                          <label className="space-x-2 flex items-center">
                            <input
                              type="radio"
                              value="The Team"
                              checked={ownerRadioOption === "The Team"}
                              onChange={() =>
                                handleOwnerRadioChange("The Team")
                              }
                            />
                            <span className="font-semibold">The Team</span>
                          </label>
                        </div>
                      </div>
                      <div className="mb-[2rem]">
                        <Cropper
                          onImageCrop={handleImageCrop}
                          onChangeCrop={handleImageChange}
                        />
                      </div>
                    </div>

                    {/* Submit and CAncel buttons */}
                    <div className="myprofile-button-group-2 ">
                      <button
                        className="myprofile-cancel-button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="myprofile-save-button"
                        onClick={handleOwnerSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
          <br />
          <br />

          {/* PHOTO GALLERY */}
          <h2 className="profile-listing-header">Photos/Videos</h2>
          <div className="myprofilePhotos-accordion-item-header">
            Photo Gallery
          </div>
          <div className="photos-subheading-text">
            <span>Drag and drop your photos to change the order. </span>
          </div>
          <div className="mt-[1rem] ">
            <PhotoGalleryTest />
          </div>
          <br />
          <br />
          <div className="myprofilePhotos-accordion-item-header">Videos</div>
          <VideoGallery />

          {/* PRICING */}
          <StyledAccordion
            expanded={expanded === "panel4"}
            onChange={(e, isExpanded) => handleChange(isExpanded, "panel4")}
          >
            <AccordionSummary
              id="panel4-header"
              aria-controls="panel4-content"
              expandIcon={
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Typography>
              }
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(0deg)",
                  color: "black",
                },
              }}
            >
              <div>
                <h4 className="profile-listing-header">Pricing</h4>
                {saveClicked && !expanded ? (
                  <>
                    <p className="myprofile-accordion-subheading">
                      You are responsible for updating your prices
                    </p>
                    <p className="myprofile-accordion-subheading">
                      Staring Price: ${amount}
                    </p>
                    <p className="myprofile-accordion-subheading">
                      Display Price: {displayPrice ? "Yes" : "No"}
                    </p>
                  </>
                ) : (
                  <p className="myprofile-accordion-subheading">
                    Add a Starting Price. It is not mandatory to display your
                    prices.
                  </p>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {dynamicFields.map((field, index) => (
                  <div className="mt-[0px]" key={field.id}>
                    <div>
                      <div className="pricing-category-label-section">
                        <span className="pricing-cate-label">
                          {" "}
                          {field.label}
                        </span>
                      </div>
                      {/* pricing input */}
                      <div className="mt-[10px] relative">
                        <span className="font-semibold flex flex-col">
                          {field.id === "Wedding_Venues"
                            ? "Price per Head:"
                            : "Starting Price:"}
                        </span>
                        <div className="">
                          <span className="dollar-icon"></span>
                          <input
                            type="number"
                            required
                            className="pricing-input-style"
                            value={inputs[field.id] || ""}
                            onChange={(e) =>
                              handlePricingInputsChange(
                                field.id,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      {/* display price status */}
                      <div className="myprofile-button-group relative">
                        {/* quickdec-button-group */}
                        <div className="mt-[15px]">
                          <span className="font-semibold">Display Price ?</span>
                          <div className="mt-[15px] space-x-2">
                            <button
                              className={`yes-button ${
                                displayStates[field.id] ? "selected" : ""
                              }`}
                              onClick={() =>
                                handleDisplayChange(field.id, true)
                              }
                            >
                              Yes
                            </button>
                            <button
                              className={`no-button ${
                                !displayStates[field.id] ? "selected" : ""
                              }`}
                              onClick={() =>
                                handleDisplayChange(field.id, false)
                              }
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Additional fields for "wedding_venue" */}
                      {field.id === "Wedding_Venues" && (
                        <>
                          {/* Accomodation Availability */}
                          <div className="myprofile-button-group relative">
                            <div className="mt-[15px]">
                              <span className="font-semibold">
                                Accomodation Availability
                              </span>
                              <div className="mt-[15px] space-x-2">
                                <button
                                  className={`yes-button ${
                                    accomodatiion[field.id] ? "selected" : ""
                                  }`}
                                  onClick={() =>
                                    handleAccomodationChange(field.id, true)
                                  }
                                >
                                  Yes
                                </button>
                                <button
                                  className={`no-button ${
                                    !accomodatiion[field.id] ? "selected" : ""
                                  }`}
                                  onClick={() =>
                                    handleAccomodationChange(field.id, false)
                                  }
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          </div>
                          <br />
                          {/* Capacity */}
                          <div className="pricing-addons-container">
                            <div className="pricing-addon-label ">
                              <span className="l">Capacity:</span>
                            </div>
                            <input
                              type="number"
                              required
                              className="capacity-input-style"
                              value={capacity}
                              onChange={(e) =>
                                handleCapacityChange("Capacity", e.target.value)
                              }
                            />
                          </div>

                          {/* Cocktail */}
                          <div className="pricing-addons-container">
                            <div className="pricing-addon-label ">
                              <span className="l">Cocktail:</span>
                            </div>
                            <input
                              type="number"
                              required
                              className="capacity-input-style"
                              value={cocktail}
                              onChange={(e) =>
                                handleCocktailChange("Cocktail", e.target.value)
                              }
                            />
                          </div>

                          {/* Seated Style */}
                          <div className="pricing-addons-container">
                            <div className="pricing-addon-label ">
                              <span className="l">Seated Style</span>
                            </div>
                            <input
                              type="number"
                              required
                              className="capacity-input-style"
                              value={seatedStyle}
                              onChange={(e) =>
                                handleSeatedStyleChange(
                                  "Seated",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <br />
                        </>
                      )}
                    </div>
                  </div>
                ))}
                <br />

                <div className="flex justify-center">
                  <button
                    className="mt-[2rem] flex justify-center items-center w-[120px] h-[40px] rounded-full bg-[#6cc2bc] text-[16px] text-white font-bold cursor-pointer"
                    onClick={handlePricingSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
          {/* Venue Amenities and Service */}
          {dynamicFields.some((field) => field.id === "Wedding_Venues") && (
            <StyledAccordion
              expanded={expanded === "venueAmenities"}
              onChange={(e, isExpanded) =>
                handleChange(isExpanded, "venueAmenities")
              }
            >
              <AccordionSummary
                id="venueAmenities-header"
                aria-controls="venueAmenities-content"
                expandIcon={
                  <Typography
                    sx={{
                      color: "black",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Edit
                  </Typography>
                }
                sx={{
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    transform: "rotate(0deg)",
                    color: "black",
                  },
                }}
              >
                <div>
                  <h4 style={{ fontWeight: expanded ? "bold" : "normal" }}>
                    Venue Inclusions
                  </h4>
                  <p className="myprofile-accordion-subheading">
                    Add Your Venue inclusions
                  </p>
                  {/* ... (additional content for Venue Amenities and Services) */}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {dynamicFields.map((field, index) => (
                  <div className="mt-[0px]" key={field.id}>
                    <div>
                      {/* Additional fields for "wedding_venue" */}
                      {field.id === "Wedding_Venues" && (
                        <>
                          <br />
                          {/* Venue Amenities */}
                          <Stack spacing={1} direction="row">
                            <div className="pricing-addon-label ">
                              <span className="l">Venue Amenities:</span>
                            </div>
                            <FormControl>
                              <FormGroup
                                sx={{
                                  width: {
                                    xs: "100%",
                                    md: "31rem",
                                  },
                                }}
                              >
                                <Grid container spacing={1} container={false}>
                                  {dynamicFields.map((option, index) => (
                                    <Grid item key={index} direction="column">
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            value={option.value}
                                            checked={
                                              venueAmenities[option.value]
                                            }
                                            onChange={(e) =>
                                              handleVenueAmenitiesChange(
                                                e,
                                                index
                                              )
                                            }
                                          />
                                        }
                                        label={
                                          <Typography
                                            sx={{ whiteSpace: "normal" }}
                                          >
                                            {option.label}
                                          </Typography>
                                        }
                                      />
                                    </Grid>
                                  ))}
                                </Grid>
                              </FormGroup>
                            </FormControl>
                          </Stack>
                          <Stack spacing={1} direction="row">
                            <div className="pricing-addon-label ">
                              <span className="l">
                                Venue Service Offerings:
                              </span>
                            </div>
                            <FormControl>
                              <FormGroup
                                sx={{
                                  width: {
                                    xs: "100%",
                                    md: "31rem",
                                  },
                                }}
                              >
                                <Grid container spacing={1} container={false}>
                                  {dynamicFields.map((option, index) => (
                                    <Grid item key={index} direction="column">
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            value={option.value}
                                            checked={
                                              venueAmenities[option.value]
                                            }
                                            onChange={(e) =>
                                              handleVenueAmenitiesChange(
                                                e,
                                                index
                                              )
                                            }
                                          />
                                        }
                                        label={
                                          <Typography
                                            sx={{ whiteSpace: "normal" }}
                                          >
                                            {option.label}
                                          </Typography>
                                        }
                                      />
                                    </Grid>
                                  ))}
                                </Grid>
                              </FormGroup>
                            </FormControl>
                          </Stack>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <button
                    className="mt-[2rem] flex justify-center items-center w-[120px] h-[40px] rounded-full bg-[#6cc2bc] text-[16px] text-white font-bold cursor-pointer"
                    // onClick={handlePricingSubmit}
                  >
                    Save
                  </button>
                </div>
              </AccordionDetails>
            </StyledAccordion>
          )}
          {/* QandA */}
          <StyledAccordion
            expanded={expanded === "panel5"}
            onChange={(e, isExpanded) => handleChange(isExpanded, "panel5")}
          >
            <AccordionSummary
              id="panel5-header"
              aria-controls="panel5-content"
              expandIcon={
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Typography>
              }
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(0deg)",
                  color: "black",
                },
              }}
            >
              <div>
                <h4 className="profile-listing-header">Q&A</h4>
                {saveClicked && questionDisplay.length > 0 && !expanded ? (
                  <p className="whitespace-break-spaces mt-[10px]">
                    {questionDisplay}
                  </p>
                ) : expanded || questionDisplay.length > 0 ? null : (
                  <p className="myprofile-accordion-subheading">
                    Add the most common Q&A your business is asked, this helps
                    couples get to know you further.
                  </p>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="myprofile-accordion-item-header"></div>
                <div className="mt-[0px]">
                  <div className="QandA-panel-container">
                    <p className="whitespace-break-spaces">
                      Add up to 5 common questions [businessname] is asked.
                    </p>
                    {questions.map((question, index) => (
                      <div key={question.id}>
                        <div className="mt-[15px] space-y-1">
                          <span className="font-semibold">
                            Question ({index + 1})
                          </span>
                          <br />
                          <div className="">
                            <input
                              className="question-input-style"
                              placeholder="Maximum 50 characters"
                              value={question.question}
                              onChange={(e) =>
                                handleQuestionChange(e, question.id)
                              }
                            />
                            <div className="qandA-delete-button ">
                              <button
                                className="remove-question-button"
                                onClick={() =>
                                  handleRemoveQuestion(question.id)
                                }
                              >
                                <DeleteForeverIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-[15px] space-y-1">
                          <span className="font-semibold">
                            Answer ({index + 1})
                          </span>
                          <br />
                          <textarea
                            className="answer-input-style"
                            value={question.answer}
                            onChange={(e) => handleAnswerChange(e, question.id)}
                          />
                        </div>
                      </div>
                    ))}

                    <div className="myprofile-button-group relative">
                      <button
                        className="question-cancel-button"
                        onClick={addQuestion}
                      >
                        Add a question
                      </button>
                      <button
                        className="myprofile-save-button"
                        onClick={handleQuestionSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
          {/* PACKAGES */}
          <StyledAccordion
            expanded={expanded === "panel6"}
            onChange={(e, isExpanded) => handleChange(isExpanded, "panel6")}
          >
            <AccordionSummary
              id="panel6-header"
              aria-controls="panel6-content"
              expandIcon={
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Typography>
              }
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(0deg)",
                  color: "black",
                },
              }}
            >
              <div>
                <h4 className="profile-listing-header">Packages</h4>

                <div className="myprofile-accordion-subheading-pricing">
                  <>{packagesText || "Package Updated: No"}</>

                  <br />
                  <br />
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="myprofile-accordion-item-header">
                  {/* <span className="myprofile-edit-button">Edit</span> */}
                </div>
                <div className="package-panel-container">
                  <div>
                    <span className="text-[14px] mt-[10px]">
                      Add a PDF file, maximum 5MB. You are responsible to ensure
                      the information in your PDF is up to date.
                    </span>
                  </div>
                  <br />
                  <label
                    htmlFor="upload-files"
                    className="text-[14px] cursor-pointer"
                  >
                    {uploadedFileName && `File Uploaded: ${uploadedFileName}`}
                  </label>
                  <div className="myprofile-button-group relative">
                    <div className="">
                      <div className="packages-upload-button ">
                        <input
                          type="file"
                          id="upload-files"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="upload-files"
                          className="text-[14px] cursor-pointer"
                        >
                          Upload{" "}
                        </label>
                        <span className="package-upload-icons">
                          <BiUpload />
                        </span>
                      </div>
                    </div>
                    <button
                      className="myprofile-save-button"
                      onClick={handlePackageSubmit}
                    >
                      Save
                    </button>
                  </div>
                  <div id="displayText"></div>
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
        </div>
      </div>
    </div>
  );
};

export default Profile;
