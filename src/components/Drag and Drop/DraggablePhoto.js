// DraggablePhoto.js
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";

const DraggablePhoto = ({ photo, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PHOTO,
    item: { index },
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img
        src={photo.thumbUrl}
        alt={photo.title}
        width="600"
        height="600"
        className="photo-preview-img"
      />
    </div>
  );
};

export default DraggablePhoto;
