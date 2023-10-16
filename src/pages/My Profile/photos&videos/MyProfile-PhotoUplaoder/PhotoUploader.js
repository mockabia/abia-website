import React, { useRef, useState } from "react";
import { Box, Modal, Slider, Button } from "@mui/material";
import AvatarEditor from "react-avatar-editor";

import "./PhotoUploader.css";
import profile from "../../../../icons/add-image.svg";

// Styles
const boxStyle = {
  width: "300px",
  height: "300px",
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

// Modal
const CropperModal = ({ modalOpen, setModalOpen, src, handleCroppedImage }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);

  //handle save
  const handleSave = async () => {
    if (cropRef.current) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      const output = URL.createObjectURL(blob);
      handleCroppedImage(output);
      setModalOpen(false);
    }
  };

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: "0 auto",
            width: "80%",
            color: "cyan",
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            border: "3px solid white",
            background: "black",
          }}
        >
          <Button
            size="small"
            sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={(e) => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ background: "#6cc2bc" }}
            size="small"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const PhotoUploader = ({ imagesPreviewUrls }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [src, setSrc] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image
  const [croppedImage, setCroppedImage] = useState(null); // Store cropped image

  const inputRef = useRef(null);

  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const fileSelectedHandler = (e) => {
    if (checkMimeType(e)) {
      const files = Array.from(e.target.files);
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = {
            file: reader.result,
            size: file.size,
            name: file.name,
          };
          console.log("Selected image details:", result);
          setSelectedImage(reader.result);
          setModalOpen(true);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCroppedImage = (output, id) => {
    console.log("Cropped image URL:", output);
    imagesPreviewUrls(output, id);
  };

  const checkMimeType = (event) => {
    const { files } = event.target;
    let err = "";
    const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    for (let x = 0; x < files.length; x += 1) {
      if (types.every((type) => files[x].type !== type)) {
        err += `${files[x].type} is not a supported format\n`;
      }
    }

    if (err !== "") {
      event.target.value = null;
      alert(err); // You can show the error message using alert or any other notification method.
      return false;
    }
    return true;
  };

  return (
    <div className="photo-uploader-container">
      <CropperModal
        modalOpen={modalOpen}
        src={selectedImage}
        setModalOpen={setModalOpen}
        handleCroppedImage={handleCroppedImage}
      />
      <input
        type="file"
        name="file"
        id="file"
        ref={inputRef}
        onChange={fileSelectedHandler}
        className=""
        accept="image/*"
        multiple
      />
      <div className="photo-uploader-img-container" onClick={handleInputClick}>
        <div>
          <img className="photos-uploaderadd-button" src={profile} alt="" />

          <span className="photo-uploader-text">add photo</span>
        </div>
      </div>
      <div>
        {croppedImage && (
          <img
            className="photos-uploaderadd-button"
            src={croppedImage}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default PhotoUploader;
