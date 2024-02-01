import React, { useEffect, useRef, useState } from "react";
import { Box, Modal, Button, Input, TextField, Textarea } from "@mui/material";
import { ReactComponent as CloseButton } from "../icons/x-solid.svg";
import * as BusinessJs from "../pages/Business/Business";

import "./VideoUploader.css";

import { AiOutlineClose } from "react-icons/ai";
// Styles
const boxStyle = {
  width: "300px",
  height: "400px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const previewStyles = {
  videoPreviewBorder: {
    borderRadius: "20px" /* Adjust the radius value to your preference */,
  },
};

//IModal

const VideoUploader = ({ vendorID }) => {
  const [open, setOpen] = useState(false);
  const [vendorinputs, setVendorInputs] = useState("");

  //for onchange event
  const [videoURLs, setVideoURLs] = useState([]);
  //for submit events
  const [inputValue, setInputValue] = useState("");
  const [inputsErrors, setInputsErrors] = useState({});
  const [deleteVideo, setDeleteVideo] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    BusinessJs.V_viewVideoGallery(setVideoURLs, vendorID);
    console.log("View video gallery:", videoURLs);
  }, [vendorID]);

  const handleOpen = () => {
    setOpen(true);
    inputRef.current.click();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVideoChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleVideoSubmit = (e) => {
    e.preventDefault();
    const videoUrl = inputValue;

    setVideoURLs([...videoURLs, videoUrl.video]);
    const formValues = {
      vid: vendorID,
      video: videoUrl,
    };
    setOpen(false);
    BusinessJs.updateBusinessMyProfile(
      formValues,
      vendorID,
      5,
      setInputsErrors,
      setVendorInputs
    );
  };

  const handleDeleteVideo = async (id, vgid) => {
    try {
      await BusinessJs.V_deleteVideo(setDeleteVideo, id, vgid, 5);

      // Update the state to remove the deleted video
      const updatedVideoURLs = videoURLs.filter((video) => video.vgid !== vgid);
      setVideoURLs(updatedVideoURLs);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <div>
      <div className="video-gallery-container gap-4 relative">
        <label htmlFor="video-upload-select">
          <div className="video-upload-button">
            <input
              id="video-upload-select"
              onClick={handleOpen}
              className="hidden"
              ref={inputRef}
            />
            <span className="video-upload-text">add video</span>
          </div>
        </label>
        {/* Display */}

        {videoURLs.map((element) => (
          <div
            key={element.vgid}
            id={element.vgid}
            className="video-upload-preview"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: element.video.replace(
                  "<iframe ",
                  '<iframe width="100%" height="100%" '
                ),
              }}
            />
            <div className="photopreview-desc">
              <div className="photopreview-image-order">
                <CloseButton
                  className="myprofile-videos-close"
                  onClick={() => handleDeleteVideo(element.vid, element.vgid)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="video-input-style flex flex-col">
          <form onSubmit={handleVideoSubmit}>
            <div className="modal-close cursor-pointer" onClick={handleClose}>
              <AiOutlineClose />
            </div>
            <div className="flex flex-col gap-[8px] justify-center items-center">
              <sPan className="text-[20px] font-semibold">Add Videos</sPan>
              <span>
                Copy & paste embedded codes of your videos from:{" "}
                <span className="mb-[15px]">Youtube/Facebook/Vimeo</span>{" "}
              </span>
            </div>
            <textarea
              className="modal-input-topmargin w-[100%]  md:w-[95%]"
              value={inputValue}
              onChange={handleVideoChange}
            />

            <div className="flex justify-end align-middle mt-[10px]">
              <div className="quickdec-button-group">
                {/* <button className="myprofile-cancel-button">Cancel</button> */}
                <div className="video-save-button">
                  <button onClick={handleVideoSubmit}>Save</button>
                </div>
              </div>
            </div>
          </form>
          <div className=""></div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoUploader;
