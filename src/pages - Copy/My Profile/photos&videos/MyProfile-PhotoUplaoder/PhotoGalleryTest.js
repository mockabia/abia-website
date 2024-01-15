import React, { useEffect } from "react";
import "./PhotoGalleryTest.css";
import PhotoUploader from "../MyProfile-PhotoUplaoder/PhotoUploader";
import PhotoPreview from "../MyProfile-PhotoUplaoder/PhotoPreview";
import { useState } from "react";
import PhotoUpLoader2 from "../../../../components/PhotoUploader2";
// import ImageUpload from "../../../../third-party-packs/ImageUploadCrop";

const PhotoGalleryTest = () => {
  const [croppedImages, setCroppedImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCroppedImage = (images) => {
    setCroppedImages([
      ...croppedImages,
      {
        id: croppedImages.length + 1,
        url: images.thumbUrl,
        caption: images.caption,
        credit: images.credit,
      },
    ]);
    setModalOpen(false);
  };
  const deleteCroppedImage = (index) => {
    const newCroppedImages = [...croppedImages];
    newCroppedImages.splice(index, 1);
    setCroppedImages(newCroppedImages);
  };

  // console.log("Cropped image in PgotoGallery:", croppedImages);

  return (
    <div>
      <div className="myprofile-photogallerytest">
        {/* <PhotoUploader imagesPreviewUrls={addImagePreviewUrl} /> */}
        <PhotoUpLoader2
          onImageCrop={handleCroppedImage}
          onChangeCrop={() => {}}
        />
        {croppedImages.length > 0 ? (
          <PhotoPreview
            imagesPreviewUrls={croppedImages}
            deleteImage={deleteCroppedImage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PhotoGalleryTest;
