import React from "react";
import "../../Style/PublicProfile.css";
import Imgix from "react-imgix";
import { ReactComponent as PlayButton } from "../../../icons/circled-play.svg";

const MainImage = ({ vendorData }) => {
  const mainImageUrl = vendorData.vendor["profile-image"];
  return (
    <div className="pp-gallery-content">
      <Imgix
        src={mainImageUrl}
        alt={`Main Image`}
        className="pp-main-image"
        sizes="(min-width: 745px) 50vw, 100vw"
        imgixParams={{ fit: "crop", ar: "3:1" }} // Aspect ratio set to 1:1
      />
      {vendorData.vendor.imagesa_videos.map((image) => (
        <div key={image.id} className={`pp-additional-content-${image.id}`}>
          {image.type === "video" ? (
            <Imgix
              className="relative w-[100%] h-[100%] object-cover rounded-tl-none rounded-tr-none rounded-br-[16px] rounded-bl-none"
              src={image.thumbUrl}
              alt={`Image ${image.id}`}
              sizes="(min-width: 745px) 50vw, 100vw"
              imgixParams={{ fit: "crop", ar: "1:1" }} // Aspect ratio set to 1:1 for images
            />
          ) : (
            <Imgix
              src={image.url}
              alt={`Image ${image.id}`}
              sizes="(min-width: 745px) 50vw, 100vw"
              imgixParams={{ fit: "crop", ar: "1:1" }} // Aspect ratio set to 1:1 for images
              className={
                image.id === 2
                  ? "custom-class-for-id-2"
                  : "default-class-for-other-ids"
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MainImage;

// <iframe
//   title={`Video ${image.id}`}
//   width="100%"
//   height="100%"
//   src={image.thumbUrl}
//   frameBorder="0"
//   allowFullScreen
// />
