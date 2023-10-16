import React, { useEffect, useState } from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import ContentHeader from "../../layouts/sidebar/ContentHeader";
import "./pastWedding.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSolidDownArrow } from "react-icons/bi";

import Dropdown from "../../third-party-packs/dropDown";
import SingleSelect from "../../third-party-packs/singleSelect";
import Calendar from "../../third-party-packs/Calendar";
import { Dialog, DialogTitle } from "@mui/material";

const PastWedding = () => {
  const [clientName, setClientName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  //Select option data
  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
  };

  const handlePartnerName = (e) => {
    setPartnerName(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleWeddingDate = (date) => {
    setStartDate(date);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleconfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSelectedOptions = (options) => {
    setSelectedOptions(options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      clientName,
      partnerName,
      startDate,
      state,
      email,
      confirmEmail,
      phoneNumber,
      selectedOptions,
    };
    console.log(formData);

    setClientName("");
    setPartnerName("");
    setStartDate(null);
    setState("");
    setEmail("");
    setConfirmEmail("");
    setPhoneNumber("");
    setSelectedOptions([]);
  };

  const options = [
    { value: "wedding-venue", label: "Wedding Venue" },
    { value: "ceremony-venue", label: "Ceremony Venue" },
    { value: "function-cordinator", label: "Function Cordinator" },
    { value: "firstnight-honeymoon", label: "1st Night Honeymoon" },
  ];

  const states = [
    { value: "ACT", label: "ACT" },
    { value: "NSW", label: "NSW" },
    { value: "QLD", label: "QLD" },
    { value: "SA", label: "SA" },
    { value: "VIC", label: "VIC" },
    { value: "WA", label: "WA" },
  ];

  return (
    <>
      <TopBar title="Register Past Weddings" />
      <div className="md:hidden">
        <ContentHeader title="Register Past Weddings" />
      </div>
      <div className="register-past">
        <div className="main-header-past">
          <h2 className="">
            Send an online voting form to your wedding clients today
          </h2>
          <p className="mt-[10px] whitespace-adjust">
            Your clients will receive a customised voting link delivered
            directly to their inbox/junk mail. We highly recommend you text or
            email your client advising{" "}
            <span className="text-[#3fa19a] font-[600] cursor-pointer ">
              vote@abia.com.au
            </span>{" "}
            has sent them an email.
          </p>
        </div>
        {/* Registration Guidelines */}
        <div className="card-past">
          <h3 className=" lg:ml-[11px]">Registration Guide:</h3>
          <ul className="custom-ol ">
            <li className="mt-[10px] custom-li ">
              <p className="whitespace-adjust">
                1. ABIA will not release registered details to any third
                parties.
              </p>
            </li>
            <li className="mt-[10px] custom-li  ">
              <p className="whitespace-adjust">
                2. Only register weddings that took place in the past 12 months
                from 00-00-0000
              </p>
            </li>
            <li className="mt-[10px] custom-li">
              <p className="whitespace-adjust">
                3. Your Wedding Client has 365 days from their wedding date to
                complete the form.
              </p>
            </li>
            <li className="custom-li mt-[10px]">
              <p className="whitespace-adjust">
                4. You can{" "}
                <span>
                  <a
                    className="text-[#3fa19a] font-semibold underline underline-offset-4 "
                    href="www.abia.com.au/vendor/wedding-history"
                  >
                    resend the online voting forms
                  </a>{" "}
                </span>
                every 3 days.
              </p>
            </li>
            <li className="mt-[10px] custom-li">
              <p className="whitespace-adjust">
                {" "}
                5. ABIA will send an automated reminder to your Wedding Client
                at least '2' times.
              </p>
            </li>
          </ul>
        </div>
        {/* Register - Form */}
        <div className="form-grid">
          <div className="mt-[25px]">
            <form className="space-y-0 font-semibold">
              <label className="t">Client's Full Name*</label>
              {/* <br /> */}
              <div className="relative">
                <span className="user-icon"></span>
                <input
                  type="text"
                  required
                  className="input-style"
                  value={clientName}
                  onChange={handleClientNameChange}
                />
              </div>
              <br />
              <label className="header-text-past">Partner's Name*</label>
              <br />
              <div className="relative">
                <span className="heart-icon"></span>
                <input
                  type="text"
                  required
                  className="input-style"
                  value={partnerName}
                  onChange={handlePartnerName}
                />
              </div>
              <br />
              <div className="mt-[0px]">
                <label>Wedding Date*</label>
                <div className="relative">
                  <Calendar
                    onFormSubmit={handleSubmit}
                    onChange={handleWeddingDate}
                    tabIndex={0}
                  />
                </div>
                <p className="text-[12px] text-[#f20431] font-extrabold mt-[40px]">
                  Wedding Date must be before 00-00-0000.{" "}
                </p>
              </div>

              <br />
              <label className="header-text-past">Wedding State*</label>
              <br />
              <div className="relative" onChange={handleStateChange}>
                <SingleSelect options={states} onFormSubmit={handleSubmit} />
              </div>
              <br />
              <label className="header-text-past">Email*</label>
              <br />
              <div className="relative">
                <span className="email-icon"></span>
                <input
                  type="email"
                  required
                  className="input-style"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <br />
              <label className="header-text-past">Confirm Email*</label>
              <br />
              <div className="relative">
                <span className="email-icon"></span>
                <input
                  type="email"
                  required
                  className="input-style"
                  value={confirmEmail}
                  onChange={handleconfirmEmailChange}
                />
              </div>
              <br />
              <label className="header-text-past">Phone</label>
              <br />
              <div className="relative">
                <span className="phone-icon"></span>
                <input
                  type="text"
                  inputMode="tel"
                  required
                  className="input-style"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <br />

              <label className="header-text-past">Services Booked*</label>
              <br />
              <div className="relative">
                <Dropdown options={options} onFormSubmit={handleSubmit} />
              </div>
              <br />
            </form>
          </div>
          {/* Submit Button */}
          <div className="relative space-y-3">
            <button className="submit-button" onClick={handleSubmit}>
              submit
            </button>
            <p className="disclaimer-button-text whitespace-adjust ">
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
