import React, { useState, useEffect, useRef } from "react";
// import { createObjectURL } from "file-saver";
import "../../../../components/ImageUploader.css";
import profile from "../../../../icons/add-image.svg";
import Modal from "react-modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { ReactComponent as CloseButton } from "../../../../icons/x-solid.svg";
import { MdModeEdit } from "react-icons/md";
import "./PhotoGalleryTest.css";
import * as BusinessJs from "../../../../pages/Business/Business";
import e from "cors";

const Image = styled.img`
  width: 100% !important;
`;

const ThumbImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const PhotoGalleryTest = (vendorID) => {
  const [vendorinputs, setVendorInputs] = useState("");
  const vendorID2 = vendorinputs.vid;
  const [previewSet, setpreviewSet] = useState(false);
  //
  const [image, setImage] = useState(null); // imageurl
  const [croppedImage, setCroppedImage] = useState(null); // thumburl
  const [croppedIcon, setCroppedIcon] = useState(null); // iconurl
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cropper, setCropper] = useState(null);
  const inputImage = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
  });
  const [inputsErrors, setInputsErrors] = useState({});
  const [viewPhotoGallery, setViewPhotoGallery] = useState([]);
  const [deletePhoto, setDeletePhoto] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null); // FOR EDIT
  // vendor inputs
  useEffect(() => {
    const fetchData = async () => {
      await BusinessJs.fetchbusiness(setVendorInputs, setpreviewSet);
    };
    fetchData();
  }, [vendorID]);

  useEffect(() => {
    BusinessJs.V_viewPhotoGallery(setViewPhotoGallery, vendorID2);
    // console.log("View photo gallery:", viewPhotoGallery);
  }, [vendorID2]);

  // Modal disable image
  useEffect(() => {
    if (modalIsOpen) {
      setCroppedIcon(null);
    }
  }, [modalIsOpen]);

  const handleTitleChange = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: e.target.value,
    }));
  };

  const handleDetailChange = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      detail: e.target.value,
    }));
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

  // cropimage with promise
  const cropImage = async () => {
    if (!cropper) {
      throw new Error("Cropper instance is null.");
    }
    return new Promise((resolve, reject) => {
      const canvas = cropper.getCroppedCanvas();
      const thumbUrl = canvas.toDataURL();
      setCroppedImage(thumbUrl);
      const thumbCanvas = document.createElement("canvas");
      const thumbSize = 150;
      thumbCanvas.width = thumbSize;
      thumbCanvas.height = thumbSize;
      const thumbCtx = thumbCanvas.getContext("2d");
      thumbCtx.drawImage(canvas, 0, 0, thumbSize, thumbSize);
      thumbCanvas.toBlob(async (thumbBlob) => {
        const thumbReader = new FileReader();
        thumbReader.readAsDataURL(thumbBlob);

        thumbReader.onloadend = async () => {
          const iconUrl = thumbReader.result;
          setCroppedIcon(iconUrl);

          const newCroppedImage = {
            pid: viewPhotoGallery.length + 1,
            // imageUrl: imageUrl,
            thumbUrl: thumbUrl,
            title: formData.title,
            detail: formData.detail,
          };

          setViewPhotoGallery([...viewPhotoGallery, newCroppedImage]);
          closeModal();

          // Resolve the promise with the URLs
          resolve({
            imageUrl: image,
            thumbUrl: thumbUrl,
            iconUrl: iconUrl,
          });
        };
      });
    });
  };

  const onFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
        openModal();
      };
    }
  };
  // Delete
  const deleteCroppedImage = async (id, pid) => {
    try {
      await BusinessJs.V_deletePhotoGallery(setDeletePhoto, id, pid, 4);

      // Update the state to remove the deleted photo
      const newViewPhotoGallery = viewPhotoGallery.filter(
        (photo) => photo.pid !== pid
      );
      setViewPhotoGallery(newViewPhotoGallery);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };
  // Submit
  const handleSubmit = async () => {
    {
      if (cropper !== null) {
        const { imageUrl, thumbUrl, iconUrl } = await cropImage();

        const formValues = {
          vid: vendorID2,
          tempphoto: {
            imageUrl: imageUrl,
            thumbUrl: thumbUrl,
            iconUrl: iconUrl,
          },
          title: formData.title,
          detail: formData.detail,
        };
        setFormData({
          title: "",
          detail: "",
        });
        console.log("Image details:", formValues);
        BusinessJs.updateBusinessMyProfile(
          formValues,
          vendorID2,
          4,
          setInputsErrors,
          setVendorInputs
        );
      }
    }
  };

  // Edit function
  const handleEditPhoto = (element) => {
    setSelectedPhoto(element);
    setSelectedPhoto(element.thumbUrl);
    setFormData({
      title: element.title,
      detail: element.detail,
    });
    openModal();
  };
  // console.log("Selected Image Details:", selectedPhoto);

  return (
    <div>
      <div className="myprofile-photogallerytest">
        <form onSubmit={handleSubmit} className="">
          <div>
            <div
              className="photo-uploader-img-container"
              onClick={handleBrowseClick}
            >
              <div>
                <img
                  className="photos-uploaderadd-button"
                  src={profile}
                  alt=""
                />
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
              {croppedIcon && (
                <div className="preview-img hidden">
                  <ThumbImage src={croppedIcon} alt="Cropped Thumbnail" />
                </div>
              )}
              {image && (
                <div hidden="hidden">
                  <Image
                    className="w-full object-contain"
                    src={image}
                    alt="Original image"
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
                    maxWidth: "100%",
                    maxHeight: "100%",
                    top: "50%",
                    left: "50%",
                    borderRadius: "12px",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    overflow: "scroll",
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
                      style={{
                        width: "100%",
                        height: "100%",
                        // minHeight: "50vh",
                        maxHeight: "70vh",
                      }}
                      responsive={true}
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
                      name="title"
                      className="caption-name-input"
                      value={formData.title}
                      onChange={handleTitleChange}
                    />
                  </div>
                  <div className="flex justify-between items-end gap-[1rem] ">
                    <div className="flex flex-col gap-[3px]">
                      <label className="text-[12px]">Credit</label>
                      <input
                        type="text"
                        name="detail"
                        className="credit-name-input"
                        value={formData.detail}
                        onChange={handleDetailChange}
                      />
                    </div>
                    <div
                      className="mycropper-save-button"
                      onClick={handleSubmit}
                    >
                      <button>Save</button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </form>
        {/* preview images */}
        {viewPhotoGallery.map((element) => (
          <div className="photopreview-wrapper " onDragEnd={() => {}}>
            <div
              className="myprofile-photos-gallery"
              key={element.pid}
              id={element.pid}
            >
              <img
                src={element.thumbUrl}
                alt={element.title}
                width="600"
                height="600"
                className="photo-preview-img"
              />
              <div className="photopreview-desc">
                {/* DELETE */}
                <div
                  className="photopreview-image-order"
                  onClick={() => deleteCroppedImage(element.vid, element.pid)}
                >
                  <CloseButton className="myprofile-photos-close" />
                </div>
                {/* EDIT */}
                <div className="photopreview-edit">
                  <MdModeEdit
                    color="#fff"
                    size={24}
                    className="myprofile-photos-edit"
                    onClick={() => handleEditPhoto(element)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* )} */}
      </div>
    </div>
  );
};
export default PhotoGalleryTest;
