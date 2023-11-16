import React, { useState } from "react";
import "./Pricing2.css";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { RxTriangleUp } from "react-icons/rx";

const Pricing2 = () => {
  const [displayContent, setDisplayContent] = useState(
    "Add a Starting Price. It is not mandatory to display your prices."
  );
  const [amount, setAmount] = useState("");
  const [displayPrice, setDisplayPrice] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);
  const [pricingDetails, setPricingDetails] = useState("");

  const handleSave = () => {
    setSaveClicked(true);
    console.log("Amount:", amount);
    console.log("Display Price:", displayPrice);
    // Update the detailed content based on conditions
    let newContent = "";
    if (saveClicked && displayPrice) {
      newContent = "You are responsible for updating your prices\n";
    }
    if (saveClicked) {
      newContent += ` Starting Price: ${amount}\n`;
    }
    if (saveClicked) {
      newContent += ` Display Price: ${displayPrice ? "Yes" : "No"}`;
    }
    setDisplayContent(newContent);
  };

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton className="myprofile-accordion-button">
            <div className="myprofile-accordion-item-header-2">
              <span className="profile-listing-header">Pricing</span>
              <span className="myprofile-edit-button">Edit</span>
              <RxTriangleUp size={30} className="myprofile-up-aroww" />
            </div>
            <div
              id="quickdesc-subheading"
              className="myprofile-accordion-subheading-pricing"
            >
              {/* className="myprofile-accordion-subheading-pricing" */}
              <p className="whitespace-break-spaces">{displayContent}</p>
            </div>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel onClick={handlePanelClick}>
          <div className="">
            <div className="pricing-panel-container ">
              <div className="text-[14px]">
                <p className="whitespace-break-spaces">
                  Add your starting price. Not mandatory.
                </p>
                <div className="hidden">
                  {saveClicked && displayPrice && (
                    <p>You are responsible for updating your prices</p>
                  )}
                  {saveClicked && <p>{"Starting Price: " + amount}</p>}

                  {saveClicked && (
                    <p>{"Display Price: " + (displayPrice ? "Yes" : "No")}</p>
                  )}
                </div>
              </div>
              <div className="mt-[10px] relative">
                <span className="dollar-icon"></span>
                <input
                  type="text"
                  inputMode="tel"
                  required
                  className="pricing-input-style"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="myprofile-button-group relative">
                {/* quickdec-button-group */}
                <div className="mt-[15px]">
                  <span className="font-semibold">Display Price ?</span>
                  <div className="mt-[15px] space-x-2">
                    <button
                      className="yes-button"
                      onClick={() => setDisplayPrice(true)}
                    >
                      Yes
                    </button>
                    <button
                      className="no-button"
                      onClick={() => setDisplayPrice(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="pricing-save-button">
                  <button onClick={handleSave}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    </div>
  );
};

export default Pricing2;
