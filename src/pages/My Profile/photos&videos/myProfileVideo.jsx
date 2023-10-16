import React from "react";
import VideoUploader from "../../../components/VideoUploader";
import { RxTriangleUp } from "react-icons/rx";

const myProfileVideo = () => {
  return (
    <div className="mt-[10px]">
      {/* <PhotoBoxCropper /> */}
      <div className="flex flex-col">
        <div>
          <VideoUploader />
        </div>
      </div>
      <hr className="mt-[20px]" />
    </div>
  );
};

export default myProfileVideo;
