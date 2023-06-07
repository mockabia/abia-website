import React from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import "./GetReviews.css";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../layouts/sidebar/ContentHeader";

const GetReviews = () => {
  const navigate = useNavigate();

  const pastWeddingLink = () => {
    navigate("/get-review/past-wedding");
  };

  const futureWeddingLink = () => {
    navigate("/get-review/future-wedding");
  };

  const copyreviewLink = () => {
    navigate("/get-review/copy-link");
  };

  return (
    <>
      <TopBar className="mdb:hidden" title="Get Reviews" />
      <div className="md:hidden">
        <ContentHeader title="Get Reviews" />
      </div>
      <div className="reviews ">
        <div className="main-header">
          <p className="main-lead">
            3 options to get reviews & grow trust in your brand
          </p>
          <p className="main-content ">
            Build trust, book more weddings and feature in the prestigious ABIA
            Wedding Awards by collecting authentic ratings and reviews.
            Businesses that regularly send automatic review-requests tend to
            have a higher trust-factor.
          </p>
        </div>
        <div></div>
        {/* Register Past Wedding */}
        <div className="card card-1 space-y-3">
          <p className="card-main-heading ">Register Past Weddings</p>
          <div className="card-sub-heading space-y-3">
            <p className="font-semibold ">
              Best For:{" "}
              <span className="text-[#6cc2bc]">
                Automating reminders to increase conversion rates!
              </span>
            </p>
            <div className="card-content-and-button ">
              <p className="card-content ">
                The tried and tested . Simply log in to your ABIA Business
                Portal and register any wedding client serviced in the past 12
                months. ABIA automatically sends a personalised voting form and
                reminders to increase your conversion rate.
              </p>
              <div className="button-postion">
                <button
                  onClick={pastWeddingLink}
                  className="button-wedding bg-[#6cc2bc] hover:bg-[#339890] text-white   "
                >
                  <span className="text-[16px]">register past weddings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Register future couples */}
        <div className="card card-2 space-y-3">
          <p className="card-main-heading ">Register Future Couples</p>
          <div className="card-sub-heading space-y-3">
            <p className="font-semibold spacing-ipadAir">
              Best For:{" "}
              <span className="text-[#6cc2bc]">
                Staying organized + automatic reminders!
              </span>
            </p>
            <div
              className="card-content-and-button "
              style={{
                marginTop: window.innerWidth >= 1190 ? "-6px" : "initial",
              }}
            >
              <p className="card-content mt-[10px] md:mt-[0px]">
                Future couples will be sent a personalised voting form 3 days
                after the wedding date. ABIA also sends reminders to increase
                your conversion rate.
              </p>
              <div className="button-postion">
                <button
                  onClick={futureWeddingLink}
                  className="button-wedding bg-[#e8cf82] hover:bg-[#efc649] text-black  "
                >
                  <span className="text-[16px]">register future weddings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Personalised Review Link */}
        <div className="card card-3 space-y-3">
          <p className="card-main-heading ">Send Personalised Review Link</p>
          <div className="card-sub-heading space-y-3">
            <p className="font-semibold spacing-ipadAir">
              Best For:{" "}
              <span className="text-[#6cc2bc]">
                Direct communication with your couples and follow-ups
              </span>
            </p>
            <div
              className="card-content-and-button"
              style={{
                marginTop: window.innerWidth >= 1190 ? "-6px" : "initial",
              }}
            >
              <p className="card-content mt-[10px] md:mt-[0px] ">
                Simply copy & send your personalised voting link to any wedding
                client serviced in the past 12 months. Your link can be sent via
                text, email or DM.
              </p>
              <div className="button-postion">
                <button
                  onClick={copyreviewLink}
                  className="button-wedding bg-[#555555] hover:bg-[#454444] text-white "
                >
                  <span className="text-[16px]">copy review link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetReviews;
