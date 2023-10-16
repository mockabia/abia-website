import React, { useState } from "react";
import "./App.css";
import Uploader from "./Components/Uploader";
import Preview from "./Components/Preview";

const App = () => {
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState([]);

  const addImagePreviewUrl = (result) => {
    setImagesPreviewUrls([...imagesPreviewUrls, result]);
  };

  const deleteImage = (id) => {
    const filteredImages = imagesPreviewUrls.filter((image) => image.id !== id);
    setImagesPreviewUrls(filteredImages);
  };

  return (
    <div>
      <Uploader imagesPreviewUrls={addImagePreviewUrl} />
      {imagesPreviewUrls.length > 0 ? (
        <Preview
          imagesPreviewUrls={imagesPreviewUrls}
          deleteImage={deleteImage}
        />
      ) : null}
    </div>
  );
};

export default App;


/**uplaoder */
