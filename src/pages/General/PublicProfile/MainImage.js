import { useCallback, useEffect, useRef, useState } from "react";
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
  const [lgInstance, setLgInstance] = useState(null);

  const lightGallery = useRef(null);

  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  const onOpen = (index) => {
    lightGallery.current.openGallery(index);
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
            onClick={() => {
              lightGallery.current.openGallery(5);
            }}
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
                View All ({vendorData.vendor.imagesa_videos.length})
              </span>{" "}
            </div>
          </button>
        </div>
      </div>

      {/* LightGallery */}
      <div>
        <LightGallery
          onInit={onInit}
          elementClassNames={"gallery fj-gallery"}
          dynamic={true}
          hash={false}
          rotate={false}
          plugins={[lgThumbnail]}
          dynamicEl={[
            ...vendorData.vendor.imagesa_videos.map((item) => ({
              src: item.type === "video" ? item.embedUrl : item.url,
              thumb: item.type === "video" ? item.thumbUrl : item.url,
            })),
            // {
            //   src: "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80",
            //   thumb:
            //     "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80",
            // },
            // Add other static images from your existing dynamicEl array here
          ]}
        >
          {vendorData.vendor.imagesa_videos.map((item) => (
            <a
              key={item.id}
              className="{`pp-additional-content-${item.id}`}"
              href={item.type === "video" ? item.embedUrl : item.url}
            >
              <img
                style={{ display: "none" }}
                width="300"
                height="100"
                className="img-responsive"
                src={item.type === "video" ? item.thumbUrl : item.url}
              />
            </a>
          ))}
        </LightGallery>

        {/* <LightGallery
          onInit={onInit}
          elementClassNames={"gallery fj-gallery"}
          dynamic={true}
          hash={false}
          rotate={false}
          plugins={[lgThumbnail]}
          dynamicEl={[
            {
              src: "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80",
              thumb:
                "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1526281216101-e55f00f0db7a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80",
              thumb:
                "https://images.unsplash.com/photo-1526281216101-e55f00f0db7a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
              thumb:
                "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80",
              thumb:
                "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
              thumb:
                "https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
              thumb:
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },

            {
              src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1440&q=80",
              thumb:
                "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2407&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1596370743446-6a7ef43a36f9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
              thumb:
                "https://images.unsplash.com/photo-1596370743446-6a7ef43a36f9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
              thumb:
                "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
              thumb:
                "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1510011560141-62c7e8fc7908?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
              thumb:
                "https://images.unsplash.com/photo-1510011560141-62c7e8fc7908?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1586276393635-5ecd8a851acc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
              thumb:
                "https://images.unsplash.com/photo-1586276393635-5ecd8a851acc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1471931452361-f5ff1faa15ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
              thumb:
                "https://images.unsplash.com/photo-1471931452361-f5ff1faa15ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
              thumb:
                "https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },
            {
              src: "https://images.unsplash.com/photo-1610448721566-47369c768e70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
              thumb:
                "https://images.unsplash.com/photo-1610448721566-47369c768e70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
            },
          ]}
        >
          <a
            onClick={() => onOpen(0)}
            data-lg-size="1600-1067"
            className="gallery__item fj-gallery-item"
            data-index="0"
            data-src="https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80"
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@tobbes_rd' >Tobias Rademacher </a></h4><p> Location - <a href='https://unsplash.com/s/photos/puezgruppe%2C-wolkenstein-in-gr%C3%B6den%2C-s%C3%BCdtirol%2C-italien'>Puezgruppe, Wolkenstein in Gröden, Südtirol, Italien</a>layers of blue.</p>"
          >
            <img
              alt="layers of blue."
              className="img-responsive"
              style={{ display: "none" }}
              src="https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80"
            />
          </a>
          <a
            onClick={() => onOpen(1)}
            data-lg-size="1600-2398"
            data-pinterest-text="Pin it3"
            data-index="1"
            data-tweet-text="lightGallery slide  4"
            className="gallery__item fj-gallery-item"
            data-src="https://images.unsplash.com/photo-1526281216101-e55f00f0db7a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80"
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@yusufevli' >Yusuf Evli </a></h4><p> Foggy Road</p>"
          >
            <img
              className="img-responsive"
              style={{ display: "none" }}
              src="https://images.unsplash.com/photo-1526281216101-e55f00f0db7a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80"
            />
          </a>
          <a
            onClick={() => onOpen(2)}
            data-lg-size="1600-1067"
            data-pinterest-text="Pin it3"
            data-index="2"
            data-tweet-text="lightGallery slide  4"
            className="gallery__item fj-gallery-item"
            data-src="https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@flovayn' >Jay Mantri</a></h4><p>  Misty shroud over a forest</p>"
          >
            <img
              className="img-responsive"
              style={{ display: "none" }}
              src="https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
            />
          </a>
          <a
            onClick={() => onOpen(3)}
            data-lg-size="1600-1067"
            data-pinterest-text="Pin it3"
            data-index="3"
            data-tweet-text="lightGallery slide  4"
            className="gallery__item fj-gallery-item"
            data-src="https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80"
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@flovayn' >Florian van Duyn</a></h4><p>Location - <a href='Bled, Slovenia'>Bled, Slovenia</a> </p>"
          >
            <img
              className="img-responsive"
              style={{ display: "none" }}
              src="https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80"
            />
          </a>
          <a
            onClick={() => onOpen(4)}
            data-lg-size="1600-1126"
            data-pinterest-text="Pin it3"
            data-tweet-text="lightGallery slide  4"
            className="gallery__item fj-gallery-item"
            data-index="4"
            data-src="https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@juanster' >Juan Davila</a></h4><p>Location - <a href='Bled, Slovenia'>Bled, Slovenia</a> Wooded lake island </p>"
          >
            <img
              style={{ display: "none" }}
              className="img-responsive"
              src="https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80"
            />
          </a>
        </LightGallery> */}
      </div>
    </div>
  );
};

export default MainImage;

/**
 * {vendorData.vendor.imagesa_videos.map((item) => (
            <a
              key={item.id}
              className={`gallery__item pp-additional-content-${item.id}`}
              // data-lg-size="1280-720"
              data-pinterest-text="Pin it3"
              data-tweet-text="lightGallery slide 4"
              data-src={item.type === "video" ? item.url : item.url}
              data-poster={
                item.type === "video" ? item.thumbUrl : item.thumbUrl
              }
              data-sub-html={`
                <h4>${item.title}</h4>
                <p>${item.description}</p>`}
            >
              <img
                width="300"
                height="100"
                className="img-responsive"
                src={item.type === "video" ? item.thumbUrl : item.thumbUrl}
              />
            </a>
          ))}
 */
