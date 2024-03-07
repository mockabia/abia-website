import React, { useState, useEffect, useRef } from "react";
import "../../../components/ImageUploader.css";

import "cropperjs/dist/cropper.css";
import styled from "styled-components";

import "./PhotoGalleryTest.css";
import * as BusinessJs from "../Business";

const Image = styled.img`
  width: 100% !important;
`;

const ThumbImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const PhotoPreview = ({ vendorID, maxPhotosToShow }) => {
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
  const [viewPhotoGallery, setViewPhotoGallery] = useState([]);

  // vendor inputs
  useEffect(() => {
    const fetchData = async () => {
      await BusinessJs.fetchbusiness(setVendorInputs, setpreviewSet);
    };
    fetchData();
  }, [vendorID]);

  useEffect(() => {
    BusinessJs.V_viewPhotoGallery(setViewPhotoGallery, vendorID2);
    console.log("View photo gallery:", viewPhotoGallery);
  }, [vendorID2]);

  // Modal disable image
  useEffect(() => {
    if (modalIsOpen) {
      setCroppedIcon(null);
    }
  }, [modalIsOpen]);

  return (
    <div style={{ position: "relative" }}>
      <div className="myprofile-photogallerytest">
        {/* uploaded image are preview images */}
        {viewPhotoGallery.slice(0, maxPhotosToShow).map((element, index) => (
          <div key={element.pid} className="photopreview-wrapper">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PhotoPreview;
