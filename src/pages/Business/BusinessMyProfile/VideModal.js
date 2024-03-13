import React from "react";
import { Modal } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import "./VideoUploader.css";

const VideoModal = ({ open, onClose, video }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <button
          onClick={onClose}
          style={{
            margin: "10px",
            cursor: "pointer",
            color: "white",
            position: "relative",
            top: "5px",
            right: "5px",
          }}
        >
          Close
        </button>
        <div className="video-modal-overlay">
          {video && (
            <div
              style={{ height: "50vh" }}
              dangerouslySetInnerHTML={{
                __html: video.replace(
                  "<iframe ",
                  '<iframe width="100%" height="100%" '
                ),
              }}
            />
          )}
          <div></div>
        </div>
      </div>
    </Modal>
  );
};

export default VideoModal;
