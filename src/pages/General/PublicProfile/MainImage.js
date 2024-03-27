import React, { useRef, useState } from "react";
import "../../Style/PublicProfile.css";
import Imgix from "react-imgix";
import { ReactComponent as PlayButton } from "../../../icons/circled-play.svg";
// light
import LightGallery from "lightgallery/react/Lightgallery.es5";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import { IoMdImage } from "react-icons/io";

const MainImage = ({ vendorData }) => {
  const mainImageUrl = vendorData.vendor["profile-image"];
  const lightGalleryRef = useRef(null);

  const [isLightGalleryOpen, setIsLightGalleryOpen] = useState(false);

  const openLightGallery = () => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery();
      setIsLightGalleryOpen(true);
    }
  };

  const closeLightGallery = () => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.closeGallery();
      setIsLightGalleryOpen(false);
    }
  };

  const handleViewAllClick = () => {
    // Manually trigger click event on LightGallery instance
    lightGalleryRef.current?.getElement().click();
  };

  return (
    <div>
      <div className="pp-gallery-content">
        <Imgix
          src={mainImageUrl}
          alt={`Main Image`}
          className="pp-main-image"
          sizes="(min-width: 745px) 50vw, 100vw"
          imgixParams={{ fit: "crop", ar: "3:1" }}
        />
        {vendorData.vendor.imagesa_videos.slice(0, 4).map((image) => (
          <div key={image.id} className={`pp-additional-content-${image.id}`}>
            {image.type === "video" ? (
              <Imgix
                className="relative w-[100%] h-[100%] object-cover rounded-tl-none rounded-tr-none rounded-br-[16px] rounded-bl-none"
                src={image.thumbUrl}
                alt={`Image ${image.id}`}
                sizes="(min-width: 745px) 50vw, 100vw"
                imgixParams={{ fit: "crop", ar: "1:1" }}
              />
            ) : (
              <Imgix
                src={image.url}
                alt={`Image ${image.id}`}
                sizes="(min-width: 745px) 50vw, 100vw"
                imgixParams={{ fit: "crop", ar: "1:1" }}
                className={
                  image.id === 2
                    ? "custom-class-for-id-2"
                    : "default-class-for-other-ids"
                }
              />
            )}
          </div>
        ))}
        {/* View all */}
        <div className="pp-viewall-section">
          <button
            type="button"
            id="dynamic-gallery-demo"
            className="pp-viewall-button"
            onClick={handleViewAllClick}
          >
            <div className="flex justify-center items-center gap-[0.5rem]">
              <IoMdImage size={24} />{" "}
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#515151",
                }}
              >
                View All
              </span>{" "}
            </div>
          </button>
        </div>
      </div>

      {/* LightGallery */}
      <div style={{ display: "none" }}>
        <LightGallery
          speed={500}
          plugins={[lgThumbnail]}
          ref={lightGalleryRef}
          download={false}
          mode="lg-slide"
          closable={true}
          hideControlOnEnd={true}
          swipeThreshold={50}
          onAfterClose={() => setIsLightGalleryOpen(false)}
        >
          {vendorData.vendor.imagesa_videos.map((item) => (
            <a
              key={item.id}
              className="{`pp-additional-content-${item.id}`}"
              href={item.type === "video" ? item.embedUrl : item.url}
            >
              <img
                width="300"
                height="100"
                className="img-responsive"
                src={item.type === "video" ? item.thumbUrl : item.url}
              />
            </a>
          ))}
        </LightGallery>
      </div>
    </div>
  );
};

export default MainImage;
