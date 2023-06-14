import React, { useState } from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import ContentHeader from "../../layouts/sidebar/ContentHeader";
import "./pastWedding.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSolidDownArrow } from "react-icons/bi";

import SelectDropdown from "../../third-party-packs/checkBoxSelect";
import Dropdown from "../../third-party-packs/dropDown";

const PastWedding = () => {
  const [clientName, setClientName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  //Select option data
  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
  };

  const handleSelectedOptions = (options) => {
    setSelectedOptions(options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      selectedOptions,
    };
    console.log(formData);

    setSelectedOptions([]);
  };

  const options = [
    { value: "wedding-venue", label: "Wedding Venue" },
    { value: "ceremony-venue", label: "Ceremony Venue" },
    { value: "function-cordinator", label: "Function Cordinator" },
    { value: "firstnight-honeymoon", label: "1st Night Honeymoon" },
  ];

  return (
    <>
      <TopBar title="Register - Past Wedding" />
      <div className="md:hidden">
        <ContentHeader title="Register Past Weddings" />
      </div>
      <div className="register-past">
        <div className="main-header-past">
          <p className="main-lead-past">
            Send an online voting form to your wedding clients today
          </p>
          <p className="mt-[5px]">
            Your clients will receive a customised voting link delivered
            directly to their inbox/junk mail. We highly recommend you text or
            email your client advising{" "}
            <span className="text-[#3fa19a] ">vote@abia.com.au</span> has sent
            them an email.
          </p>
        </div>
        {/* Registration Guidelines */}
        <div className="card-past">
          <p className="text-[20px] font-bold">Registration Guide:</p>
          <ol className="custom-ol ">
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
                  className="text-[#3fa19a]  underline underline-offset-4 "
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
              <label className="header-text-past">
                Services Booked - sample*
              </label>
              <br />
              <div className="relative">
                {/* <span className="downarrow-icon "></span> */}
                <Dropdown options={options} />
                {/* <input type="text" required className="input-style" /> */}
              </div>
              <br />
            </form>
          </div>
          {/* Submit Button */}
          <div className="relative space-y-3">
            <button className="submit-button" onClick={handleSubmit}>
              submit
            </button>
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
