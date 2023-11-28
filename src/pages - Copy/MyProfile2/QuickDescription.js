import React, { useState } from "react";
import { RxTriangleUp } from "react-icons/rx";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "./QuickDescription.css";
import ShowMoreText from "react-show-more-text";

const QuickDescription = ({ handleAccordionChange }) => {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [showSubmittedText, setShowSubmittedText] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e) => {
    setText(e.target.value);
    setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
  };

  const handleSubmit = () => {
    if (text) {
      setWordCount(0);
      console.log("Submitted text:", text); // Display submitted text in console
      setShowSubmittedText(true); // Display the submitted text
      setSubmittedText(text);
      setText("");
      handleAccordionChange();

      const accordionItemButton = document.getElementById(
        "accordion__heading-1"
      );
      accordionItemButton.setAttribute("aria-expanded", "false");
      const accordionPanel = document.getElementById("accordion__panel-1");
      accordionPanel.setAttribute("hidden", "true");
    }
  };

  // Stop the event propagation
  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setText("");
    setWordCount(0);
    handleAccordionChange();
    // const accordionItemButton = document.getElementById("accordion__heading-1");
    // accordionItemButton.setAttribute("aria-expanded", "false");
    // const accordionPanel = document.getElementById("accordion__panel-1");
    // accordionPanel.setAttribute("hidden", "true");
  };

  const wordLimit = 100;

  const displayText = showSubmittedText
    ? submittedText
    : "Display a quick summary of your business. Tip include what your service is and your location.";

  // console.log("toggleAccordion prop:", toggleAccordion);

  return (
    <div className="">
      <AccordionItemHeading>
        <AccordionItemButton className="myprofile-accordion-button">
          <div className="myprofile-accordion-item-header">
            <h4 className="myprofile-heading-expand">Quick Description</h4>
            <span className="myprofile-edit-button">Edit</span>
            <RxTriangleUp size={30} className="myprofile-up-aroww" />
          </div>
          <div
            id="textarea"
            value={text}
            className="myprofile-accordion-subheading"
            onChange={handleTextChange}
          >
            <ShowMoreText
              lines={5}
              more="Show more"
              less="Show less"
              anchorClass="display-showmore"
              expanded={false}
              width={0}
            >
              <p>{displayText}</p>
            </ShowMoreText>
          </div>
          {/* <span className="quickdesc-summary">{quickDesc}</span> */}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel onClick={handlePanelClick}>
        <div className="mt-[0px]">
          <div className="profile-editor-position">
            <textarea
              id="text-area"
              value={text}
              onChange={handleTextChange}
              className="myprofile-textarea-style"
            />
            <span className="text-[12px] mt-[5px]">
              {wordCount}/{wordLimit}
            </span>
            <div className="myprofile-button-group">
              <button
                className="myprofile-cancel-button"
                onClick={() => {
                  // handleClose();
                  // handleAccordionChange(); // Call the function to update the accordion state
                }}
              >
                Cancel
              </button>
              <div className="myprofile-save-button" onClick={handleSubmit}>
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </AccordionItemPanel>
    </div>
  );
};

export default QuickDescription;
