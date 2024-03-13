import React, { useState, useEffect, useCallback, useRef } from "react";
import "../Style/BusinessProfile.css";
// Accordion
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { RxTriangleUp } from "react-icons/rx";
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
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";

import PhotoGalleryTest from "./BusinessMyProfile/PhotoGalleryTest";
import VideoGallery from "./BusinessMyProfile/myProfileVideo";
import { PricingCheckbox, StyledAccordion } from "../../components/FormStyle";
import * as BusinessJS from "../Business/Business";
import Skeleton from "@mui/material/Skeleton";
import { Preview } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import PhotoPreview from "./BusinessMyProfile/PhotoPreview";
import VideoPreview from "./BusinessMyProfile/VideoPreview";

const toolbarOptions = {
  options: ["inline", "list"],
  inline: {
    options: ["bold", "italic"],
  },
  list: {
    options: ["unordered", "ordered"],
  },
};

const Profile = () => {
  const [viewProfile, setViewProfile] = useState("");

  const [previewListing, setPreviewListing] = useState("");
  const [vendorinputs, setVendorInputs] = useState("");
  const vendorID = vendorinputs.vid;
  const businessID = vendorinputs.id;
  const isScreenSizeAbove1250px = window.innerWidth > 1250;
  const [expanded, setExpanded] = useState(false);
  // Quick desc
  const quickRef = useRef();
  const [quickText, setQuickText] = useState("");
  const [saveClicked, setSaveClicked] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [inputsErrors, setInputsErrors] = useState({});

  const [previewSet, setpreviewSet] = useState(false);
  // Full desc
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [fullText, setFullText] = useState("");
  const [fulldesccount, setFulldesccount] = useState(0);
  // Owner and Team
  const [ownerText, setOWnerText] = useState("");
  const [ownerContent, setOwnerContent] = useState("");
  const [defaultContent, setDefaultcontent] = useState("");
  const [ownerRadioOption, setOwnerRadioOption] = useState(1);
  const [croppedImage, setCroppedImage] = useState("");
  const [imageTypes, setImageTypes] = useState({});
  const [ownerImage, setOwnerImage] = useState(viewProfile.teamownerpic || "");
  // Packages
  const [pfile, setPfile] = useState();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [packagesText, setPackagesText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [viewFile, setViewFile] = useState("");
  const [delPackage, setDelPackages] = useState(false);
  // QandA
  const [questions, setQuestions] = useState([
    { id: 1, question: "", answer: "" },
  ]);
  const [updateQanda, setUpdateQanda] = useState({});
  const [questionDisplay, setQuestionDisplay] = useState([]);
  const [qwordCount, setQwordCount] = useState(0);
  const [qandaWordCountError, setqandaWordCountError] = useState(false);
  // const [inputsErrors, setInputsErrors] = useState({});
  const [questionRes, setQuestionRes] = useState({});
  const [deleteQA, setDeleteQA] = useState("");
  const [viewQandA, setViewQandA] = useState([]);
  // Pricing
  const [inputsPricing, setInputsPricing] = useState([]);
  const [isActive, setIsActive] = useState({});
  // const [inputsErrors, setInputsErrors] = useState({});
  const [pricingFormValue, setPricingFormValue] = useState({});
  const [pformValues, setPFormValues] = useState({});
  // Inclusion
  const [selectedInclusions, setSelectedInclusions] = useState({});
  const [inclusionResult, setInclusionResult] = useState([]);
  const [incResponse, setIncResponse] = useState([]);
  // expansion handling
  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };

  //preview listing
  const fetchData = useCallback(async () => {
    // console.log("Fetching data...");
    await BusinessJS.fetchbusiness(setVendorInputs, setpreviewSet);
    if (vendorID) {
      await BusinessJS.vendorView(setPreviewListing, vendorID, setpreviewSet);
    }
  }, [vendorID]);

  // Fetch data only when the component mounts or vendorID changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // console.log("Vendor Preview:", previewListing);

  // console.log("Vendor inputs:", vendorinputs);

  // viewprofile
  useEffect(() => {
    BusinessJS.viewProfileSettings(vendorID, setViewProfile);
  }, [vendorID]);
  console.log("view profile:", viewProfile);

  useEffect(() => {
    setOwnerImage(viewProfile.teamownerpic || "");
    setDefaultcontent(viewProfile.team_owner_details);
  }, [viewProfile]);
  // console.log("Team owner detail:", viewProfile.team_owner_details);

  // quick desc
  const handleQuickTexChange = (e) => {
    const inputText = e.target.value;
    const currentWordCount = inputText.split(/\s+/).filter(Boolean).length;
    if (currentWordCount <= 100) {
      setQuickText(inputText);
      setWordCount(currentWordCount);
    }
  };
  const handleSubmit = () => {
    // e.preventDefault();
    setExpanded(false);
    setSaveClicked(true);
    //
    const inputText = quickRef.current.value;

    const formValues = {
      vid: vendorID,
      profile_short_desc: inputText,
    };

    BusinessJS.updateBusinessMyProfile(
      formValues,
      vendorID,
      1,
      setInputsErrors,
      setVendorInputs
    );
  };

  const handleCancel = () => {
    setExpanded(false);
    // setDraftText("");
    setWordCount(0);
  };

  // FULL DESC

  const updateStateAndAPI = useCallback((editorState) => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);

    const plainText = editorState.getCurrentContent().getPlainText();
    const words = plainText.trim().split(/\s+/);
    const count = words.length;
    setFulldesccount(count);

    // Use html directly instead of relying on state update
    setFullText(<div dangerouslySetInnerHTML={createMarkup(html)} />);
  }, []);

  useEffect(() => {
    updateStateAndAPI(editorState);
  }, []);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const handleFullSubmit = (e) => {
    e.preventDefault();
    setExpanded(false);
    setSaveClicked(true);

    const formValues = {
      vid: vendorID,
      // profile_short_desc: previewListing.profile_short_desc,
      profile_long_desc: convertedContent, // Include the full text in the formValues
    };
    // console.log("Formvalues from full desc:", formValues);
    BusinessJS.updateBusinessMyProfile(
      formValues,
      vendorID,
      1,
      setInputsErrors,
      setVendorInputs
    );
    // console.log("Full Text entered:", convertedContent);
  };

  //   /********Meet the Team ********* */
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
    setImageTypes({
      thumbUrl: images.thumbUrl,
      iconUrl: images.iconUrl,
      imageUrl: images.imageUrl,
    });
  };
  const handleImageChange = (thumbUrl) => {
    setCroppedImage(thumbUrl);
  };

  const handleOwnerSubmit = (e) => {
    e.preventDefault();
    setExpanded(false);
    setSaveClicked(true);

    setOwnerContent(ownerText);
    const formValues = {
      vid: vendorID,
      tempphoto: {
        imageUrl: imageTypes.imageUrl,
        thumbUrl: croppedImage,
        iconUrl: imageTypes.iconUrl,
      },
      team_owner_details: ownerText,
      team_type: ownerRadioOption,
    };

    BusinessJS.updateBusinessMyProfile(
      formValues,
      vendorID,
      2,
      setInputsErrors,
      setVendorInputs
    );
  };

  /*******PACKAGES*******8 */
  const handleFileChange = (e) => {
    const fileInput = e.target;
    if (fileInput.files.length > 0) {
      const uploadedFile = fileInput.files[0];
      setPfile(uploadedFile);
      setUploadedFileName(uploadedFile.name);
      setFileUploaded(true);
    } else {
      setFileUploaded(false);
      setUploadedFileName("");
    }
  };

  const handlePackageSubmit = () => {
    setSaveClicked(true);

    if (fileUploaded) {
      setPackagesText("Package Updated: Yes");
      const formValues = {
        vid: vendorID,
        package_file: pfile,
      };
      // console.log("Package section:", formValues);
      BusinessJS.updateBusinessMyProfile_Package(
        formValues,
        vendorID,
        6,
        setInputsErrors,
        setViewFile
      );
    } else {
      setPackagesText("Package Updated: No");
    }
  };

  const deletePackage = async () => {
    await BusinessJS.V_deeletePackages(vendorID, setDelPackages);
    console.log("Delete package:", deletePackage);
    setFileUploaded(false);
    setUploadedFileName("");
  };
  //*****Q and A ***********/
  //*****Q and A ***********/
  // view Q and A Record
  useEffect(() => {
    BusinessJS.viewqandaRecord(setViewQandA, vendorID).then(() => {
      console.log("Q and A:", viewQandA);
    });
  }, [vendorID]);

  // to update the question state from the backend data
  useEffect(() => {
    const newQuestions = viewQandA.map((question) => ({
      id: question.qid,
      question: question.question,
      answer: question.answer,
    }));
    setQuestions(newQuestions);
  }, [viewQandA]);

  const handleQandAWordCount = (text) => {
    const words = text.trim().split(/\s+/);
    const count = words.length;
    setQwordCount(count);

    if (count > 50) {
      setqandaWordCountError(true);
    } else {
      setqandaWordCountError(false);
    }
  };

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, question: "", answer: "" }]);
  };

  const handleQandAhandleChange = (value, questionId, field) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  // DELETE Q AND A
  const handleRemoveQuestion = (questionId) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(updatedQuestions);
    handleRemoveQuestionFunction(questionId);
  };
  //
  const handleRemoveQuestionFunction = (qid) => {
    const updatedQuestions = questions.filter((q) => q.id !== qid);
    setQuestions(updatedQuestions);
    const formValues = updatedQuestions.map((question) => {
      return {
        qid: question.id,
        vid: vendorID,
        question: question.question,
        answer: question.answer,
      };
    });
    const formattedQuestions = formValues
      .map(
        (question) =>
          `${question.qid}: ${question.question}\n${question.qid}: ${question.answer}`
      )
      .join("\n\n");
    setQuestionDisplay([formattedQuestions]);
    BusinessJS.V_deeleteQA(vendorID, qid, setDeleteQA);
  };

  // formted view Q and A to display
  const formattedQandADisplay = viewQandA.map((question) => (
    <React.Fragment key={question.qid}>
      {`${question.qid}: ${question.question}`}
      <br />
      {`${question.qid}: ${question.answer}`}
      <br />
      <br />
    </React.Fragment>
  ));

  const handleQuestionSubmit = async () => {
    setExpanded(false);
    setSaveClicked(true);
    setQuestions(updateQanda);
    // Check if any question or answer is not blank
    const hasNonBlankQandA = questions.some(
      (question) =>
        question.question.trim() !== "" || question.answer.trim() !== ""
    );

    if (hasNonBlankQandA) {
      // Build the formatted questionDisplay content
      const formValues = questions.map((question) => {
        return {
          qid: question.id,
          vid: vendorID,
          question: question.question,
          answer: question.answer,
        };
      });
      BusinessJS.updateQandAProfile(
        formValues,
        vendorID,
        7,
        setInputsErrors,
        setQuestionRes
      );
      // Format to Display in the Accordion Summary
      const formattedQuestions = formValues
        .map(
          (question) =>
            `${question.qid}: ${question.question}\n${question.qid}: ${question.answer}`
        )
        .join("\n\n");

      setQuestionDisplay([formattedQuestions]);
      // console.log("Display question :", {
      //   formValues,
      // });
    }
  };

  /*****Pricing  ***********/
  const handleDisplayChange = (categoryID, value) => {
    setIsActive((prevDisplayStates) => ({
      ...prevDisplayStates,
      [categoryID]: value ? 1 : 0,
    }));
    // setSelectedDisplayState(categoryID, value);
  };

  const handlePricingInputChange = (name, value, props) => {
    if (inputsPricing.length !== undefined && inputsPricing.length > 0) {
      let pricingArray = [...inputsPricing];
      let catKey = props.catKey;
      let setKey = props.setKey;

      if (typeof pricingArray[catKey] === "undefined") {
        pricingArray[catKey] = {};
      }

      if (typeof pricingArray[catKey]["CategorySettings"] === "undefined") {
        pricingArray[catKey]["CategorySettings"] = [];
      }
      if (
        typeof pricingArray[catKey]["CategorySettings"][setKey] === "undefined"
      ) {
        pricingArray[catKey]["CategorySettings"][setKey] = {};
      }

      pricingArray[catKey]["categoryid"] = props.categoryid;
      pricingArray[catKey]["vid"] = vendorinputs.vid;
      pricingArray[catKey]["CategorySettings"][setKey]["csid"] = props.csid;
      pricingArray[catKey]["CategorySettings"][setKey]["hid"] = props.hid;
      pricingArray[catKey]["CategorySettings"][setKey]["vcids"] = props.vcids;
      pricingArray[catKey]["CategorySettings"][setKey]["grpcid"] = props.grpcid;
      pricingArray[catKey]["CategorySettings"][setKey][name] = value;
      // pricingArray[catKey]["CategorySettings"][setKey]["subtype_val"] = value;

      setInputsPricing(pricingArray);
    } else {
      let catKey = props.catKey;
      let setKey = props.setKey;
      let pricingArray = [];
      pricingArray[catKey] = {};
      pricingArray[catKey]["categoryid"] = props.categoryid;
      pricingArray[catKey]["vid"] = vendorinputs.vid;
      pricingArray[catKey]["CategorySettings"] = [];
      pricingArray[catKey]["CategorySettings"][setKey] = {};
      pricingArray[catKey]["CategorySettings"][setKey]["csid"] = props.csid;
      pricingArray[catKey]["CategorySettings"][setKey]["hid"] = props.hid;
      pricingArray[catKey]["CategorySettings"][setKey]["vcids"] = props.vcids;
      pricingArray[catKey]["CategorySettings"][setKey]["grpcid"] = props.grpcid;
      pricingArray[catKey]["CategorySettings"][setKey][name] = value;

      setInputsPricing(pricingArray);
    }

    // Call handleDisplayChange when "Yes" button is clicked
    if (name === "subtype_val" && value === 1) {
      handleDisplayChange(props.categoryid, 1);
    }

    // Call handleDisplayChange when "No" button is clicked
    if (name === "subtype_val" && value === 0) {
      handleDisplayChange(props.categoryid, 0);
    }
  };

  const handleInclusionChange = (
    inchid,
    incTitle,
    valueId,
    valueTitle,
    checked
  ) => {
    setSelectedInclusions((prevSelected) => ({
      ...prevSelected,
      [inchid]: {
        inchid,
        incTitle,
        selectedValues: {
          ...(prevSelected[inchid]?.selectedValues || {}),
          [valueId]: checked ? valueTitle : undefined,
        },
      },
    }));
  };

  const handlePricingSubmit = async () => {
    console.log("PRicing inputs:", inputsPricing);
    BusinessJS.updateQandAProfile(
      inputsPricing,
      vendorID,
      8,
      setInputsErrors,
      setVendorInputs
    );
  };

  const handleInclusionSubmit = () => {
    setSaveClicked(true);
    setExpanded(false);

    // console.log("Selected Inclusions:", selectedInclusions);
    const selectedValuesIds = Object.values(selectedInclusions)
      .map((inclusion) => Object.keys(inclusion.selectedValues)[0])
      .filter(Boolean); // Filter out undefined values

    const result = {
      inclusionsValue: selectedValuesIds.join(","),
      vid: vendorinputs.vid,
    };
    setInclusionResult(result);
    // console.log("inclusion:", result);
    BusinessJS.updateInclusions(
      inclusionResult,
      vendorID,
      8,
      setInputsErrors,
      setIncResponse
    );
  };

  const formattedInclsuionsData =
    viewProfile.inclusions &&
    viewProfile.inclusions.map((inclusion) => {
      const selectedValues = inclusion.values
        .filter((value) => value.type_val === "1")
        .map((value) => value.title)
        .join(", ");

      return `${inclusion.title}: ${selectedValues}`;
    });

  const formattedCategoryData =
    viewProfile.Category &&
    viewProfile.Category.map((category) => {
      const formattedSettings =
        category.CategorySettings &&
        category.CategorySettings.map((setting) => {
          const amount = setting.type_val;
          const title = setting.head_title;
          const subtitle = setting.head_subtitle ? "Yes" : "No";

          return {
            title,
            Amount: amount,
            ...(setting.head_subtitle && { Head_Subtitle: subtitle }),
          };
        });

      return {
        CategoryName: category.CategoryName,
        Settings: formattedSettings || [], // Provide an empty array if Settings is undefined
      };
    });

  const skeletonLines = [
    { variant: "text", height: "1rem" },
    { variant: "rectangular", width: "100%", height: "5rem" },
  ];
  return (
    <div className="preview-listing-container">
      {/* <pre>{JSON.stringify(previewListing, null, 2)}</pre> */}

      {/* PROFILE BASICS */}
      <div className="grid grid-cols-1" style={{ justifyItems: "end" }}>
        <div className="preview-listing-div">
          <h4 className="font-bold">Preview Listing</h4>
        </div>
      </div>

      <div className="mb-[1rem]"></div>
      <>
        <h2 className="profile-listing-header">Profile Basics</h2>
      </>
      <br />
      <div>
        <div className="grid grid-cols-1">
          {/* QUICK DESCRPTION */}
          <div>
            <StyledAccordion
              expanded={expanded === "panel1"}
              onChange={(e, isExpanded) => handleChange(isExpanded, "panel1")}
            >
              <AccordionSummary
                style={{
                  paddingLeft:
                    expanded === "panel1"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                  paddingRight:
                    expanded === "panel1"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "1rem",
                }}
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
                    {expanded === "panel1" ? (
                      <RxTriangleUp size={30} color="#6cc2bc" />
                    ) : (
                      "Edit"
                    )}
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
                  <h4
                    style={{
                      fontWeight: expanded === "panel1" ? "bold" : "normal",
                    }}
                  >
                    Quick Description
                  </h4>
                  {saveClicked &&
                  vendorinputs.profile_short_desc &&
                  !expanded === "panel1" ? (
                    <p className="myprofile-accordion-subheading">
                      {vendorinputs.profile_short_desc}
                    </p>
                  ) : expanded === "panel1" ? (
                    <p className="myprofile-accordion-subheading">
                      Display a quick summary of your business. Tip includes
                      what your service is and your location.
                    </p>
                  ) : saveClicked && quickText ? (
                    typeof quickText === "string" ? (
                      <div>{quickText}</div>
                    ) : (
                      <p className="myprofile-accordion-subheading">
                        {quickText}
                      </p>
                    )
                  ) : (
                    <p className="myprofile-accordion-subheading">
                      {previewListing.profile_short_desc ||
                        // <div
                        //   dangerouslySetInnerHTML={{
                        //     __html: previewListing.profile_long_desc,
                        //   }}
                        // />
                        "Give couples a sense of what is included when they book [insert business name]. Include information such as locations, inclusions, starting prices etc."}
                    </p>
                  )}
                </div>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  paddingLeft:
                    expanded === "panel1"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
              >
                <div>
                  <div className="myprofile-accordion-item-header"></div>
                  <div className="mt-[0px]">
                    <div className="profile-editor-position">
                      <textarea
                        ref={quickRef}
                        name="profile_short_desc"
                        id="text-area"
                        // value={quickText}
                        value={quickText || previewListing.profile_short_desc}
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
          </div>
          {/* Full desc */}
          <div>
            <StyledAccordion
              expanded={expanded === "panel2"}
              onChange={(e, isExpanded) => handleChange(isExpanded, "panel2")}
            >
              <AccordionSummary
                style={{
                  paddingLeft:
                    expanded === "panel2"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
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
                    {expanded === "panel2" ? (
                      <RxTriangleUp size={30} color="#6cc2bc" />
                    ) : (
                      "Edit"
                    )}
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
                  <h4
                    style={{
                      fontWeight: expanded === "panel2" ? "bold" : "normal",
                    }}
                  >
                    Full Description
                  </h4>
                  {saveClicked &&
                  vendorinputs.profile_long_desc &&
                  !expanded === "panel2" ? (
                    <p className="myprofile-accordion-subheading">
                      <div
                        className="myprofile-accordion-subheading"
                        dangerouslySetInnerHTML={{
                          __html: vendorinputs.profile_long_desc,
                        }}
                      />
                    </p>
                  ) : expanded === "panel2" ? (
                    <p className="myprofile-accordion-subheading">
                      Give couples a sense of what is included when they book
                      [insert business name]. Include information such as
                      locations, inclusions, starting prices etc.
                    </p>
                  ) : saveClicked && fullText ? (
                    typeof fullText === "string" ? (
                      <div
                        className="myprofile-accordion-subheading"
                        dangerouslySetInnerHTML={{ __html: fullText }}
                      />
                    ) : (
                      <p className="myprofile-accordion-subheading">
                        {fullText}
                      </p>
                    )
                  ) : (
                    <p className="myprofile-accordion-subheading">
                      {(
                        <div
                          className="myprofile-accordion-subheading"
                          dangerouslySetInnerHTML={{
                            __html: previewListing.profile_long_desc,
                          }}
                        />
                      ) ||
                        "Give couples a sense of what is included when they book [insert business name]. Include information such as locations, inclusions, starting prices etc."}
                    </p>
                  )}
                </div>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  paddingLeft:
                    expanded === "panel2"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
              >
                <div>
                  <div className="myprofile-accordion-item-header"></div>
                  {/* Editor */}
                  <div>
                    <div className="bprofile-editor-container">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        toolbar={toolbarOptions}
                      />
                    </div>
                    <div
                      className="hidden"
                      dangerouslySetInnerHTML={createMarkup(convertedContent)}
                    />
                    <span className="text-[12px] mt-[5px]">
                      {fulldesccount >= 500 ? (
                        <p className="text-red-500 text-[12px] mt-2">
                          Limit exceeded (500 words maximum)
                        </p>
                      ) : (
                        `${fulldesccount}/500`
                      )}
                    </span>
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
                          onClick={handleFullSubmit}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </StyledAccordion>
          </div>
          {/* TEAM AND OWNER DETAILS*/}
          <div>
            <StyledAccordion
              expanded={expanded === "panel3"}
              onChange={(e, isExpanded) => handleChange(isExpanded, "panel3")}
            >
              <AccordionSummary
                style={{
                  paddingLeft:
                    expanded === "panel3"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
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
                    {expanded === "panel3" ? (
                      <RxTriangleUp size={30} color="#6cc2bc" />
                    ) : (
                      "Edit"
                    )}
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
                  <h4
                    style={{
                      fontWeight: expanded === "panel3" ? "bold" : "normal",
                    }}
                  >
                    Meet the Owner/Team
                  </h4>

                  {saveClicked && defaultContent && !expanded === "panel3" ? (
                    <>
                      <p className="myprofile-accordion-subheading">
                        {ownerContent}
                      </p>
                      <p className="myprofile-accordion-subheading">
                        Type:{" "}
                        {ownerRadioOption === 1 || viewProfile.team_type === 1
                          ? "The Owner"
                          : ownerRadioOption === 2 ||
                            viewProfile.team_type === 2
                          ? "The Team"
                          : "Other Type"}
                      </p>
                    </>
                  ) : (
                    <p className="myprofile-accordion-subheading">
                      {expanded === "panel3" ? (
                        "Add a personal touch by letting couples get to know you, add a photo, and let us know if you are a team or owner."
                      ) : (
                        <>
                          Type:{" "}
                          {ownerRadioOption === 1 ||
                          (viewProfile && viewProfile.team_type === 1)
                            ? "The Owner"
                            : ownerRadioOption === 2 ||
                              (viewProfile && viewProfile.team_type === 2)
                            ? "The Team"
                            : "Other Type"}
                          <br />
                          <br />
                          {defaultContent}
                        </>
                      )}
                    </p>
                  )}
                </div>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  paddingLeft:
                    expanded === "panel3"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
              >
                <div>
                  <div className="myprofile-accordion-item-header">
                    {/* <span className="myprofile-edit-button">Edit</span> */}
                  </div>
                  <div className="mt-[0px]">
                    <div className="profile-editor-position">
                      <textarea
                        name="owner-desc"
                        id="text-area"
                        value={ownerText || viewProfile.team_owner_details}
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
                                checked={ownerRadioOption === 1}
                                onChange={() => handleOwnerRadioChange(1)}
                              />
                              <span className="font-semibold">The Owner</span>
                            </label>
                          </div>

                          <div>
                            <label className="space-x-2 flex items-center">
                              <input
                                type="radio"
                                value="The Team"
                                checked={ownerRadioOption === 2}
                                onChange={() => handleOwnerRadioChange(2)}
                              />
                              <span className="font-semibold">The Team</span>
                            </label>
                          </div>
                        </div>
                        <div className="mb-[2rem]">
                          <Cropper
                            onImageCrop={handleImageCrop}
                            onChangeCrop={handleImageChange}
                            defaultImage={ownerImage}
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
          </div>

          {/* PHOTOS AND VIDEOS */}
          <h2 className="profile-listing-header">Photos/Videos</h2>
          {/* Photos */}
          <div>
            <StyledAccordion
              expanded={expanded === "panel8"}
              onChange={(e, isExpanded) => handleChange(isExpanded, "panel8")}
            >
              <AccordionSummary
                style={{
                  paddingLeft:
                    expanded === "panel8"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
                id="panel8-header"
                aria-controls="panel8-content"
                expandIcon={
                  <Typography
                    sx={{
                      color: "black",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {expanded === "panel8" ? (
                      <RxTriangleUp size={30} color="#6cc2bc" />
                    ) : (
                      "Edit"
                    )}
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
                  <h4
                    style={{
                      fontWeight: expanded === "panel8" ? "bold" : "normal",
                    }}
                  >
                    Photo Gallery
                  </h4>
                  <br />
                  {expanded === "panel8" ? (
                    <p className="myprofile-accordion-subheading">
                      Drag and drop your photos to change the order.
                    </p>
                  ) : (
                    <>
                      {!expanded && (
                        <PhotoPreview maxPhotosToShow={4} />
                        // <PhotoGalleryTest
                        //   vendorID={vendorID}
                        //   maxPhotosToShow={3}
                        // />
                      )}
                    </>
                  )}
                  {/* {saveClicked && defaultContent && !expanded === "panel8" ? (
                    <>
                      {" "}
                      <PhotoGalleryTest vendorID={vendorID} />
                    </>
                  ) : ( expanded == "panel8") {
                    <>
                      <p className="myprofile-accordion-subheading">
                        Drag and drop your photos to change the order.{" "}
                      </p>{" "}
                      <PhotoGalleryTest vendorID={vendorID} />
                    </>

                  }

                  )} */}
                </div>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  paddingLeft:
                    expanded === "panel8"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
              >
                <div>
                  <div className="myprofile-accordion-item-header">
                    {/* <span className="myprofile-edit-button">Edit</span> */}
                    <>
                      {" "}
                      <PhotoGalleryTest
                        vendorID={vendorID}
                        maxPhotosToShow={0}
                      />
                    </>
                  </div>
                </div>
              </AccordionDetails>
            </StyledAccordion>
          </div>
          {/* VIDEOS */}
          <div>
            <StyledAccordion
              expanded={expanded === "panel9"}
              onChange={(e, isExpanded) => handleChange(isExpanded, "panel9")}
            >
              <AccordionSummary
                style={{
                  paddingLeft:
                    expanded === "panel9"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
                id="panel9-header"
                aria-controls="panel9-content"
                expandIcon={
                  <Typography
                    sx={{
                      color: "black",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {expanded === "panel9" ? (
                      <RxTriangleUp size={30} color="#6cc2bc" />
                    ) : (
                      "Edit"
                    )}
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
                  <h4
                    style={{
                      fontWeight: expanded === "panel9" ? "bold" : "normal",
                    }}
                  >
                    Videos
                  </h4>
                  {expanded === "panel9" ? (
                    <p className="myprofile-accordion-subheading">
                      Drag and drop your photos to change the order.
                    </p>
                  ) : (
                    !expanded && (
                      <VideoPreview vendorID={vendorID} maxtoShow={3} />
                    )
                  )}
                </div>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  paddingLeft:
                    expanded === "panel8"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
              >
                <div>
                  <div className="myprofile-accordion-item-header">
                    <VideoGallery vendorID={vendorID} />
                  </div>
                </div>
              </AccordionDetails>
            </StyledAccordion>
          </div>

          {/* PRICING */}
          <div>
            {viewProfile ? (
              <StyledAccordion
                expanded={expanded === "panel4"}
                onChange={(e, isExpanded) => handleChange(isExpanded, "panel4")}
              >
                <AccordionSummary
                  style={{
                    paddingLeft:
                      expanded === "panel4"
                        ? isScreenSizeAbove1250px
                          ? "2rem"
                          : "1rem"
                        : "0",
                  }}
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
                      {expanded === "panel4" ? (
                        <RxTriangleUp size={30} color="#6cc2bc" />
                      ) : (
                        "Edit"
                      )}
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
                    {/* {!expanded ? (
                      <>
                        <p style={{ marginTop: "10px" }}>
                          {formattedInclsuionsData.map(
                            (formattedString, index) => (
                              <div key={index}>{formattedString}</div>
                            )
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="myprofile-accordion-subheading">
                        Add Your Venue Inclusions
                      </p>
                    )} */}
                    <h4 className="profile-listing-header">Pricing</h4>
                    {!expanded ? (
                      <>
                        <p className="myprofile-accordion-subheading ">
                          {formattedCategoryData.map((category, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-[1rem] "
                            >
                              <p>
                                You are responsible for updating your prices.
                              </p>
                              <div
                                style={{
                                  fontWeight: "600",
                                  color: "#515151",
                                  marginTop: "0.5rem",
                                }}
                              >{`${category.CategoryName}`}</div>
                              <div className="flex flex-col gap-[10px]">
                                {category.Settings.map(
                                  (setting, settingIndex) => (
                                    <div key={settingIndex}>
                                      {setting.Amount > 0 && (
                                        <p
                                          style={{
                                            fontWeight: "400",
                                            color: "#515151",
                                          }}
                                        >
                                          {`${setting.title}:`} $
                                          {setting.Amount}
                                        </p>
                                      )}
                                      <div>
                                        {` ${
                                          setting.Head_Subtitle
                                            ? `Display Price: ${setting.Head_Subtitle}`
                                            : ""
                                        }`}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </p>
                      </>
                    ) : (
                      <p className="myprofile-accordion-subheading">
                        Add your starting pricec. Not mandatory.
                      </p>
                    )}
                  </div>
                </AccordionSummary>

                <AccordionDetails
                  style={{
                    paddingLeft:
                      expanded === "panel4"
                        ? isScreenSizeAbove1250px
                          ? "2rem"
                          : "1rem"
                        : "0",
                  }}
                >
                  <div>
                    {viewProfile.Category &&
                      viewProfile.Category.map((category, catKey) => (
                        <div
                          className="mt-[1rem] mb-[3rem]"
                          key={category.Categoryid}
                        >
                          <div className="flex flex-col gap-[1rem]">
                            <div className="pricing-category-label-section">
                              <span className="pricing-cate-label">
                                {" "}
                                {category.CategoryName}
                              </span>
                            </div>
                            {/* Category fields */}
                            {category.CategorySettings.map(
                              (categorySettings, setKey) => (
                                <div
                                  key={setKey}
                                  className="flex flex-col gap-[5px] "
                                >
                                  {categorySettings.min_max == "1" ? (
                                    <>
                                      <div className="flex  gap-[1rem]">
                                        <h5 className="font-semibold flex flex-col w-[8rem] md:w-[14rem">
                                          {categorySettings.head_title}:
                                        </h5>
                                        <div className="flex gap-[1rem]">
                                          <input
                                            type="text"
                                            className="capacity-input-style"
                                            containerClass=""
                                            // placeholder={`${categorySettings.head_title} min`}
                                            name="type_val"
                                            value={
                                              inputsPricing[catKey]
                                                ? inputsPricing[catKey][
                                                    "CategorySettings"
                                                  ][setKey]
                                                  ? inputsPricing[catKey][
                                                      "CategorySettings"
                                                    ][setKey]["type_val"]
                                                  : ""
                                                : "" ||
                                                  categorySettings.subtype_val
                                            }
                                            catKey={catKey}
                                            setKey={setKey}
                                            categoryid={category.Categoryid}
                                            csid={categorySettings.csid}
                                            hid={categorySettings.hid}
                                            vcids={category.Categoryid}
                                            grpcid={categorySettings.grpcid}
                                            propsValue={true}
                                            onChange={(e) =>
                                              handlePricingInputChange(
                                                "type_val",
                                                e.target.value,
                                                {
                                                  catKey,
                                                  setKey,
                                                  categoryid:
                                                    category.Categoryid,
                                                  csid: categorySettings.csid,
                                                  hid: categorySettings.hid,
                                                  vcids: category.Categoryid,
                                                  grpcid:
                                                    categorySettings.grpcid,
                                                }
                                              )
                                            }
                                          />
                                          <input
                                            type="text"
                                            className="capacity-input-style"
                                            containerClass=""
                                            // placeholder={`${categorySettings.head_title} max`}
                                            name="subtype_val"
                                            value={
                                              inputsPricing[catKey]
                                                ? inputsPricing[catKey][
                                                    "CategorySettings"
                                                  ][setKey]
                                                  ? inputsPricing[catKey][
                                                      "CategorySettings"
                                                    ][setKey]["subtype_val"]
                                                  : ""
                                                : "" ||
                                                  categorySettings.type_val
                                            }
                                            catKey={catKey}
                                            setKey={setKey}
                                            categoryid={category.Categoryid}
                                            csid={categorySettings.csid}
                                            hid={categorySettings.hid}
                                            vcids={category.Categoryid}
                                            grpcid={categorySettings.grpcid}
                                            propsValue={true}
                                            onChange={(e) =>
                                              handlePricingInputChange(
                                                "subtype_val",
                                                e.target.value,
                                                {
                                                  catKey,
                                                  setKey,
                                                  categoryid:
                                                    category.Categoryid,
                                                  csid: categorySettings.csid,
                                                  hid: categorySettings.hid,
                                                  vcids: category.Categoryid,
                                                  grpcid:
                                                    categorySettings.grpcid,
                                                }
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </>
                                  ) : categorySettings.head_titletype ===
                                    "1" ? (
                                    <>
                                      {/* cocktail, price, seated, capacity */}
                                      <div className="flex justify-start items-center gap-[1rem]">
                                        <h5 className="font-semibold flex flex-col w-[8rem] md:w-[14rem]">
                                          {categorySettings.head_title}
                                        </h5>
                                        <input
                                          type="text"
                                          className="capacity-input-style"
                                          containerClass=""
                                          label={categorySettings.head_title}
                                          // placeholder={
                                          //   categorySettings.head_title
                                          // }
                                          name="type_val"
                                          value={
                                            inputsPricing[catKey]
                                              ?.CategorySettings[setKey]
                                              ?.type_val ||
                                            categorySettings.type_val
                                          }
                                          catKey={catKey}
                                          setKey={setKey}
                                          categoryid={category.Categoryid}
                                          csid={categorySettings.csid}
                                          hid={categorySettings.hid}
                                          vcids={category.Categoryid}
                                          grpcid={categorySettings.grpcid}
                                          propsValue={true}
                                          onChange={(e) =>
                                            handlePricingInputChange(
                                              "type_val",
                                              e.target.value,
                                              {
                                                catKey,
                                                setKey,
                                                categoryid: category.Categoryid,
                                                csid: categorySettings.csid,
                                                hid: categorySettings.hid,
                                                vcids: category.Categoryid,
                                                grpcid: categorySettings.grpcid,
                                              }
                                            )
                                          }
                                        />
                                      </div>
                                    </>
                                  ) : categorySettings.head_titletype ===
                                    "2" ? (
                                    <>
                                      {/* Accomodation Availability */}
                                      <div className="flex gap-[1rem]">
                                        <h5 className="font-semibold flex flex-col w-[8rem] md:w-[14rem]">
                                          {categorySettings.head_title}
                                        </h5>
                                        <div className="flex gap-[1rem]">
                                          <button
                                            className="yes-check-button"
                                            // className={`yes-check-button ${
                                            //   isActive[category.Categoryid] ===
                                            //     1 ||
                                            //   (categorySettings.subtype_val ===
                                            //     "1" &&
                                            //     categorySettings.min_max == "0")
                                            //     ? "selected"
                                            //     : ""
                                            // }`}
                                            label={
                                              categorySettings.head_subtitle
                                            }
                                            placeholder={
                                              categorySettings.head_subtitle
                                            }
                                            name="subtype_val"
                                            value={
                                              inputsPricing[catKey]
                                                ? inputsPricing[catKey][
                                                    "CategorySettings"
                                                  ]
                                                  ? inputsPricing[catKey][
                                                      "CategorySettings"
                                                    ][setKey]
                                                    ? inputsPricing[catKey][
                                                        "CategorySettings"
                                                      ][setKey]["subtype_val"]
                                                    : ""
                                                  : ""
                                                : ""
                                            }
                                            catKey={catKey}
                                            setKey={setKey}
                                            categoryid={category.Categoryid}
                                            csid={categorySettings.csid}
                                            hid={categorySettings.hid}
                                            vcids={category.Categoryid}
                                            grpcid={categorySettings.grpcid}
                                            propsValue={true}
                                          >
                                            Yes
                                          </button>
                                          {/* No */}
                                          <button
                                            className="no-check-button"
                                            containerClass=""
                                            label={
                                              categorySettings.head_subtitle
                                            }
                                            placeholder={
                                              categorySettings.head_subtitle
                                            }
                                            name="subtype_val"
                                            value={
                                              inputsPricing[catKey]
                                                ? inputsPricing[catKey][
                                                    "CategorySettings"
                                                  ]
                                                  ? inputsPricing[catKey][
                                                      "CategorySettings"
                                                    ][setKey]
                                                    ? inputsPricing[catKey][
                                                        "CategorySettings"
                                                      ][setKey]["subtype_val"]
                                                    : ""
                                                  : ""
                                                : ""
                                            }
                                            catKey={catKey}
                                            setKey={setKey}
                                            categoryid={category.Categoryid}
                                            csid={categorySettings.csid}
                                            hid={categorySettings.hid}
                                            vcids={category.Categoryid}
                                            grpcid={categorySettings.grpcid}
                                            propsValue={true}
                                          >
                                            No
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {categorySettings.head_subtype === "1" ? (
                                    <>
                                      <div>
                                        <h5 className="font-semibold flex flex-col w-[8rem] md:w-[14rem]">
                                          {categorySettings.head_subtitle}
                                        </h5>
                                        <input
                                          type="text"
                                          className="pricing-input-style"
                                          containerClass=""
                                          label={categorySettings.head_subtitle}
                                          placeholder={
                                            categorySettings.head_subtitle
                                          }
                                          name="subtype_val"
                                          value={
                                            inputsPricing[catKey]
                                              ? inputsPricing[catKey][
                                                  "CategorySettings"
                                                ][setKey]
                                                ? inputsPricing[catKey][
                                                    "CategorySettings"
                                                  ][setKey]["subtype_val"]
                                                : ""
                                              : ""
                                          }
                                          catKey={catKey}
                                          setKey={setKey}
                                          categoryid={category.Categoryid}
                                          csid={categorySettings.csid}
                                          hid={categorySettings.hid}
                                          vcids={category.Categoryid}
                                          grpcid={categorySettings.grpcid}
                                          propsValue={true}
                                          onChange={(e) =>
                                            handlePricingInputChange(
                                              "type_val",
                                              e.target.value,
                                              {
                                                catKey,
                                                setKey,
                                                categoryid: category.Categoryid,
                                                csid: categorySettings.csid,
                                                hid: categorySettings.hid,
                                                vcids: category.Categoryid,
                                                grpcid: categorySettings.grpcid,
                                              }
                                            )
                                          }
                                        />
                                      </div>
                                    </>
                                  ) : categorySettings.head_subtype === "2" ? (
                                    <>
                                      <div className="flex items-center gap-[1rem]">
                                        <h5 className="font-semibold flex flex-col w-[8rem] md:w-[14rem] ">
                                          {categorySettings.head_subtitle}{" "}
                                        </h5>

                                        <div className="flex gap-[1rem]">
                                          {/* price per head */}
                                          <button
                                            className={`yes-check-button ${
                                              isActive[category.Categoryid] ===
                                                1 ||
                                              (categorySettings.subtype_val ===
                                                "1" &&
                                                categorySettings.min_max == "0")
                                                ? "selected"
                                                : ""
                                            }`}
                                            label={
                                              categorySettings.head_subtitle
                                            }
                                            placeholder={
                                              categorySettings.head_subtitle
                                            }
                                            name="subtype_val"
                                            value={
                                              inputsPricing[catKey]
                                                ? inputsPricing[catKey][
                                                    "CategorySettings"
                                                  ]
                                                  ? inputsPricing[catKey][
                                                      "CategorySettings"
                                                    ][setKey]
                                                    ? inputsPricing[catKey][
                                                        "CategorySettings"
                                                      ][setKey]["subtype_val"]
                                                    : ""
                                                  : ""
                                                : ""
                                            }
                                            catKey={catKey}
                                            setKey={setKey}
                                            categoryid={category.Categoryid}
                                            csid={categorySettings.csid}
                                            hid={categorySettings.hid}
                                            vcids={category.Categoryid}
                                            grpcid={categorySettings.grpcid}
                                            propsValue={true}
                                            onClick={(e) => {
                                              console.log(
                                                "categorySettings.subtype_val:",
                                                categorySettings.subtype_val
                                              );
                                              handlePricingInputChange(
                                                "subtype_val",
                                                1,
                                                {
                                                  catKey,
                                                  setKey,
                                                  categoryid:
                                                    category.Categoryid,
                                                  csid: categorySettings.csid,
                                                  hid: categorySettings.hid,
                                                  vcids: category.Categoryid,
                                                  grpcid:
                                                    categorySettings.grpcid,
                                                  min_max:
                                                    categorySettings.min_max,
                                                }
                                              );
                                            }}
                                          >
                                            Yes
                                          </button>
                                          {/* No */}
                                          <button
                                            className={`no-check-button ${
                                              isActive[category.Categoryid] ===
                                                0 ||
                                              (categorySettings.subtype_val ===
                                                "0" &&
                                                categorySettings.min_max == "0")
                                                ? "selected"
                                                : ""
                                            }`}
                                            containerClass=""
                                            label={
                                              categorySettings.head_subtitle
                                            }
                                            placeholder={
                                              categorySettings.head_subtitle
                                            }
                                            name="subtype_val"
                                            value={
                                              inputsPricing[catKey]
                                                ? inputsPricing[catKey][
                                                    "CategorySettings"
                                                  ]
                                                  ? inputsPricing[catKey][
                                                      "CategorySettings"
                                                    ][setKey]
                                                    ? inputsPricing[catKey][
                                                        "CategorySettings"
                                                      ][setKey]["subtype_val"]
                                                    : ""
                                                  : ""
                                                : ""
                                            }
                                            catKey={catKey}
                                            setKey={setKey}
                                            categoryid={category.Categoryid}
                                            csid={categorySettings.csid}
                                            hid={categorySettings.hid}
                                            vcids={category.Categoryid}
                                            grpcid={categorySettings.grpcid}
                                            propsValue={true}
                                            onClick={(e) => {
                                              console.log(
                                                "No categorySettings.subtype_val",
                                                categorySettings.subtype_val
                                              );
                                              handlePricingInputChange(
                                                "subtype_val",
                                                0,
                                                {
                                                  catKey,
                                                  setKey,
                                                  categoryid:
                                                    category.Categoryid,
                                                  csid: categorySettings.csid,
                                                  hid: categorySettings.hid,
                                                  vcids: category.Categoryid,
                                                  grpcid:
                                                    categorySettings.grpcid,
                                                  min_max:
                                                    categorySettings.min_max,
                                                }
                                              );
                                            }}
                                          >
                                            No
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}

                    <div
                      className="flex justify-center"
                      onClick={handlePricingSubmit}
                    >
                      <button className="mt-[2rem] flex justify-center items-center w-[120px] h-[40px] rounded-full bg-[#6cc2bc] text-[16px] text-white font-bold cursor-pointer">
                        Save
                      </button>
                    </div>
                  </div>
                </AccordionDetails>
              </StyledAccordion>
            ) : (
              skeletonLines.map((line, index) => (
                <div key={index}>
                  <Skeleton
                    variant={line.variant}
                    sx={{ width: line.width, height: line.height }}
                  />
                  <br />
                </div>
              ))
            )}
          </div>

          {/* Venue inclusion */}
          {/* Venue Amenities and Service */}
          <div>
            {viewProfile
              ? viewProfile.inclusions && (
                  <StyledAccordion
                    expanded={expanded === "panel5"}
                    onChange={(e, isExpanded) =>
                      handleChange(isExpanded, "panel5")
                    }
                  >
                    <AccordionSummary
                      style={{
                        paddingLeft:
                          expanded === "panel5"
                            ? isScreenSizeAbove1250px
                              ? "2rem"
                              : "1rem"
                            : "0",
                      }}
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
                          {expanded === "panel5" ? (
                            <RxTriangleUp size={30} color="#6cc2bc" />
                          ) : (
                            "Edit"
                          )}
                        </Typography>
                      }
                      sx={{
                        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":
                          {
                            transform: "rotate(0deg)",
                            color: "black",
                          },
                      }}
                    >
                      <div>
                        <h4 className="profile-listing-header">
                          Venue Inclusions
                        </h4>
                        {!expanded ? (
                          <>
                            <p style={{ marginTop: "10px" }}>
                              {formattedInclsuionsData.map(
                                (formattedString, index) => (
                                  <div key={index}>{formattedString}</div>
                                )
                              )}
                            </p>
                          </>
                        ) : (
                          <p className="myprofile-accordion-subheading">
                            Add Your Venue Inclusions
                          </p>
                        )}
                      </div>
                    </AccordionSummary>

                    <AccordionDetails
                      style={{
                        paddingLeft:
                          expanded === "panel5"
                            ? isScreenSizeAbove1250px
                              ? "2rem"
                              : "1rem"
                            : "0",
                      }}
                    >
                      {viewProfile.inclusions.map((inclusion, index) => (
                        <div className="mt-[0px]" key={inclusion.inchid}>
                          <div>
                            {/* Additional fields for "wedding_venue" */}
                            <>
                              <br />
                              {/* Venue Amenities */}
                              <Stack spacing={1} direction="row">
                                <div className="pricing-addon-label ">
                                  <span className="l">{inclusion.title}:</span>
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
                                    <Grid
                                      container
                                      spacing={1}
                                      container={false}
                                    >
                                      {inclusion.values.map((value) => (
                                        <Grid
                                          item
                                          key={index}
                                          direction="column"
                                        >
                                          <FormControlLabel
                                            control={
                                              <Checkbox
                                                checked={
                                                  selectedInclusions[
                                                    inclusion.inchid
                                                  ]?.selectedValues?.[
                                                    value.incid
                                                  ] || value.type_val === "1"
                                                }
                                                onChange={(e) =>
                                                  handleInclusionChange(
                                                    inclusion.inchid,
                                                    inclusion.title,
                                                    value.incid,
                                                    value.title,
                                                    e.target.checked
                                                  )
                                                }
                                              />
                                            }
                                            label={
                                              <Typography
                                                sx={{ whiteSpace: "normal" }}
                                              >
                                                {value.title}
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
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-center">
                        <button
                          className="mt-[2rem] flex justify-center items-center w-[120px] h-[40px] rounded-full bg-[#6cc2bc] text-[16px] text-white font-bold cursor-pointer"
                          onClick={handleInclusionSubmit}
                        >
                          Save
                        </button>
                      </div>
                    </AccordionDetails>
                  </StyledAccordion>
                )
              : skeletonLines.map((line, index) => (
                  <div key={index}>
                    <Skeleton
                      variant={line.variant}
                      sx={{ width: line.width, height: line.height }}
                    />
                    <br />
                  </div>
                ))}
          </div>
          {/* QandA */}
          <StyledAccordion
            expanded={expanded === "panel6"}
            onChange={(e, isExpanded) => handleChange(isExpanded, "panel6")}
          >
            <AccordionSummary
              style={{
                borderTop: "none",
                paddingLeft:
                  expanded === "panel6"
                    ? isScreenSizeAbove1250px
                      ? "2rem"
                      : "1rem"
                    : "0",
              }}
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
                  {expanded === "panel6" ? (
                    <RxTriangleUp size={30} color="#6cc2bc" />
                  ) : (
                    "Edit"
                  )}
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
                {saveClicked && questionDisplay && !expanded ? (
                  <div className="whitespace-break-spaces mt-[10px]">
                    {questionDisplay || formattedQandADisplay}
                  </div>
                ) : expanded ||
                  (questionDisplay && questionDisplay.length > 0) ? null : (
                  <p className="myprofile-accordion-subheading">
                    {formattedQandADisplay ||
                      "Add the most common Q&A your business is asked, this helps couples get to know you further."}
                  </p>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails
              style={{
                paddingLeft:
                  expanded === "panel6"
                    ? isScreenSizeAbove1250px
                      ? "2rem"
                      : "1rem"
                    : "0",
              }}
            >
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
                              onChange={(e) => {
                                handleQandAWordCount(e.target.value);
                                handleQandAhandleChange(
                                  e.target.value,
                                  question.id,
                                  "question"
                                );
                              }}
                            />
                            {qandaWordCountError && (
                              <p className="error">Max word limit: 50 words</p>
                            )}
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
                            onChange={(e) =>
                              handleQandAhandleChange(
                                e.target.value,
                                question.id,
                                "answer"
                              )
                            }
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
                        onClick={handleQuestionSubmit}
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
          <div>
            <StyledAccordion
              expanded={expanded === "panel7"}
              onChange={(e, isExpanded) => handleChange(isExpanded, "panel7")}
            >
              <AccordionSummary
                style={{
                  paddingLeft:
                    expanded === "panel7"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
                id="panel7-header"
                aria-controls="panel7-content"
                expandIcon={
                  <Typography
                    sx={{
                      color: "black",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {expanded === "panel7" ? (
                      <RxTriangleUp size={30} color="#6cc2bc" />
                    ) : (
                      "Edit"
                    )}
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
                    <>
                      {packagesText || (
                        <>
                          {viewProfile.packageFile
                            ? "Package Updated: Yes"
                            : "Package Updated: No"}
                        </>
                      )}
                      {/* {" "}
                        {viewProfile.package_file ||
                        (uploadedFileName && saveClicked)
                          ? "Package Updated: Yes"
                          : "Package Updated: No"} */}
                    </>

                    <br />
                    <br />
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  paddingLeft:
                    expanded === "panel7"
                      ? isScreenSizeAbove1250px
                        ? "2rem"
                        : "1rem"
                      : "0",
                }}
              >
                <div>
                  <div className="myprofile-accordion-item-header">
                    {/* <span className="myprofile-edit-button">Edit</span> */}
                  </div>
                  <div className="package-panel-container">
                    <div>
                      <span className="text-[14px] mt-[10px]">
                        Add a PDF file, maximum 5MB. You are responsible to
                        ensure the information in your PDF is up to date.
                      </span>
                    </div>
                    <br />

                    <div className="flex justify-start items-center gap-[1rem]">
                      {viewProfile.package_file && (
                        <>
                          <label
                            htmlFor="upload-files"
                            className="text-[14px] cursor-pointer"
                          >
                            File Uploaded:{" "}
                            {uploadedFileName || viewProfile.package_file}
                          </label>
                          <NavLink to={viewFile.packageFile} title="View">
                            <HiOutlineViewfinderCircle size={24} />
                          </NavLink>
                          <button title="Delete" onClick={deletePackage}>
                            <MdDelete size={24} />
                          </button>
                        </>
                      )}
                    </div>

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
    </div>
  );
};

export default Profile;
