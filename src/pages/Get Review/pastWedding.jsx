import React, { useState } from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import ContentHeader from "../../layouts/sidebar/ContentHeader";
import "./pastWedding.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSolidDownArrow } from "react-icons/bi";

const PastWedding = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      {/* <TopBar title="Register - Past Wedding" /> */}
      <div className="md:hidden">
        <ContentHeader title="Register Past Weddings" />
      </div>
      <div className="register-past">
        <div className="main-header">
          <p className="main-lead">
            Send an online voting form to your wedding clients today
          </p>
          <p className="mt-[5px]">
            Your clients will receive a customised voting link delivered
            directly to their inbox/junk mail. We highly recommend you text or
            email your client advising{" "}
            <span className="text-[#3fa19a] font-semibold">
              vote@abia.com.au
            </span>{" "}
            has sent them an email.
          </p>
        </div>
        {/* Registration Guidelines */}
        <div className="card">
          <p className="text-[20px] font-bold">Registration Guide:</p>
          <ol className="custom-ol">
            <li className="custom-li">
              ABIA will not release registered details to any third parties.
            </li>
            <li className="custom-li">
              Only register weddings that took place in the past 12 months from
              00-00-0000
            </li>
            <li className="custom-li">
              Your Wedding Client has 365 days from their wedding date to
              complete the form.
            </li>
            <li className="custom-li">
              You can{" "}
              <span>
                <a
                  className="text-[#3fa19a] font-semibold underline underline-offset-4 "
                  href="www.abia.com.au/vendor/wedding-history"
                >
                  resend the online voting forms
                </a>{" "}
              </span>
              every 3 days.
            </li>
            <li className="custom-li">
              ABIA will send an automated reminder to your Wedding Client at
              least '2' times.
            </li>
          </ol>
        </div>
        {/* Register - Form */}
        <div className="form-grid">
          <div className="mt-[25px]">
            <form className="space-y-3">
              <label className="font-bold">Client's Full Name*</label>
              <br />
              <div className="relative">
                <span className="user-icon"></span>
                <input type="text" required className="input-style" />
              </div>
              <br />
              <label className="font-bold">Partner's Name*</label>
              <br />
              <div className="relative">
                <span className="heart-icon"></span>
                <input type="text" required className="input-style" />
              </div>
              <br />

              <label className="font-bold">Wedding Date*</label>
              <br />
              <div className="relative">
                <input type="date" required className="input-style" />
              </div>
              <br />
              <label className="font-bold">Wedding State*</label>
              <br />
              <div className="relative">
                <span className="downarrow-icon"></span>
                <input type="text" required className="input-style" />
              </div>
              <br />
              <label className="font-bold">Email**</label>
              <br />
              <div className="relative">
                <span className="email-icon"></span>
                <input type="text" required className="input-style" />
              </div>
              <br />
              <label className="font-bold">Confirm Email*</label>
              <br />
              <div className="relative">
                <span className="email-icon"></span>
                <input type="text" required className="input-style" />
              </div>
              <br />
              <label className="font-bold">Phone</label>
              <br />
              <div className="relative">
                <span className="phone-icon"></span>
                <input type="text" required className="input-style" />
              </div>
              <br />
              <label className="font-bold">Service Booked*</label>
              <br />
              <div className="relative">
                <span className="downarrow-icon"></span>
                <input type="text" required className="input-style" />
              </div>
              <br />
            </form>
          </div>
          {/* Submit Button */}
          <div className="relative space-y-3">
            <button className="submit-button">submit</button>
            <p className="text-[12px] ">
              By clicking submit, you agree that all information provided is
              legitimate and correct.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PastWedding;
