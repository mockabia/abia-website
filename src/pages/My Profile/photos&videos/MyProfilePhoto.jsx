import React from "react";
import PhotoBoxCropper from "../../../components/PhotoBoxCropper";
import { RxTriangleUp } from "react-icons/rx";


const myProfilePhoto = () => {
  return (
    <div>
      {/* <PhotoBoxCropper /> */}
      <div>
        <div className="flex flex-col">
          <div className="">
            <span className="text-[18px] font-semibold">
              PHoto Gallery{" "}
            </span>
            <RxTriangleUp size={30} className="photos-down-aroww" />
          </div>
         
          <div className="mt-[50px]">
            <PhotoBoxCropper />
          </div>
          <div className="quickdec-button-group">
            <button className="myprofile-cancel-button" >
              Cancel
            </button>
            <div
              className="myprofile-save-button"
              // onClick={handleQuickDescSubmit}
            >
              <button>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default myProfilePhoto;
