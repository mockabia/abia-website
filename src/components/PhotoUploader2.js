import React, { useEffect, useRef, useState } from "react";
import { createObjectURL } from "file-saver";
import "./ImageUploader.css";
import profile from "../icons/add-image.svg";
import Modal from "react-modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
`;

const ThumbImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const UploadButton = styled.button`
  padding: 8px 16px;
  background-color: #0074e4;
  color: #fff;
  border-radius: 4px;
  &:hover {
    background-color: #0059b3;
  }
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

  // Modal disable image
  useEffect(() => {
    if (modalIsOpen) {
      setCroppedThumb(null);
    }
  }, [modalIsOpen]);

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
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgb(224,224,224)",
              },
              overlay: {
                zIndex: "9999",
              },
            }}
          >
            <Cropper
              src={image}
              style={{ height: "80%", width: "70%" }}
              responsive={true}
              //showCropper={true}
              aspectRatio={120 / 120}
              minCropBoxWidth={120}
              minCropBoxHeight={120}
              movable={false}
              zoomable={false}
              guides={true}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <div className="mt-4 flex justify-center gap-4">
              <UploadButton onClick={cropImage} className="ml-2">
                Submit
              </UploadButton>
              <ClearButton onClick={closeModal}>Close</ClearButton>
            </div>
          </Modal>
        </div>
      </div>
    </form>
  );
};

export default PhotoUpLoader2;
