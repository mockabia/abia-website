import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as BusinessJS from "./Business";
import Skeleton from "@mui/material/Skeleton";

import "../Style/BusinessSettings.css";
import { ReactComponent as BusinessUserIcon } from "../../icons/ic-user-interface-info (1).svg";
import { ReactComponent as BusinessEmail } from "../../icons/business-email (1).svg";
import { ReactComponent as USernamePasswordIcon } from "../../icons/ic-user-interface-password (1).svg";
import { ReactComponent as CategoryIcon } from "../../icons/check-all (1).svg";
import { ReactComponent as LocationIcon } from "../../icons/location (1).svg";
import { RxTriangleDown } from "react-icons/rx";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import BasicInfo from "./BusinessSettings/BusinessSetting_1";
import UsernamePassword from "./BusinessSettings/BusinessSettings_3";
import ContactDetails from "./BusinessSettings/BusinessSettings_2";
import Category from "./BusinessSettings/BusinessSettings_4";
import MyLocation from "./BusinessSettings/BusinessSettings_5";

const BusinessSettings = (props) => {
  let navigate = useNavigate();
  const [dataSet, setDataSet] = useState(false);
  const [inputs, setInputs] = useState({});
  const [inputsErrors, setInputsErrors] = useState({});

  useEffect(() => {
    BusinessJS.fetchbusiness(setInputs, setDataSet);
  }, []);

  const handleStateSubmit = (e) => {
    e.preventDefault();
  };

  const accordionItems = [
    {
      id: 1,
      icon: <BusinessUserIcon className="business-basicinfo-icon" />,
      heading: "Basic Information",
      content: <BasicInfo vendorDetails={inputs} />,
    },
    {
      id: 2,
      icon: <BusinessEmail />,
      heading: "Contact Details",
      content: <ContactDetails vendorDetails={inputs} />,
    },
    {
      id: 3,
      icon: <USernamePasswordIcon />,
      heading: "Email + Password",
      content: <UsernamePassword vendorDetails={inputs} />,
    },
    {
      id: 4,
      icon: <CategoryIcon />,
      heading: "Categories",
      content: <Category vendorDetails={inputs} />,
    },
    {
      id: 5,
      icon: <LocationIcon />,
      heading: "My Locations",
      content: <MyLocation vendorDetails={inputs} />,
    },
  ];

  const skeletonLines = [
    { variant: "text", height: "1rem", width: "50%" },
    { variant: "text", height: "1rem" },
    { variant: "rectangular", width: "100%", height: "5rem" },
    { variant: "rectangular", width: "100%", height: "5rem" },
    { variant: "rectangular", width: "100%", height: "5rem" },
    { variant: "rectangular", width: "100%", height: "5rem" },
    { variant: "rectangular", width: "100%", height: "5rem" },
  ];
  return (
    <>
      {/* <pre>{JSON.stringify(inputs, null, 2)}</pre> */}
      <div className="business-acordion-container">
        <div className="business-header ">
          {/* <ContentHeader title="Business Settings" /> */}
          <h2>Business Settings</h2>

          {dataSet ? (
            <>
              <p className="mt-[10px] whitespace-break-spaces">
                Keep ABIA up-to-date by updating your business settings below.
              </p>
            </>
          ) : (
            <>
              {skeletonLines.map((line, index) => (
                <div key={index}>
                  <Skeleton
                    variant={line.variant}
                    sx={{ width: line.width, height: line.height }}
                  />
                  <br />
                </div>
              ))}
            </>
          )}
        </div>
        {dataSet == true ? (
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
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default BusinessSettings;
