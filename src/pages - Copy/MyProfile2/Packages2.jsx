import React, { useState } from "react";
import "../MyProfile2/Packages2.css";
import { BiUpload } from "react-icons/bi";
import { RxTriangleUp } from "react-icons/rx";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const Packages2 = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [packagesText, setPackagesText] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileUploaded(true);
    } else {
      setFileUploaded(false);
    }

    // Log the fileUploaded status to the console
    console.log("File Uploaded Status:", fileUploaded);
  };

  const handleSave = () => {
    if (fileUploaded) {
      setPackagesText("Package Updated: Yes");
    } else {
      setPackagesText("Package Updated: No");
    }
  };

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton className="myprofile-accordion-button">
          <div className="myprofile-accordion-item-header-2">
            <span className="myprofile-heading-expand profile-listing-header mt-[20px]">
              Packages
            </span>
            <span className="myprofile-edit-button">Edit</span>
            <RxTriangleUp size={30} className="myprofile-up-aroww" />
          </div>
          <div
            id="quickdesc-subheading"
            className="myprofile-accordion-subheading-pricing"
          >
            <>{packagesText || "Package Updated: No"}</>

            <br />
            <br />
          </div>
          {/* <span className="quickdesc-summary">{quickDesc}</span> */}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel onClick={handlePanelClick}>
        <div className="package-panel-container">
          <div>
            <span className="text-[14px] mt-[10px]">
              Add a PDF file, maximum 5MB. You are responsible to ensure the
              information in your PDF is up to date.
            </span>
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
            <div className="myprofile-save-button">
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
          <div id="displayText"></div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default Packages2;
