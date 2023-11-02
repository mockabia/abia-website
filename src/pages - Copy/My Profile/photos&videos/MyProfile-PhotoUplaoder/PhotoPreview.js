import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as CloseButton } from "../../../../icons/x-solid.svg";
import "./PhotoPreview.css";

const PhotoPreview = ({ imagesPreviewUrls, deleteImage }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [dragId, setDragId] = useState("");

  useEffect(() => {
    console.log("Preview imagesPreviewUrls:", imagesPreviewUrls);
    setPreviewImages(imagesPreviewUrls);
  }, [imagesPreviewUrls]);

  const handleOver = (ev) => {
    ev.preventDefault();
  };

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragImage = previewImages.find(
      (image) => image.id === parseInt(dragId)
    );
    const dropImage = previewImages.find(
      (image) => image.id === parseInt(ev.currentTarget.id)
    );
    const arr = moveItem(dragImage.id - 1, dropImage.id - 1);
    setPreviewImages(arr);
  };

  const moveItem = (from, to) => {
    const copiedImages = [...previewImages];
    const f = copiedImages.splice(from, 1)[0];
    copiedImages.splice(to, 0, f);
    return copiedImages;
  };

  const renderPreview = () => {
    if (previewImages.length > 0) {
      previewImages.map((items, index) => {
        items.id = index + 1;
      });
    }
    return (
      <>
        {previewImages.length > 0 &&
          previewImages.map((element) => (
            <div
              className="myprofile-photos-gallery"
              key={element.id}
              id={element.id}
              draggable
              onDragOver={handleOver}
              onDragStart={handleDrag}
              onDrop={handleDrop}
            >
              <img
                src={element.file}
                alt={element.name}
                width="600"
                height="600"
                className="photo-preview-img"
              />
              <div className="photopreview-desc">
                <div className="photopreview-image-order">
                  <CloseButton
                    className="myprofile-photos-close"
                    onClick={() => deleteImage(element.id)}
                    // icon={faTrash}
                  />
                </div>
              </div>
            </div>
          ))}
      </>
    );
  };

  return <div className="photopreview-wrapper ">{renderPreview()}</div>;
};

export default PhotoPreview;

// import React from 'react'

// const PhotoPreview = () => {
//   return (
//     <div>PhotoPreview</div>
//   )
// }

// export default PhotoPreview
