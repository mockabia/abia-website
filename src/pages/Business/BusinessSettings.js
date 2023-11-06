import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LayoutVendor from "../Common/LayoutVendor";
import * as BusinessJS from "./Business";


import "../../pages - Copy/Settings/businessSettings.css";
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
import BasicInfo from "../../pages - Copy/Settings/BasicInfo";
import ContactDetails from "../../pages - Copy/Settings/ContactDetails";
import UsernamePassword from "../../pages - Copy/Settings/UsernamePassword";
import Category from "../../pages - Copy/Settings/Category";
import MyLocation from "../../pages - Copy/Settings/MyLocation";

const BusinessSettings = (props) => {
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [inputsErrors, setInputsErrors] = useState({});



    useEffect(() => {
        BusinessJS.fetchbusiness(setInputs)
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
    return (
        <>
            <LayoutVendor>
                {/* <pre>{JSON.stringify(inputs, null, 2)}</pre> */}
                <div className="business-acordion-container">
                    <div className="business-header ">
                        {/* <ContentHeader title="Business Settings" /> */}
                        <h2>Business Settings</h2>
                        <p className="mt-[10px] whitespace-break-spaces">
                            Keep ABIA up-to-date by updating your business settings below.
                        </p>
                    </div>

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
            </LayoutVendor>
        </>
    );
};
export default BusinessSettings;


