import React, { useEffect, useRef, useState } from "react";
import { Box, Modal, Button, Input, TextField, Textarea } from "@mui/material";
import { ReactComponent as CloseButton } from "../../../icons/x-solid.svg";
import PlayIcon from "../../../icons/abia-play.svg";

import * as BusinessJs from "../Business";
import "./VideoUploader.css";

import { AiOutlineClose } from "react-icons/ai";
import VideoModal from "./VideModal";

//IModal

const VideoUploader = ({ vendorID }) => {
  const [open, setOpen] = useState(false);
  const [vendorinputs, setVendorInputs] = useState("");

  //for onchange event
  const [videoURLs, setVideoURLs] = useState([]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
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

  const getYoutubeThumbnailUrl = (videoUrl) => {
    const videoIdMatch = videoUrl.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (videoId) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      // console.log("Thumbnail URL:", thumbnailUrl);
      return thumbnailUrl;
    }

    return null;
  };

  // overlay
  const playVideo = (video) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
    // console.log(video);
  };

  const closeOverlay = () => {
    setSelectedVideo(null);
    setVideoModalOpen(false);
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
              className="video-upload-preview"
            >
              <img
                src={getYoutubeThumbnailUrl(element.video)}
                alt={`Thumbnail for video ${element.vgid}`}
                onClick={() => playVideo(element.video)}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={PlayIcon}
                  alt="Play Icon"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              {/* <div
                dangerouslySetInnerHTML={{
                  __html: element.video.replace(
                    "<iframe ",
                    '<iframe width="100%" height="100%" '
                  ),
                }}
              /> */}
              {/* Render the video player in the overlay */}

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
        {/* Render the VideoModal component */}
        <VideoModal
          open={videoModalOpen}
          onClose={closeOverlay}
          video={selectedVideo}
        />
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
        </div>
      </Modal>
    </div>
  );
};

export default VideoUploader;
