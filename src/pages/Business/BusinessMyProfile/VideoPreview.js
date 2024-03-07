import React, { useEffect, useRef, useState } from "react";
import * as BusinessJs from "../Business";
import "./VideoUploader.css";

import { ReactComponent as PlayButton } from "../../../icons/abia-play.svg";

//IModal

const VideoPreview = ({ vendorID, maxtoShow }) => {
  const [videoURLs, setVideoURLs] = useState([]);

  useEffect(() => {
    BusinessJs.V_viewVideoGallery(setVideoURLs, vendorID);
    console.log("View video gallery:", videoURLs);
  }, [vendorID]);

  const EmbeddedVideo = ({ video }) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
      if (wrapperRef.current) {
        const wrapper = wrapperRef.current;
        const parser = new DOMParser();
        const doc = parser.parseFromString(video, "text/html");
        const iframe = doc.querySelector("iframe");

        if (iframe) {
          iframe.setAttribute(
            "src",
            iframe.src +
              (iframe.src.includes("?")
                ? "&modestbranding=0"
                : "?modestbranding=0")
          );
          wrapper.innerHTML = "";
          wrapper.appendChild(iframe);
        }
      }
    }, [video]);

    return <div ref={wrapperRef} />;
  };
  //   const EmbeddedVideo = ({ video }) => (
  //     <div
  //       dangerouslySetInnerHTML={{
  //         __html: video.replace(
  //           "<iframe ",
  //           '<iframe width="100%" height="100%" '
  //         ),
  //       }}
  //     />
  //   );

  // <div
  //   dangerouslySetInnerHTML={{
  //     __html: element.video.replace(
  //       "<iframe ",
  //       '<iframe width="100%" height="100%" '
  //     ),
  //   }}
  // />;

  return (
    <div>
      <div className="video-gallery-container gap-4 relative">
        {/* Display */}

        {Object.values(videoURLs)
          .slice(0, maxtoShow)
          .map((element, index) => (
            <div
              key={element.vgid}
              id={element.vgid}
              className="video-upload-preview "
            >
              {/* <div id={element.vgid} className="play-button">
              <PlayButton />
            </div> */}
              {/* <EmbeddedVideo video={element.video} /> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: element.video.replace(
                    "<iframe ",
                    '<iframe width="100%" height="100%" '
                  ),
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoPreview;
