import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as servicesPage from "../../services/generalServices";
import "../Style/Partnership.css";
import * as GeneralJS from "../General/General";

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

const AbiaMembershipoffers = (props) => {
  const navigate                              = useNavigate();
  const [show, setShow]                       = useState(false);
  const [show2, setshow2]                     = useState(false);
  const [paysettings, setPaysettings]         = useState({});
  const [formvalues, setFormvalues]           = useState({});
  const [visibleListItems, setVisibleListItems] = useState(
    partnershipList.slice(0, 4)
  );
  const [visibleListItems_F, setVisibleListItems_F] = useState(
    featuredList.slice(0, 4)
  );

  useEffect(() => {
    GeneralJS.fetchPayment(setPaysettings)
    setFormvalues((values) => ({ ...values, ['stype']: 0 }));
  }, []);
  
  useEffect(() => {
    let ftypeArray              = {}
    ftypeArray[0]               = {}
    ftypeArray[1]               = {}
    if (formvalues.stype == "0") {
      ftypeArray[0].setupfee    = paysettings.newregfees;
      ftypeArray[0].amounttopay = paysettings.monthlyregfees;
      ftypeArray[1].setupfee    = paysettings.newregfees;
      ftypeArray[1].amounttopay = paysettings.monthlyfregfees;
    }else {
      ftypeArray[0].setupfee    = paysettings.newregfees;
      ftypeArray[0].amounttopay = paysettings.annualregfees;
      ftypeArray[1].setupfee    = paysettings.newregfees;
      ftypeArray[1].amounttopay = paysettings.annualfregfees;
    }
    setFormvalues((values) => ({ ...values, ['ftypeArray']: ftypeArray }));
  }, [paysettings,formvalues.stype]);

  const onClickHandler = (e) => {
    let dataset             = e.target.dataset;
    let currentValue        = dataset.value;
    let stype               = currentValue==0 ? 1 : 0;
    setFormvalues((values) => ({ ...values, ['stype']: stype }));
  };
  const formatCurrency = (value) => {
      if (value === undefined) {
      return "";
      }
      return (Math.round(value * 100) / 100).toFixed(2);
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
  const RedirectPayment = async (e) => {

      let token       = localStorage.getItem("vendorToken");
      token           = JSON.parse(token);
      let userSession = token && token.user ? token.user : null;
      let vid         = userSession && userSession.id ? userSession.id : 0;



      let dataset                     = e.target.dataset;
      let requestForm                 = {};
      requestForm['vid']              = vid;
      requestForm['stype']            = formvalues.stype;
      requestForm['ftype']            = dataset.ftype;
      requestForm['setupfee']         = formvalues.ftypeArray[dataset.ftype].setupfee;
      requestForm['amounttopay']      = formvalues.ftypeArray[dataset.ftype].amounttopay;
      requestForm['payamount']        = parseFloat(formvalues.ftypeArray[dataset.ftype].setupfee) + parseFloat(formvalues.ftypeArray[dataset.ftype].amounttopay);

      /* let redirectUrl = '/payments';
      if(vid>0){
        redirectUrl = window.PAY;
      }
 */
      let redirectUrl = props.redirect;
      navigate(redirectUrl, {
        state: {
          request:requestForm,
          paymentAPI: servicesPage.STRIPE_API['PARTNERSHIP_PUBLIC'],
        },
      });
  };

  return (
      <div className="h-screen pb-[10rem]">
        {/* toggle switch */}
        {/* <div style={{height:"200px",overflow:"scroll"}}>
          <pre>{JSON.stringify(paysettings, null, 2)}</pre>
        </div>
        <div style={{height:"200px",overflow:"scroll"}}>
          <pre>{JSON.stringify(formvalues['ftypeArray'], null, 2)}</pre>
        </div> */}
        <h2 className="partnership-header">Partnetship Benefits</h2>
        <div className="toggle-div">
          <h5>Monthly</h5>
          <button onClick={(e) => onClickHandler(e)} data-value={formvalues.stype} className="toggle-switch">
            <div
              className="benefit-button"
              style={{
                marginLeft: `${formvalues.stype==1 ? "36px" : "2px"}`,
                background: `${formvalues.stype==1 ? "#fff" : "#fff"}`,
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
                      ${formvalues['ftypeArray'] && formatCurrency(formvalues['ftypeArray'][0].amounttopay)}
                    </span>{" "}
                    {formvalues['stype']==0 ? "/month" : "/yearly"}
                  </span>
                  <h5>
                    {" "}
                    + <span className="font-change">${formvalues['ftypeArray'] && formatCurrency(formvalues['ftypeArray'][0].setupfee)} </span>Setup Fee{" "}
                  </h5>
                </div>
                <div>
                  <span className="text-[30px] font-[600]">Partnership</span>

                  <h5 style={{ visibility: formvalues['stype']==0 ? "visible" : "hidden" }}>
                    12 month minimum
                  </h5>
                </div>
                <button className="partnership-apply-button"
                  data-ftype={0}
                  onClick={(e) => RedirectPayment(e)}>
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
                    ${formvalues['ftypeArray'] && formatCurrency(formvalues['ftypeArray'][1].amounttopay)}
                    </span>{" "}
                    {formvalues['stype']==0 ? "/month" : "/yearly"}
                  </span>
                  <h5>
                    {" "}
                    + Featured + <span className="font-change">${formvalues['ftypeArray'] && formatCurrency(formvalues['ftypeArray'][1].setupfee)} </span>Setup Fee{" "}
                  </h5>
                </div>
                <div>
                  <span className="text-[30px] font-[600]">+ Featured</span>

                  <h5 style={{ visibility: formvalues['stype']==0 ? "visible" : "hidden" }}>
                    12 month minimum
                  </h5>
                </div>
                <button className="partnership-apply-button"
                  data-ftype={1}
                  onClick={(e) => RedirectPayment(e)}>
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
                  {moreButtonText2}
                  {/* <FaAnglesDown size={18} color="#6cc2bc" /> */}
                </div>
              </div>
            </div>{" "}
          </div>
        </main>
      </div>
  );
};

export default AbiaMembershipoffers;
