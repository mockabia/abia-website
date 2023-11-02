import React, { useEffect } from "react";
import "./PhotoGalleryTest.css";
import PhotoUploader from "../MyProfile-PhotoUplaoder/PhotoUploader";
import PhotoPreview from "../MyProfile-PhotoUplaoder/PhotoPreview";
import { useState } from "react";
// import ImageUpload from "../../../../third-party-packs/ImageUploadCrop";

const PhotoGalleryTest = () => {
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState([]);

  const addImagePreviewUrl = (result, id) => {
    console.log("Adding image preview URL in gallery:", result);
    setImagesPreviewUrls([...imagesPreviewUrls, { ...result, id }]);
  };

  const deleteImage = (id) => {
    const filteredImages = imagesPreviewUrls.filter((image) => image.id !== id);
    setImagesPreviewUrls(filteredImages);
  };

  return (
    <div>
      <div className="myprofile-photogallerytest">
        <PhotoUploader imagesPreviewUrls={addImagePreviewUrl} />
        {imagesPreviewUrls.length > 0 ? (
          <PhotoPreview
            imagesPreviewUrls={imagesPreviewUrls}
            deleteImage={deleteImage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PhotoGalleryTest;
