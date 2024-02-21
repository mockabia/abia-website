import React, { useState, useEffect } from "react";
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

import PhotoGalleryTest from "../../pages - Copy/My Profile/photos&videos/MyProfile-PhotoUplaoder/PhotoGalleryTest";
import VideoGallery from "../../pages - Copy/My Profile/photos&videos/myProfileVideo";
import { StyledAccordion } from "../../components/FormStyle";
import * as BusinessJS from "../Business/Business";
import Skeleton from "@mui/material/Skeleton";
import { Preview } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const toolbarOptions = {
  options: ["inline", "list"],
  inline: {
    options: ["bold", "italic"],
  },
  list: {
    options: ["unordered", "ordered"],
  },
};

const Profile = ({ preview }) => {
  const [viewProfile, setViewProfile] = useState("");

  const [previewListing, setPreviewListing] = useState("");
  const [vendorinputs, setVendorInputs] = useState("");
  const vendorID = vendorinputs.vid;
  const businessID = vendorinputs.id;
  const isScreenSizeAbove1250px = window.innerWidth > 1250;
  const [expanded, setExpanded] = useState(false);

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
  const [questionDisplay, setQuestionDisplay] = useState([]);
  const [qwordCount, setQwordCount] = useState(0);
  const [qandaWordCountError, setqandaWordCountError] = useState(false);
  // const [inputsErrors, setInputsErrors] = useState({});
  const [questionRes, setQuestionRes] = useState({});
  const [deleteQA, setDeleteQA] = useState("");
  const [viewQandA, setViewQandA] = useState({});
  // Pricing
  const [inputsPricing, setInputsPricing] = useState([]);
  const [inputsPriceErrors, setInputsPriceErrors] = useState({});
  const [pricingDisplayStates, setPricingDisplayStates] = useState({});
  const [accomState, setAccomState] = useState({});
  const [capacity, setCapacity] = useState({});
  const [cockTail, setCockTail] = useState({});
  const [seated, setSeated] = useState({});
  // const [inputsErrors, setInputsErrors] = useState({});
  const [pricingFormValue, setPricingFormValue] = useState({});
  const [pformValues, setPFormValues] = useState({});
  // Inclusion
  const [selectedInclusions, setSelectedInclusions] = useState({});
  // expansion handling
  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };

  //preview listing
  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching data...");
      await BusinessJS.fetchbusiness(setVendorInputs, setpreviewSet);
      if (vendorID) {
        await BusinessJS.vendorView(setPreviewListing, vendorID, setpreviewSet);
      }
    };
    fetchData();
  }, [vendorID]);

  // viewprofile
  useEffect(() => {
    BusinessJS.viewProfileSettings(vendorID, setViewProfile);
  }, [vendorID]);
  console.log("View profile:", viewProfile);

  const skeletonLines = [
    { variant: "text", height: "1rem" },
    { variant: "rectangular", width: "100%", height: "5rem" },
  ];

  /******* Pricing  ***********/
  // Handle pricing input change
  // const handlePricingInputChange = (categoryID, value) => {
  //   setPricingInputs((prevInputs) => ({
  //     ...prevInputs,
  //     [categoryID]: value,
  //   }));
  // };

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
      pricingArray[catKey]["CategorySettings"][setKey]["csid"] = props.csid;
      pricingArray[catKey]["CategorySettings"][setKey]["hid"] = props.hid;
      pricingArray[catKey]["CategorySettings"][setKey]["vcids"] = props.vcids;
      pricingArray[catKey]["CategorySettings"][setKey]["grpcid"] = props.grpcid;
      pricingArray[catKey]["CategorySettings"][setKey][name] = value;

      setInputsPricing(pricingArray);
    } else {
      let catKey = props.catKey;
      let setKey = props.setKey;
      let pricingArray = [];

      pricingArray[catKey] = {};
      pricingArray[catKey]["categoryid"] = props.categoryid;
      pricingArray[catKey]["CategorySettings"] = [];
      pricingArray[catKey]["CategorySettings"][setKey] = {};
      pricingArray[catKey]["CategorySettings"][setKey]["csid"] = props.csid;
      pricingArray[catKey]["CategorySettings"][setKey]["hid"] = props.hid;
      pricingArray[catKey]["CategorySettings"][setKey]["vcids"] = props.vcids;
      pricingArray[catKey]["CategorySettings"][setKey]["grpcid"] = props.grpcid;
      pricingArray[catKey]["CategorySettings"][setKey][name] = value;

      setInputsPricing(pricingArray);
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

  // const handlePricingSubmit = () => {
  //   setSaveClicked(true);
  //   setExpanded(false);

  //   // Create the output object
  //   const newFormValues = {};
  //   viewProfile.Category.forEach((category) => {
  //     const categoryId = category.Categoryid;
  //     newFormValues[categoryId] = {
  //       display_price: pricingDisplayStates[categoryId] === 1 ? "1" : "0",
  //       pricepp: pricingInputs[categoryId] || "0",
  //       accomodation: accomState[categoryId] === 1 ? "1" : "0",
  //       capacity: capacity[categoryId] || "0",
  //       cockTail: cockTail[categoryId] || "0",
  //       seated: seated[categoryId] || "0",
  //     };
  //   });

  //   // Set formValues state
  //   setPFormValues(newFormValues);

  //   // Log the formValues
  //   console.log("Formvalues:", newFormValues);

  //   // Update business profile
  //   BusinessJS.updateBusinessMyProfile(
  //     newFormValues,
  //     vendorID,
  //     3,
  //     setInputsErrors,
  //     setVendorInputs
  //   );
  // };

  const handleInclusionSubmit = () => {
    setSaveClicked(true);
    setExpanded(false);

    const inclusionFromValues = {
      vid: vendorID,
      inclusionValues: Object.values(selectedInclusions)
        .map((data) => Object.keys(data.selectedValues))
        .flat(),
    };
    BusinessJS.updateBusinessMyProfile(
      inclusionFromValues,
      vendorID,
      8,
      setInputsErrors,
      setVendorInputs
    );
    console.log("Selected inclusion:", inclusionFromValues);

    // The rest of your logic...
  };

  const handlePricingSubmit = () => {
    setSaveClicked(true);
    setExpanded(false);

    // Create the output array
    const newFormValues = viewProfile.Category.map((category) => {
      const categoryId = category.Categoryid;

      // Map each category setting to the new structure
      const categorySettings = category.CategorySettings.map((setting) => {
        const csid = setting.csid;
        const hid = setting.hid;
        const vcids = setting.vcids;
        const grpcid = setting.grpcid;

        // Determine the type_val based on the setting type
        let type_val;
        switch (setting.head_title) {
          case "Price per head":
            // type_val = pricingInputs[categoryId] || "0";
            break;
          case "Enable Seated":
            type_val = seated[categoryId] || "0";
            break;
          case "Capacity":
            type_val = capacity[categoryId] || "0";
            break;
          // Add cases for other settings as needed
          default:
            type_val = "0";
        }

        // Determine the subtype_val based on the setting subtype
        let subtype_val;
        switch (setting.head_subtype) {
          case "1":
            subtype_val = 1;
            break;
          case "2":
            // subtype_val = pricingInputs[categoryId] || "0";
            break;
          // Add cases for other subtypes as needed
          default:
            subtype_val = 1; // Set to 1 by default
        }

        return {
          csid,
          hid,
          vcids,
          grpcid,
          type_val,
          subtype_val,
        };
      });

      return {
        categoryid: categoryId,
        CategorySettings: categorySettings,
      };
    });

    // Log the formValues
    console.log("Formvalues:", newFormValues);

    // Update business profile
    BusinessJS.updateBusinessMyProfile(
      newFormValues,
      vendorID,
      3,
      setInputsErrors,
      setVendorInputs
    );
    setPricingFormValue(newFormValues);
  };

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
                  <h4 className="profile-listing-header">Pricing</h4>
                  {saveClicked && !expanded ? (
                    <>
                      {Array.isArray(pricingFormValue) &&
                      pricingFormValue.length > 0 ? (
                        pricingFormValue.map((category) => (
                          <div key={category.categoryid}>
                            {category.CategorySettings.some(
                              (setting) => setting.type_val !== "0"
                            ) ? (
                              <div className="myprofile-accordion-subheading">
                                {category.CategorySettings.map((setting) => (
                                  <p key={setting.csid}>
                                    {setting.head_title}: {setting.type_val}
                                  </p>
                                ))}
                              </div>
                            ) : (
                              <p className="myprofile-accordion-subheading">
                                Display Price: No
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="myprofile-accordion-subheading">
                          Add a Starting Price. It is not mandatory to display
                          your prices.
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="myprofile-accordion-subheading">
                      Add a Starting Price. It is not mandatory to display your
                      prices.
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
                        <div>
                          <div className="pricing-category-label-section">
                            <span className="pricing-cate-label">
                              {" "}
                              {category.CategoryName}
                            </span>
                          </div>
                          {/* Category fields */}
                          {category.CategorySettings.map(
                            (categorySettings, setKey) => (
                              <div key={setKey}>
                                {categorySettings.min_max === "1" ? (
                                  <>
                                    <p>{categorySettings.head_title}</p>
                                    <div className="flex">
                                      <h5 className="font-semibold flex flex-col">
                                        {categorySettings.head_title}
                                      </h5>
                                      <input
                                        type="text"
                                        className="pricing-input-style"
                                        containerClass=""
                                        placeholder={`${categorySettings.head_title} min`}
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
                                        handleChange={handlePricingInputChange}
                                      />
                                      <input
                                        type="text"
                                        className="pricing-input-style"
                                        containerClass=""
                                        placeholder={`${categorySettings.head_title} max`}
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
                                        handleChange={handlePricingInputChange}
                                      />
                                    </div>
                                  </>
                                ) : categorySettings.head_titletype === "1" ? (
                                  <>
                                    <h5 className="font-semibold flex flex-col">
                                      {categorySettings.head_title}
                                    </h5>
                                    <input
                                      type="text"
                                      className="pricing-input-style"
                                      containerClass=""
                                      label={categorySettings.head_title}
                                      placeholder={categorySettings.head_title}
                                      name="type_val"
                                      value={
                                        inputsPricing[catKey]?.CategorySettings[
                                          setKey
                                        ]?.type_val || ""
                                      }
                                      catKey={catKey}
                                      setKey={setKey}
                                      categoryid={category.Categoryid}
                                      csid={categorySettings.csid}
                                      hid={categorySettings.hid}
                                      vcids={category.Categoryid}
                                      grpcid={categorySettings.grpcid}
                                      propsValue={true}
                                      handleChange={handlePricingInputChange}
                                    />
                                  </>
                                ) : categorySettings.head_titletype === "2" ? (
                                  <>
                                    <h5 className="font-semibold flex flex-col">
                                      {categorySettings.head_title}
                                    </h5>
                                    <Checkbox
                                      className=""
                                      containerClass=""
                                      label={categorySettings.head_title}
                                      placeholder={categorySettings.head_title}
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
                                      handleChange={handlePricingInputChange}
                                    />
                                  </>
                                ) : null}
                                {categorySettings.head_subtype === "1" ? (
                                  <>
                                    <h5 className="font-semibold flex flex-col">
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
                                      handleChange={handlePricingInputChange}
                                    />
                                  </>
                                ) : categorySettings.head_subtype === "2" ? (
                                  <>
                                    <div className="flex items-center">
                                      <h5 className="font-semibold flex flex-col">
                                        {categorySettings.head_subtitle}
                                      </h5>
                                      <Checkbox
                                        className="yes-button"
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
                                        handleChange={handlePricingInputChange}
                                      />
                                      <div className="mt-[10px] space-x-2">
                                        <button className="yes-button">
                                          Yes
                                        </button>
                                        <button className="no-button">
                                          No
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                ) : null}
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
                  expanded={expanded === "venueAmenities"}
                  onChange={(e, isExpanded) =>
                    handleChange(isExpanded, "venueAmenities")
                  }
                >
                  <AccordionSummary
                    style={{
                      paddingLeft:
                        expanded === "venueAmenities"
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
                        {expanded === "venueAmenities" ? (
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
                      <h4 className="profile-listing-header">
                        Venue Inclusions
                      </h4>
                      {saveClicked && !expanded ? (
                        <>
                          {Object.entries(selectedInclusions).map(
                            ([inchid, data]) => (
                              <p
                                key={inchid}
                                className="myprofile-accordion-subheading"
                              >
                                {data.incTitle}:{" "}
                                {Object.values(data.selectedValues).join(", ")}
                              </p>
                            )
                          )}
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
                        expanded === "venueAmenities"
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
                                  <Grid container spacing={1} container={false}>
                                    {inclusion.values.map((value) => (
                                      <Grid item key={index} direction="column">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                selectedInclusions[
                                                  inclusion.inchid
                                                ]?.selectedValues?.[value.incid]
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
      </div>
    </div>
  );
};

export default Profile;
