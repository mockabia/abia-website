import { Box, Modal, Slider, Button } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import profile from "../icons/profiel-bg-latest.svg";
import { BiUpload } from "react-icons/bi";

import "./Cropper.css";

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
const CropperModal = ({ src, modalOpen, setModalOpen, setPreview }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);

  //handle save
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(URL.createObjectURL(blob));
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
          // border={50}
          // borderRadius={150}
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

// Container
const Cropper = ({ onChangeImageSelect }) => {
  // image src
  const [src, setSrc] = useState(null);

  // preview
  const [preview, setPreview] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);

  // handle Click
  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  // handle Change
  const handleImgChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  //handleimage slection
  const handleImgSelection = (dataUrl) => {
    setPreview(dataUrl);
    onChangeImageSelect(dataUrl);
  };

  return (
    <>
      <div className="mt-[15px]">
        <header>
          <h4 className="text-[#222222] font-semibold">Upload Team Photo</h4>
        </header>
        <main className="cropper-container">
          <CropperModal
            modalOpen={modalOpen}
            src={src}
            setPreview={setPreview}
            setModalOpen={setModalOpen}
            handleImgSelection={handleImgSelection}
          />

          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImgChange}
          />
          <div className="cropper-img-container" onClick={handleInputClick}>
            <img src={preview || profile} alt="" />
          </div>
          <div className="space-y-5" onClick={handleInputClick}>
            <div className="cropper-upload-button">
              <label
                htmlFor="file-input"
                id="file-label"
                className="text-[14px] cursor-pointer"
              >
                Upload
              </label>
              <span className="cropper-upload-icon">
                <BiUpload />
              </span>
            </div>
          </div>
          <div className="cropper-upload-recommendation">
            <span>Recommended Size: 400px x 300px</span>
            <br />
            <span>Maximum file size 1MB</span>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cropper;
