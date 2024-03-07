import React, { useEffect, useState } from "react";
import "../Style/CoupleEnquiry.css";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import * as servicesPage from "../../services/coupleService";

import { useLocation, Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CoupleAddCategoryButton } from "../../components/FormStyle";
import AddCategory from "./CoupleEnquiry/AddCategory";
import { LuCheckCircle2 } from "react-icons/lu";

export default function CouplePage(props) {
  const location = useLocation();
  const [pageContent, setPageContent] = useState({});
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState([]); //move state from the addcategory to the parent component

  const url = location.pathname.split("/").pop();

  useEffect(() => {
    fetchPageContent();
  }, [url]);

  // const handleClosePage = () => {
  //   window.history.back();
  // };

  const fetchPageContent = async () => {
    await servicesPage.fetchBridePage(url).then(function (response) {
      if (response.statuscode == 200) {
        setPageContent(response.result);
      }
    });
  };

  const toggleOpen = () => {
    setCategoryOpen(!categoryOpen);
  };

  const mainMenus = [
    {
      id: 1,
      item: "Wedding Directory",
      link: `${window.WEDDING_DIRECTORY}`,
    },
    {
      id: 2,
      item: "Enquiries",
      link: `${window.CVENQUIRY}`,
    },
    {
      id: 3,
      item: "Booked vendors",
      link: `${window.BOOKING}`,
    },
  ];

  const handleBusinessDetailsUpdate = (updatedBusinessDetails) => {
    setBusinessDetails(updatedBusinessDetails);
  };

  console.log("Latest businessDetails state in CouplePage:", businessDetails);

  return (
    <section className="w-[100%]">
      {/* section header */}
      <div className="main-menu-section">
        <ul className="enquiry-page-header ">
          {mainMenus.map((menuItem) => (
            <li
              key={menuItem.id}
              className={
                menuItem.id == "3"
                  ? "underline decoration-4 decoration-[#6cc2bc]"
                  : ""
              }
            >
              <Link to={menuItem.link}>{menuItem.item}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
      <React.Fragment>
        <div className="main-content">
          <h2>{pageContent.title}</h2>
          {/* info content */}
          <div className="">
            <p className="flex justify-start items-start gap-[0.5rem] mt-[0.5rem] mb-[0.5rem]">
              <h6>Track your whole team in one easy place.</h6>
              <IoIosInformationCircleOutline fill="#000" size={16} />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[1rem] mt-[1rem]">
            {/* Category */}
            <div className="flex items-center justify-between w-[350px]">
              <div>{businessDetails.length} booked vendors</div>
              <div onClick={() => toggleOpen()}>
                <CoupleAddCategoryButton>Add category</CoupleAddCategoryButton>
              </div>
            </div>
            {/* Add category component */}
            {categoryOpen && (
              <AddCategory
                open={categoryOpen}
                setOpen={setCategoryOpen}
                onUpdateBusinessDetails={handleBusinessDetailsUpdate}
                businessDetails={businessDetails}
              />
            )}
            {/* Display businessDetails in Booking Card */}
            <div>
              {businessDetails.map((vendor) => (
                <div className="booked-card">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-[10px]">
                      <LuCheckCircle2 size={40} fill="#fff" color="#d7d7d7" />
                      <h4>Booked</h4>
                    </div>
                    <h4 className="font-[600] underline cursor-pointer">
                      Edit
                    </h4>
                  </div>
                  <h2>{vendor.category_name}</h2>
                  <j4>{vendor.business_name}</j4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
      {/* </section> */}
    </section>
  );
}
