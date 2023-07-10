import React, { useState } from "react";
import { RxTriangleUp } from "react-icons/rx";
import "./FullDescription.css";
import DraftEditor from "../../third-party-packs/Editor-Draft/DraftEditor";

const FullDescription = ({ onFullDescriptionSubmit }) => {
  const [myprofileFulltDescription, setMyProfileFullDescription] = useState("");

  const handlefullDescSubmit = (content) => {
    setMyProfileFullDescription(content);
    onFullDescriptionSubmit(content);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="">
          <span className="text-[16px] font-semibold">Full Description </span>
          <RxTriangleUp size={30} className="fulldescription-down-aroww" />
        </div>
        <span className="text-[14px] mt-[10px]">
          Give couples a sense of what is included when they book [business
          name]. Include information such as locations, inclusions, starting
          places etc.
        </span>
        <DraftEditor
          value={myprofileFulltDescription}
          onDraftEditorSubmit={handlefullDescSubmit}
        />
      </div>
    </div>
  );
};

export default FullDescription;
