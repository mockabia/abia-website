import React, { useEffect, useRef, useState } from "react";
import * as BusinessJS from "../../../Business/Business";
import "../../../Style/BusinessProfile.css";

const QuickDesc = ({ quickDisplayContentProp }) => {
  const quickRef = useRef();
  const [quickText, setQuickText] = useState("");
  const [savedText, setSavedText] = useState("");
  const [saveClicked, setSaveClicked] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [inputsErrors, setInputsErrors] = useState({});
  const [previewSet, setpreviewSet] = useState(false);
  const [vendorinputs, setVendorInputs] = useState("");
  const [previewListing, setPreviewListing] = useState("");
  const vendorID = vendorinputs.vid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await BusinessJS.fetchbusiness(setVendorInputs, setpreviewSet);
        if (vendorID) {
          const previewData = await BusinessJS.vendorView(
            setPreviewListing,
            vendorID,
            setpreviewSet
          );
          // Set savedText with previewListing.profile_short_desc
          setSavedText(previewData?.profile_short_desc || ""); // Default to an empty string if profile_short_desc is not available
          quickDisplayContentProp(
            previewData?.profile_short_desc || savedText || ""
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        //   setLoading(false);
      }
    };

    fetchData();
    console.log("Quick desc:", vendorinputs);
  }, [vendorID]);
  console.log("preview Quick desc:", previewListing);

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
    setSaveClicked(true);

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
    setSavedText(inputText);
  };

  const handleCancel = () => {
    // setExpanded(false);
    // setDraftText("");
    setWordCount(0);
  };

  const quickDisplayContent = saveClicked ? (
    <div className="saved-text">Saved Text: {savedText}</div>
  ) : (
    <div className="saved-text">
      Preview Text: {previewListing.profile_short_desc}
    </div>
  );

  return (
    <div>
      <div className="profile-editor-position">
        {/* Display either saved text or previewListing.profile_short_desc */}
        {quickDisplayContent}
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
          <button className="myprofile-cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="myprofile-save-button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickDesc;
