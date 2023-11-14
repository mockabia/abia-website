import React, { useState } from "react";
import Modal from "react-modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import tw from "tailwind-styled-components";
import { useEffect } from "react";

const Image = tw.img`w-full`;
const ThumbImage = tw.img`w-32 h-32 object-contain`;
const UploadButton = tw.button`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600`;
const ClearButton = tw.button`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600`;
const ButtonContainer = tw.div`flex justify-center`;

const ImageUpload = ({
  onImageCrop,
  onChangeCrop,
  setInputPagephotoData,
  handleImageCrop,
}) => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedThumb, setCroppedThumb] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cropper, setCropper] = useState(null);

  // Modal disable image
  useEffect(() => {
    if (modalIsOpen) {
      setCroppedThumb(null);
    }
  }, [modalIsOpen]);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // javascript
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
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

  // clear image from the modal
  const clearImage = () => {
    setImage(null);
    setCroppedImage(null);
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Cropped image:", croppedImage);
    console.log("Cropped thumbnail:", croppedThumb);
  };

  // set app element for modal
  Modal.setAppElement("#root");

  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          onChange={onFileChange}
          //text- trasnperne t hide text
          className="block w-auto border-black rounded-lg shadow sm:text-sm"
        />
      </div>
      <div></div>

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
        <div>
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
          showCropper={true}
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
  );
};

export default ImageUpload;
