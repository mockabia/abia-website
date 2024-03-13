import React from "react";
import VideoUploader from "./VideoUploader";


const myProfileVideo = ({ vendorID }) => {
  return (
    <div className="mt-[10px] mb-[1rem]">
      {/* <PhotoBoxCropper /> */}
      <div className="flex flex-col">
        <div>
          <VideoUploader vendorID={vendorID} />
        </div>
      </div>
    </div>
  );
};

export default myProfileVideo;
