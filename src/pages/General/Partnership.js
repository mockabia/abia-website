import React, { useState } from "react";
import LayoutGeneral from "../../layouts/Layout/LayoutGeneral";
import "../Style/Partnership.css";
import { FaCheck } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";

const partnershipList = [
  "Public Listing on ABIA Directory",
  "Unlimited Reviews visible to the public",
  "Links to your website, phone & email",
  "ABIA Reviews visible via Google",
  "Access to Download Reviews",
  "Customer Rating Scale visible to the public",
  "Unlimited ABIA Awards visible to the public",
  "Add Product + Promotions",
  "Video & Photo Gallery on Profile",
  "Upload Packages to Profile",
  "Download Review Website Widget",
  "Download Endorsement Widget",
  "Download Achievement Widget",
  "License to Promote the ABIA Brand",
  "Accreditation Certificate & Badge",
  "ABIA Award Logos (if applicable)",
  "Access to ABIA Awards Program",
  "Discounts to Events",
  "Discounts on Merchandise",
];

const featuredList = [
  "Featured Article with unlimited images & content",
  "ABIA will research specific keywords",
  "Shared on ABIA’s Facebook",
  "Shared on ABIA’s Instastories",
];

const Partnership = () => {
  const [mode, setMode] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setshow2] = useState(false);
  const [visibleListItems, setVisibleListItems] = useState(
    partnershipList.slice(0, 4)
  );
  const [visibleListItems_F, setVisibleListItems_F] = useState(
    featuredList.slice(0, 4)
  );

  const onClickHandler = () => {
    setMode(!mode);
  };

  const handleOpen = () => {
    setShow(!show);
    if (!show) {
      // If "more" is pressed, update visibleListItems to show all items
      setVisibleListItems(partnershipList);
    } else {
      // If "more" is pressed again, show only the first 3 items
      setVisibleListItems(partnershipList.slice(0, 4));
    }
  };

  const handleOpen_F = () => {
    setShow(!show);
    if (!show) {
      // If "more" is pressed, update visibleListItems to show all items
      setVisibleListItems_F(featuredList);
    } else {
      // If "more" is pressed again, show only the first 3 items
      setVisibleListItems_F(featuredList.slice(0, 4));
    }
  };

  return (
    <LayoutGeneral>
      <div className="h-screen overflow-auto pb-[10rem]">
        {/* toggle switch */}
        <h2 className="main-header">Partnetship Benefits</h2>
        <div className="toggle-div">
          <h5>Monthly</h5>
          <button onClick={onClickHandler} className="toggle-switch">
            <div
              className="benefit-button"
              style={{
                marginLeft: `${mode ? "36px" : "2px"}`,
                background: `${mode ? "#fff" : "#fff"}`,
              }}
            />
          </button>
          <h5>Annually</h5>
        </div>
        {/* main section */}
        <main className="partnership-main">
          {/* Box 1 */}
          <div className="partnership-box-one">
            <div className="partnership-info-box">
              <div className="flex flex-col gap-[1.5rem]">
                <div>
                  <span>
                    <span className="text-[30px] font-[600] font-change">
                      {mode ? "$499.00" : "$41.99"}
                    </span>{" "}
                    {mode ? "/yearly" : "/month"}
                  </span>
                  <h5>
                    {" "}
                    + <span className="font-change">$100.00 </span>Setup Fee{" "}
                  </h5>
                </div>
                <div>
                  <span className="text-[30px] font-[600]">Partnership</span>

                  <h5 style={{ visibility: mode ? "hidden" : "visible" }}>
                    12 month minimum
                  </h5>
                </div>
                <button className="partnership-apply-button">
                  Apply Today
                </button>
                <div>
                  <ul>
                    {visibleListItems.map((item, index) => (
                      <li key={index} className="partnership-li">
                        <FaCheck fill="#6cc2bc" size={22} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="featurelist-header" onClick={handleOpen}>
                  <span>more</span>
                  {/* <FaAnglesDown size={22} color="#6cc2bc" /> */}
                </div>
              </div>
            </div>{" "}
          </div>
          {/* Box 2 */}
          <div className="partnership-box-two">
            <div className="partnership-info-box">
              <div className="flex flex-col gap-[1.5rem]">
                <div>
                  <span>
                    <span className="text-[30px] font-[600] font-change">
                      {mode ? "$799.00" : "$69.99"}
                    </span>{" "}
                    {mode ? "/yearly" : "/month"}
                  </span>
                  <h5>
                    {" "}
                    + <span className="font-change">$100.00 </span>Setup Fee{" "}
                  </h5>
                </div>
                <div>
                  <span className="text-[30px] font-[600]">+ Featured</span>

                  <h5 style={{ visibility: mode ? "hidden" : "visible" }}>
                    12 month minimum
                  </h5>
                </div>
                <button className="partnership-apply-button">
                  Apply Today
                </button>
                <div>
                  <ul>
                    {visibleListItems_F.map((item, index) => (
                      <li key={index} className="partnership-li">
                        <FaCheck fill="#6cc2bc" size={22} /> <div>{item}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="featurelist-header" onClick={handleOpen_F}>
                  more
                  {/* <FaAnglesDown size={18} color="#6cc2bc" /> */}
                </div>
              </div>
            </div>{" "}
          </div>
        </main>
      </div>
    </LayoutGeneral>
  );
};

export default Partnership;
