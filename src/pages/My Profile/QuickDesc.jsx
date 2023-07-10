import React, { useState } from "react";
import "./QuickDesc.css";
import { RxTriangleUp } from "react-icons/rx";

const QuickDesc = ({ onQuickDescriptionSubmit }) => {
  const [myprofileInputDescription, setMyProfileInputDescription] =
    useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleQuickDescriptionChange = (e) => {
    console.log(e.target.value);
    const inputValue = e.target.value;
    setMyProfileInputDescription(e.target.value);
    setWordCount(inputValue.split(" ").length);
  };

  const handleQuickDescSubmit = () => {
    onQuickDescriptionSubmit(myprofileInputDescription);
    setMyProfileInputDescription("");
    setWordCount(0);
  };

  const handleCancel = () => {
    setMyProfileInputDescription("");
    setWordCount(0);
  };

  const wordLimit = 100;

  return (
    <div>
      <div className="flex flex-col">
        <div className="">
          <span className="text-[16px] font-semibold">Quick Description </span>
          <RxTriangleUp size={30} className="quickdescription-down-aroww" />
        </div>
        <span className="text-[14px] mt-[10px]">
          Display aquick summary of your business. Tip include what your service
          is and your location.
        </span>
        <textarea
          className="myprofile-textarea-style"
          value={myprofileInputDescription}
          onChange={handleQuickDescriptionChange}
          // maxLength={100}
        />
        <span>
          {wordCount}/{wordLimit}
        </span>
        <div className="quickdec-button-group">
          <button className="myprofile-cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <div
            className="myprofile-save-button"
            onClick={handleQuickDescSubmit}
          >
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickDesc;
