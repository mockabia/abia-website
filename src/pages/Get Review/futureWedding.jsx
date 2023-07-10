import React, { useEffect, useState } from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import ContentHeader from "../../layouts/sidebar/ContentHeader";
import "./pastWedding.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSolidDownArrow } from "react-icons/bi";

import SelectDropdown from "../../third-party-packs/checkBoxSelect";
import Dropdown from "../../third-party-packs/dropDown";
import SingleSelect from "../../third-party-packs/singleSelect";
import Calendar from "../../third-party-packs/Calendar";

const FutureWedding = () => {
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

  const handleWeddingDate = (e) => {
    setStartDate(e.target.value);
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
    setStartDate(new Date());
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
      <TopBar title="Register Future Weddings" />
      <div className="md:hidden">
        <ContentHeader title="Register Future Weddings" />
      </div>
      <div className="register-past">
        <div className="main-header-past">
          <p className="main-lead-past">
            Schedule an online voting form to be sent 3 days after wedding date.
          </p>
          <p className="mt-[5px]">
            Register your clients below, and they will receive a customised
            voting link 3 days after their wedding date. Furthermore, ABIA will
            send '1' email asking if they need further help planning their
            wedding day.{" "}
          </p>
        </div>
        {/* Registration Guidelines */}
        <div className="card-past">
          <p className="text-[20px] font-bold lg:ml-[11px]">
            Registration Guide:
          </p>
          <ul className="custom-ol ">
            <li className="custom-li">
              1. ABIA will not release registered details to any third parties.
            </li>
            <li className="custom-li">
              2. Only register future weddings after a booking has been
              confirmed and a deposit has been received.
            </li>
            <li className="custom-li">
              3. Your Future Weddings will display in your{" "}
              <span>
                <a
                  className="text-[#3fa19a] font-semibold  underline underline-offset-4 "
                  href="www.abia.com.au/vendor/wedding-history"
                >
                  Wedding History
                </a>
              </span>
              , once the wedding date has passed.
            </li>
            <li className="custom-li">
              4. ABIA will send an automated reminder to your Wedding Client at
              least '2' times.
            </li>
          </ul>
        </div>
        {/* Register - Form */}
        <div className="form-grid">
          <div className="mt-[25px]">
            <form className="space-y-3">
              <label className="header-text-past">Client's Full Name*</label>
              <br />
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
              <label className="header-text-past">Wedding Date*</label>
              <div className=" relative">
                <Calendar
                  onFormSubmit={handleSubmit}
                  onChange={handleWeddingDate}
                />
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

              <label className="header-text-past">Residential State*</label>
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
            <p className="disclaimer-button-text ">
              By clicking submit, you agree that all information provided is
              legitimate and correct.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FutureWedding;
