import { Box, Modal, Slider, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import profile from "../icons/add-image.svg";
import { BiUpload } from "react-icons/bi";
import "./PhotoBoxCropper.css";

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
            sx={{ background: "#5596e6" }}
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
const PhotoBoxCropper = () => {
  // image src
  const [src, setSrc] = useState(null);

  // preview
  const [preview, setPreview] = useState([]);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  //

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

  const handleImageSubmit = (e) => {
    e.preventDefault();
    setPreview([...preview, src]);
    setSrc("");
  };

  return (
    <>
      <div className="mt-[15px]">
        <main className="photo-cropper-container">
          <CropperModal
            modalOpen={modalOpen}
            src={src}
            setPreview={setPreview}
            setModalOpen={setModalOpen}
          />
          <div className="flex">
            <div className="md:flex">
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImgChange}
                multiple
              />
              <span className="photo-upload-text">add photos</span>
              <div
                className="photo-cropper-img-container"
                onClick={handleInputClick}
              >
                <img className="photos-add-button" src={profile} alt="" />
              </div>
            </div>
            <div className="photo-cropper-img-container">
              <img src={preview} alt="" />
            </div>
          </div>

          <div></div>
        </main>
      </div>
    </>
  );
};

export default PhotoBoxCropper;
