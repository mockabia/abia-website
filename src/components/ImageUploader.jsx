import React, { useRef, useState } from "react";
import { createObjectURL } from "file-saver";
import "./ImageUploader.css";
import profile from "../icons/profile-upload-3.png";
import { BiUpload } from "react-icons/bi";
import { Url } from "url";

const ImageUploader = ({ image, setImage, onUpload }) => {
  // const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(URL.createObjectURL(file));
    } else {
      setImage(null);
    }
  };

  const handleUpload = () => {
    if (!image) {
      return;
    }
    const imageUrl = createObjectURL(image);
    onUpload(imageUrl);
  };

  return (
    <div>
      <img
        htmlFor="file-input"
        className="image-style-uploader"
        src={image || profile}
        alt=""
        onClick={handleBrowseClick} // Open file dialog on image click
      />
      <div>
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          ref={fileInputRef} // reference to the input file element
        />
        <div className="space-y-5">
          <div className="upload-button">
            <label
              htmlFor="file-input"
              id="file-label"
              className="text-[17px] cursor-pointer"
            >
              Upload
            </label>
            <span className="upload-icon">
              <BiUpload />
            </span>
          </div>
        </div>
      </div>

      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  );
};

export default ImageUploader;
