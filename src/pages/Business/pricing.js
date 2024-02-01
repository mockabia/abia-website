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
  // Pricing
  const [pricingInputs, setPricingInputs] = useState({});
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

  // viewprofile
  useEffect(() => {
    BusinessJS.viewProfileSettings(vendorID, setViewProfile);
    console.log("View profile:", viewProfile);
  }, [vendorID]);

  useEffect(() => {
    setOwnerImage(viewProfile.teamownerpic || "");
    setDefaultcontent(viewProfile.team_owner_details);
  }, [viewProfile]);
  console.log("Team owner detail:", viewProfile.team_owner_details);

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

  const handleQuickTexChange = (e) => {
    const inputText = e.target.value;
    const currentWordCount = inputText.split(/\s+/).filter(Boolean).length;
    if (currentWordCount <= 100) {
      setQuickText(inputText);
      setWordCount(currentWordCount);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setExpanded(false);
    setSaveClicked(true);
    //
    const formValues = {
      vid: vendorID,
      profile_short_desc: quickText,
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

  const skeletonLines = [
    { variant: "text", height: "1rem" },
    { variant: "rectangular", width: "100%", height: "5rem" },
  ];

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
    setExpanded(false);
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
          {/* PACKAGES */}
          <div>
            {viewProfile ? (
              <StyledAccordion
                expanded={expanded === "panel6"}
                onChange={(e, isExpanded) => handleChange(isExpanded, "panel6")}
              >
                <AccordionSummary
                  style={{
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
                      expanded === "panel6"
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
                        {viewProfile.package_file ||
                          (uploadedFileName && (
                            <>
                              <label
                                htmlFor="upload-files"
                                className="text-[14px] cursor-pointer"
                              >
                                File Uploaded: {uploadedFileName}
                              </label>
                              <NavLink to={viewFile.packageFile} title="View">
                                <HiOutlineViewfinderCircle size={24} />
                              </NavLink>
                              <button title="Delete" onClick={deletePackage}>
                                <MdDelete size={24} />
                              </button>
                            </>
                          ))}
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
