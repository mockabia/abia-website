import React, { useState } from "react";
import "./MeetTheOwner2.css";
import { RxTriangleUp } from "react-icons/rx";
import Cropper from "../../components/Cropper";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import ShowMoreText from "react-show-more-text";

const MeetTheOwner2 = ({ handleOwnerAccordionChange }) => {
  // const [inputmeetTheOwner, setInputmeetTheOwner] = useState("");
  const [displayDesc, setDisplayDesc] = useState("");
  const [ownerInputDesc, setOwnerInputDesc] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [croppedImage, setCroppedImage] = useState("");
  const [selectedRadioOption, setSelectedRadioOption] = useState("The Owner");
  const [isEditMode, setIsEditMode] = useState(false); // Step 1

  const handleTextareaChange = (e) => {
    const inputValue = e.target.value;
    setOwnerInputDesc(e.target.value);
    setWordCount(inputValue.split(" ").length);
  };
  const handleRadioChange = (value) => {
    setSelectedRadioOption(value);
  };

  const handleSaveButtonClick = () => {
    // console.log("Textarea Value:", ownerInputDesc);
    // console.log("Selected Radio Option:", selectedRadioOption);
    // console.log("Cropped image:", croppedImage);
    setDisplayDesc(ownerInputDesc);
    setIsEditMode(false);
    setOwnerInputDesc("");
  };

  const handleCroppedImage = (image) => {
    setCroppedImage(image);
  };

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  const wordLimit = 100;
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton className="myprofile-accordion-button">
          <div className="myprofile-accordion-item-header">
            <h4 className="myprofile-heading-expand">Meet the Owner/Team</h4>
            {isEditMode ? null : (
              <span className="myprofile-edit-button">Edit</span>
            )}
            <RxTriangleUp size={30} className="myprofile-up-aroww" />
          </div>
          <div
            id="quickdesc-subheading"
            className="myprofile-accordion-subheading"
          >
            {isEditMode ? (
              <textarea
                className="myprofile-textarea-style"
                value={ownerInputDesc}
                onChange={handleTextareaChange}
              />
            ) : (
              <ShowMoreText
                lines={5}
                more="Show more"
                less="Show less"
                anchorClass="display-showmore"
                expanded={false}
                width={0}
              >
                {!isEditMode && selectedRadioOption && (
                  <div className="selected-radio-option">
                    {displayDesc && (
                      <div>
                        Type: {selectedRadioOption}
                        <br />
                        <br />
                      </div>
                    )}
                  </div>
                )}
                <p className="mt-[5px]">
                  {displayDesc ||
                    "Add a personal touch by letting couples get to know you, add a photo and let us know if you are a team or owner. "}
                </p>
              </ShowMoreText>
            )}
          </div>
          {/* {isEditMode ? (
            <span >{selectedRadioOption}</span>
          ) : null} */}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel onClick={handlePanelClick}>
        <div>
          <div className="meetOwner-panel-container">
            <textarea
              className="myprofile-textarea-style"
              value={ownerInputDesc}
              onChange={handleTextareaChange}
            />
            <br />
            <span className="text-[12px] -mt-[15px]">
              {wordCount}/{wordLimit}
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
                      checked={selectedRadioOption === "The Owner"}
                      onChange={() => handleRadioChange("The Owner")}
                    />
                    <span className="font-semibold">The Owner</span>
                  </label>
                </div>

                <div>
                  <label className="space-x-2 flex items-center">
                    <input
                      type="radio"
                      value="The Team"
                      checked={selectedRadioOption === "The Team"}
                      onChange={() => handleRadioChange("The Team")}
                    />
                    <span className="font-semibold">The Team</span>
                  </label>
                </div>
              </div>
              <div className="owner-avatar-cropper">
                <Cropper onChangeImageSelect={handleCroppedImage} />
              </div>
            </div>

            <div className="myprofile-button-group relative">
              <button className="myprofile-cancel-button">Cancel</button>
              <div
                className="myprofile-save-button"
                onClick={handleSaveButtonClick}
              >
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default MeetTheOwner2;
