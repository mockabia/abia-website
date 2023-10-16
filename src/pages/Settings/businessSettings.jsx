import React, { useState } from "react";
import "./businessSettings.css";
import { ReactComponent as BusinessUserIcon } from "../../icons/ic-user-interface-info (1).svg";
import { ReactComponent as BusinessEmail } from "../../icons/business-email (1).svg";
import { ReactComponent as USernamePasswordIcon } from "../../icons/ic-user-interface-password (1).svg";
import { ReactComponent as CategoryIcon } from "../../icons/check-all (1).svg";
import { ReactComponent as LocationIcon } from "../../icons/location (1).svg";

import { RxTriangleDown } from "react-icons/rx";

import TopBar from "../../layouts/sidebar/TopBar";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import ContentHeader from "../../layouts/sidebar/ContentHeader";
import BasicInfo from "./BasicInfo";
import ContactDetails from "./ContactDetails";
import UsernamePassword from "./UsernamePassword";
import Category from "./Category";
import MyLocation from "./MyLocation";

const BusinessSettings = () => {
  // Array of objects for accordion items
  const accordionItems = [
    {
      id: 1,
      icon: <BusinessUserIcon className="business-basicinfo-icon" />,
      heading: "Basic Information",
      content: <BasicInfo />,
    },
    {
      id: 2,
      icon: <BusinessEmail />,
      heading: "Contact Details",
      content: <ContactDetails />,
    },
    {
      id: 3,
      icon: <USernamePasswordIcon />,
      heading: "Username + Password",
      content: <UsernamePassword />,
    },
    {
      id: 4,
      icon: <CategoryIcon />,
      heading: "Categories",
      content: <Category />,
    },
    {
      id: 5,
      icon: <LocationIcon />,
      heading: "My Locations",
      content: <MyLocation />,
    },
  ];

  return (
    <>
      <TopBar title="Settings" />
      <div className="business-acordion-container">
        <div className="business-header ">
          {/* <ContentHeader title="Business Settings" /> */}
          <h2>Business Settings</h2>
          <p className="mt-[10px] whitespace-break-spaces">
            Keep ABIA up-to-date by updating your business settings below.
          </p>
        </div>
        {/* <div className="business-header-largescreen  space-y-2 mt-[10px] hidden lg:visible">
          <h2 className="">Business Settings</h2>
          <p className="text-[14px]">
            Keep ABIA up-to-date by updating your business settings below.
          </p>
        </div> */}

        <Accordion allowZeroExpanded>
          {accordionItems.map((item) => (
            <AccordionItem key={item.id}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <span className="icon-transition">{item.icon}</span>
                  <h4 className="accordion-item-header">{item.heading}</h4>
                  <RxTriangleDown size={30} className="business-down-aroww" />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>{item.content}</AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default BusinessSettings;
