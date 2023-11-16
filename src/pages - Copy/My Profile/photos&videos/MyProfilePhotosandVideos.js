import React, { useState } from "react";
import "./myProfilePhotosandVideos.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import PhotoGallery from "./MyProfilePhoto";
import Videos from "./myProfileVideo";

const MyProfilePhotosandVideos = () => {
  const [isExpanded, setIsExpanded] = useState();
  const openAll = () => {
    setIsExpanded(true);
  };
  const accordionItems = [
    {
      id: 1,
      uuid: 1,
      // heading: "Photo Gallery",
      content: <PhotoGallery />,
    },
    {
      id: 2,
      uuid: 2,
      // heading: "Videos",
      content: <Videos />,
    },
  ];
  return (
    <div className="photosVideos-acordion-container">
      <Accordion
        allowMultipleExpanded
        // className="photosVideos-accordion"
        preExpanded={[1, 2]}
      >
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} uuid={item.uuid} expanded={true}>
            <AccordionItemHeading>
              <AccordionItemButton
                className="myprofile-accordionbutton-style"
                dangerouslySetExpanded={isExpanded}
              >
                <span className="photosVideos-accordion-item-header">
                  {item.heading}
                </span>
                {/* <RxTriangleDown size={30} className="business-down-aroww" /> */}
              </AccordionItemButton>
            </AccordionItemHeading>
            {/* className="myprofile-itempanel-style" */}
            <AccordionItemPanel
              className="myprofile-itempanel-style"
            >
              {item.content}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MyProfilePhotosandVideos;
