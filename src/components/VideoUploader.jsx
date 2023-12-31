import React, { useRef, useState } from "react";
import { Box, Modal, Button, Input, TextField, Textarea } from "@mui/material";
import ReactPlayer from "react-player";
import { ReactComponent as CloseButton } from "../icons/x-solid.svg";

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

const VideoUploader = () => {
  const [open, setOpen] = useState(false);

  //for onchange event
  const [videoURLs, setVideoURLs] = useState([]);

  //for submit events
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

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
    setVideoURLs([...videoURLs, inputValue]);
    setInputValue("");
    setOpen(false);
  };

  const handleDeleteVideo = (index) => {
    const updatedVideoURLs = [...videoURLs];
    updatedVideoURLs.splice(index, 1);
    setVideoURLs(updatedVideoURLs);
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

        {videoURLs.map((url, index) => (
          <div key={index} className="video-upload-preview">
            <ReactPlayer
              key={index}
              url={url}
              className="video-preview"
              controls
            />
            <div className="relative">
              <CloseButton
                className="myprofile-videos-close"
                onClick={() => handleDeleteVideo(index)}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <div className="myprofile-button-group">
        <button className="myprofile-cancel-button">Cancel</button>
        <button className="myprofile-save-button">Save</button>
      </div> */}

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
            <sPan className="text-[20px] font-semibold">Add Videos</sPan>
            <br />
            <span>Copy & paste embedded codes of your videos from: </span>
            <span className="mb-[15px]">Youtube/Facebook/Vimeo</span>
            <TextField
              multiline
              rows={2}
              maxRows={50}
              size="large"
              className="modal-input-topmargin w-[100%]  md:w-[95%] border"
              value={inputValue}
              onChange={handleVideoChange}
              inputProps={{
                style: {
                  height: "80px",
                },
              }}
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
