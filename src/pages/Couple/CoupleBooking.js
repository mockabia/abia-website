import React, { useEffect, useState } from "react";
import "../Style/CoupleEnquiry.css";
import * as servicesPage from "../../services/coupleService";

import { useLocation, Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CoupleAddCategoryButton } from "../../components/FormStyle";
import {
  CoupleAddCategoryButton,
  EnquirySelectStyle,
} from "../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import * as CoupleJS from "./Couple";
import RenderBooking from "./CoupleBooking/RenderBooking";
import Selectcategory from "./CoupleBooking/Selectcategory";
import AddBusiness  from "./CoupleBooking/AddBusiness";

export default function CouplePage(props) {
  const location = useLocation();
  const [pageContent, setPageContent] = useState({});
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [EditDetail, setEditDetail] = useState(false); // Edit
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [business_name, setBusinessName] = useState("");
  //const [budget, setBudget] = useState("");
  const [data, setData]                                 = useState([]);
  const [autocompleteVendors, setAutocompleteVendors]   = useState({});
  const [vendorModal, setVendorModal]                   = useState(false);
  const [choosenCategory, setChoosenCategory]           = useState(0);
  const [formValues, setFormValues]                     = useState({});

  const url = location.pathname.split("/").pop();
  useEffect(() => {
    if(choosenCategory>0){CoupleJS.autoCompleteVendorOnCategory(choosenCategory, setAutocompleteVendors,setVendorModal);}
  }, [choosenCategory]);

  /* useEffect(() => {
    fetchPageContent();
    setSelectedBusinessDetails({});
  }, [url]); */
  // In the useEffect block where you fetch the page content, set the initial value for selectedBusinessDetails when the component mounts.

  useEffect(() => {
    //CoupleJS.fetchMarketCategory(setCategoryList);
    CoupleJS.coupleBooking(setData, setCategoryList);
  }, []);



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
            <div className="flex items-center justify-between w-[100%] sm:w-[350px]">
              <div>{data.length} booked vendors</div>
              <div onClick={() => toggleOpen()}>
                <CoupleAddCategoryButton>Add category</CoupleAddCategoryButton>
              </div>
            </div>
            {/* Display businessDetails in Booking Card */}
            <div className="booking-cotainer">
              <RenderBooking data={data} setFormValues={setFormValues} setChoosenCategory={setChoosenCategory} />
            </div>

            {/* ADD CATEGORY  */}
            <Selectcategory setData={setData} setChoosenCategory={setChoosenCategory} open={categoryOpen} setOpen={setCategoryOpen} categoryList={categoryList} />
            
          {/* VENDOR DETAIL */}
          <AddBusiness open={vendorModal} setOpen={setVendorModal} setData={setData} 
          formValues={formValues} setFormValues={setFormValues} autocompleteVendors={autocompleteVendors} />
          </div>
        </div>
      </React.Fragment>
    </section>
  );
}

