import React from "react";
import VideoUploader from "../../../components/VideoUploader";
import { RxTriangleUp } from "react-icons/rx";

const myProfileVideo = ({vendorID}) => {
  return (
    <div className="mt-[10px] mb-[1rem]">
      {/* <PhotoBoxCropper /> */}
      <div className="flex flex-col">
        <div>
          <VideoUploader vendorID={vendorID}/>
        </div>
      </div>
      {/* <hr className="mt-[20px] w-[83%]" /> */}
    </div>
  );
};

export default myProfileVideo;
