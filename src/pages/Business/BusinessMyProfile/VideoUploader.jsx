import React, { useEffect, useRef, useState } from "react";
import { Box, Modal, Button, Input, TextField, Textarea } from "@mui/material";
import { ReactComponent as CloseButton } from "../../../icons/x-solid.svg";
import * as BusinessJs from "../Business";
import "./VideoUploader.css";

import { AiOutlineClose } from "react-icons/ai";

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
  // drag and drop
  // drag and drop
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(-1);
  const [dragOffset, setDragOffset] = useState(0);

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

  // DRAG AND DROP
  const startDrag = (index, event) => {
    setDragIndex(index);
    setDragOffset(event.clientX - event.target.getBoundingClientRect().left);
    setIsDragging(true);
  };
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // extraction info to be passed with the new update data
  const extractImageProperties = (image) => {
    const { title, detail, thumbUrl } = image;

    return {
      vid: vendorID,
      tempphoto: {
        imageUrl: thumbUrl, // or image.photo if needed
        thumbUrl: thumbUrl,
        iconUrl: thumbUrl, // or some other property
      },
      title,
      detail,
    };
  };

  const onDrop = (index, event) => {
    event.preventDefault();
    setIsDragging(false);

    if (dragIndex !== -1) {
      const fromIndex = dragIndex;
      const toIndex = index;

      // Rearrange the videos array
      const movedVideo = videoURLs[fromIndex];
      const updatedVideos = [...videoURLs];
      updatedVideos.splice(fromIndex, 1);
      updatedVideos.splice(toIndex, 0, movedVideo);

      setVideoURLs(updatedVideos);
      console.log("Updated videoURLs:", updatedVideos);

      // Map properties and update API
      const reorderedVideos = updatedVideos.map((video, idx) => {
        return {
          ...video,
          position: idx + 1, // assuming position starts from 1
        };
      });
      console.log("reorderedVideos:", reorderedVideos);

      // Uncomment and modify this part according to your API
      // BusinessJS.updateBusinessMyProfile(
      //   reorderedVideos,
      //   vendorID,
      //   5,
      //   setInputsErrors,
      //   setVendorInputs
      // );
    }

    setDragIndex(-1);
  };

  const onDragEnd = () => {
    setIsDragging(false);
    setDragIndex(-1);
  };
  return (
    <div className="px-[1rem] md:px-[2rem] ">
      <div className="flex flex-col gap-[3rem]">
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

          {videoURLs.map((element, index) => (
            <div
              key={element.vgid}
              id={element.vgid}
              // className="video-upload-preview"
              className={`video-upload-preview ${
                isDragging && index === dragIndex ? "dragging" : ""
              }`}
              draggable="true"
              onDragStart={(event) => startDrag(index, event)}
              onDragOver={(event) => onDragOver(event)}
              onDrop={(event) => onDrop(index, event)}
              onDragEnd={onDragEnd}
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
        {/* Submit and CAncel buttons */}
        <div className="myprofile-button-group-2 ">
          <button className="myprofile-cancel-button">Cancel</button>
          <button className="myprofile-save-button">Save</button>
        </div>
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
