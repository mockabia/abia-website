import React, { useEffect, useState } from "react";
import "../Style/CoupleEnquiry.css";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import * as servicesPage from "../../services/coupleService";

import { useLocation, Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CoupleAddCategoryButton } from "../../components/FormStyle";
import AddCategory from "./CoupleEnquiry/AddCategory";

export default function CouplePage(props) {
  const location = useLocation();
  const [pageContent, setPageContent] = useState({});
  const [categoryOpen, setCategoryOpen] = useState(false);
  const url = location.pathname.split("/").pop();

  useEffect(() => {
    fetchPageContent();
  }, [url]);

  const handleClosePage = () => {
    window.history.back();
  };
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
            <div onClick={() => toggleOpen()}>
              <CoupleAddCategoryButton>Add category</CoupleAddCategoryButton>
            </div>
            {/* Add category component */}
            {categoryOpen && (
              <AddCategory open={categoryOpen} setOpen={setCategoryOpen} />
            )}
          </div>
        </div>
      </React.Fragment>
      {/* </section> */}
    </section>
  );
}
