import React, { useState } from "react";
import "./PreviewListing.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import QuickDesc from "./QuickDesc";
import FullDescription from "./FullDescription";

const PreviewListing = () => {
  const [quickDesc, setQuickDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");

  const handleQuickDescriptionSubmit = (description) => {
    setQuickDesc(description);
  };

  const handleFullDescriptionSubmit = (fulldescription) => {
    setFullDesc(fulldescription);
  };

  const accordionItems = [
    {
      id: 1,

      heading: "Quick Description",
      content: (
        <QuickDesc onQuickDescriptionSubmit={handleQuickDescriptionSubmit} />
      ),
    },
    {
      id: 2,
      // icon: <BusinessEmail />,
      heading: "Full Description",
      content: (
        <FullDescription
          onFullDescriptionSubmit={handleFullDescriptionSubmit}
        />
      ),
    },
    {
      id: 3,
      // icon: <USernamePasswordIcon />,
      heading: "Meet the Owner/Team",
      // content: <UsernamePassword />,
    },
    {
      id: 4,
      // icon: <CategoryIcon />,
      heading: "Photos/Videos",
      // content: <Category />,
    },
    {
      id: 5,
      // icon: <LocationIcon />,
      heading: "Pricing",
      // content: <MyLocation />,
    },
    {
      id: 6,
      // icon: <LocationIcon />,
      heading: "Q&A",
      // content: <MyLocation />,
    },
    {
      id: 7,
      // icon: <LocationIcon />,
      heading: "Packages",
      // content: <MyLocation />,
    },
  ];
  return (
    <div className="preview-listing-container">
      <div>
        <h1 className="profile-listing-header">Profile Basics</h1>
      </div>
      <div>
        <Accordion className="myprofile-accordion" allowZeroExpanded>
          {accordionItems.map((item) => (
            <AccordionItem key={item.id}>
              <AccordionItemHeading>
                <AccordionItemButton className="myprofile-accordion-button">
                  {/* <span className="icon-transition">{item.icon}</span> */}
                  <div className="myprofile-accordion-item-header">
                    <span>{item.heading}</span>
                    <span className="myprofile-edit-button">Edit</span>
                  </div>
                  {item.heading === "Quick Description" && (
                    <span className="quickdesc-summary">{quickDesc}</span>
                  )}
                  {item.heading === "Full Description" && (
                    <span className="quickdesc-summary">{fullDesc}</span>
                  )}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>{item.content}</AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default PreviewListing;
