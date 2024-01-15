import React, { useEffect, useRef, useState } from "react";
import { createObjectURL } from "file-saver";
import "./ImageUploader.css";
import profile from "../icons/add-image.svg";
import Modal from "react-modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const Image = styled.img`
  width: 100% !important;
`;

const ThumbImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;



const ClearButton = styled.button`
  padding: 8px 16px;
  background-color: #ff0000;
  color: #fff;
  border-radius: 4px;
  &:hover {
    background-color: #b30000;
  }
`;

const PhotoUpLoader2 = ({ onImageCrop, onChangeCrop }) => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedThumb, setCroppedThumb] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cropper, setCropper] = useState(null);
  const inputImage = useRef(null);
  const [formData, setFormData] = useState({
    caption: "",
    credit: "",
    // Add more fields as needed
  });

  // Modal disable image
  useEffect(() => {
    if (modalIsOpen) {
      setCroppedThumb(null);
    }
  }, [modalIsOpen]);

  const handleCreditCaptionChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleBrowseClick = () => {
    inputImage.current.click();
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // javascript
  };
  const closeModal = () => {
    setIsOpen(false);
    inputImage.current.value = null;
    document.body.style.overflow = "auto";
  };

  const cropImage = () => {
    if (cropper !== null) {
      const canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const thumbUrl = reader.result;
          setCroppedImage(thumbUrl);
          const imageUrl = image;
          setImage(imageUrl);
          const thumbCanvas = document.createElement("canvas");
          const thumbSize = 150; // set the desired size of the thumb image here
          thumbCanvas.width = thumbSize;
          thumbCanvas.height = thumbSize;
          const thumbCtx = thumbCanvas.getContext("2d");
          thumbCtx.drawImage(canvas, 0, 0, thumbSize, thumbSize);
          thumbCanvas.toBlob((thumbBlob) => {
            const thumbReader = new FileReader();
            thumbReader.readAsDataURL(thumbBlob);
            thumbReader.onloadend = () => {
              const iconUrl = thumbReader.result;
              setCroppedThumb(iconUrl);

              const images = {
                thumbUrl: thumbUrl,
                iconUrl: iconUrl,
                imageUrl: imageUrl,
                caption: formData.caption, // Pass the caption
                credit: formData.credit, // Pass the credit
              };

              closeModal();
              onImageCrop(images);
            };
          });
        };
      });
    }
  };

  const onFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
        onChangeCrop(reader.result);

        openModal();
      };
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Cropped image:", croppedImage);
    console.log("Cropped thumbnail:", croppedThumb);
     console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div>
        <div
          className="photo-uploader-img-container"
          onClick={handleBrowseClick}
        >
          <div>
            <img className="photos-uploaderadd-button" src={profile} alt="" />
            <span className="photo-uploader-text">add photo</span>
          </div>
        </div>

        <div>
          <input
            type="file"
            id="file-input"
            name="photo"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
            ref={inputImage}
          />

          {croppedImage && (
            <div hidden="hidden">
              <Image
                className="w- h-1/4 object-contain"
                src={croppedImage}
                alt="Preview Image"
              />
            </div>
          )}
          {croppedThumb && (
            <div className="preview-img hidden">
              <ThumbImage src={croppedThumb} alt="Cropped Thumbnail" />
            </div>
          )}
          {image && (
            <div hidden="hidden">
              <Image
                className="w-full object-contain"
                src={image}
                alt="Orginal image"
              />
            </div>
          )}
          {/* Modal and Cropper */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            contentLabel="Crop Image Modal"
            style={{
              content: {
                height: "fit-content",
                width: "fit-content",
                maxWidth: "90%",
                maxHeight: "90%",
                top: "50%",
                left: "50%",
                borderRadius: "12px",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
              },
              overlay: {
                zIndex: "9999",
                backgroundColor: "rgba(0,0,0,0.5)",
              },
            }}
          >
            <div className="mycropper-close-button" onClick={closeModal}>
              <IoMdClose size={22} />
            </div>
            <div className="flex flex-col justify-start p-[10px] overflow-y-auto gap-[1rem]">
              <div className="">
                <Cropper
                  src={image}
                  style={{ width: "100%", height: "100%" }}
                  responsive={true}
                  //showCropper={true}
                  aspectRatio={100 / 100}
                  minCropBoxWidth={100}
                  minCropBoxHeight={100}
                  movable={false}
                  zoomable={false}
                  guides={true}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
              </div>

              <div className="flex flex-col gap-[3px]">
                <label className="text-[12px]">Caption</label>
                <input
                  type="text"
                  name="caption"
                  className="caption-name-input"
                  value={formData.caption}
                  onChange={handleCreditCaptionChange("caption")}
                />
              </div>
              <div className="flex justify-between items-end gap-[1rem] ">
                <div className="flex flex-col gap-[3px]">
                  <label className="text-[12px]">Credit</label>
                  <input
                    type="text"
                    name="credit"
                    className="credit-name-input"
                    value={formData.credit}
                    onChange={handleCreditCaptionChange("credit")}
                  />
                </div>
                <div className="mycropper-save-button" onClick={cropImage}>
                  <button>Save</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </form>
  );
};

export default PhotoUpLoader2;
