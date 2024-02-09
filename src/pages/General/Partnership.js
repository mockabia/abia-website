import React, { useState } from "react";
import LayoutGeneral from "../../layouts/Layout/LayoutGeneral";
import "../Style/Partnership.css";
import { FaCheck } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
  "All Previous Options",
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
      setVisibleListItems(partnershipList);
    } else {
      setVisibleListItems(partnershipList.slice(0, 4));
    }
  };

  const moreButtonText = show ? "less" : "more";
  const moreButtonText2 = show2 ? "less" : "more";

  const handleOpen_F = () => {
    setshow2(!show2);
    if (!show2) {
      setVisibleListItems_F(featuredList);
    } else {
      setVisibleListItems_F(featuredList.slice(0, 4));
    }
  };

  return (
    <LayoutGeneral>
      <div className="h-screen pb-[10rem]">
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
                <Link
                  to="/payments"
                  state={{
                    mode: mode ? "annually" : "monthly",
                    amount: mode ? 499.0 : 41.99,
                    type: "Partnership",
                  }}
                >
                  <button className="partnership-apply-button">
                    Apply Today
                  </button>
                </Link>

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
                  <span>{moreButtonText}</span>
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
                <Link
                  to="/payments"
                  state={{
                    mode: mode ? "annually" : "monthly",
                    amount: mode ? 699.0 : 69.99,
                    type: "Featured",
                  }}
                >
                  <button className="partnership-apply-button">
                    Apply Today
                  </button>
                </Link>
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
                  {moreButtonText2}
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
