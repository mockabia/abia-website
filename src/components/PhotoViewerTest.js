import { Box, Modal, Slider, Button } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import profile from "../icons/add-image.svg";
import { BiUpload } from "react-icons/bi";
import "./PhotoBoxCropper.css";

// Styles

// Container
const PhotoViewerTest = () => {
  // image src



  return (
    <>
      <div className="mt-[15px]">
        <main className="photo-cropper-container">
          <div className="flex">
            <div className="md:flex">
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImgChange}
                multiple
              />
              <div
                className="photo-cropper-img-container"
                onClick={handleInputClick}
              >
                <img className="photos-add-button" src={profile} alt="" />
              </div>
            </div>
            {preview !== null && (
              <div className="photo-cropper-img-container">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <div></div>
        </main>
      </div>
    </>
  );
};

export default PhotoViewerTest;
