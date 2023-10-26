import React, { useEffect, useState } from "react";
import "./ContactDetails.css";
import { BUSINESS_SETTINGS2 } from "../../api/apiUrls";

const ContactDetails = () => {
  const [inputContactName, setInputContactName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputPostcode, setInputPostCode] = useState("");
  const [inputCity, setInputCity] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const handleContactNameChange = (e) => {
    setInputContactName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setInputPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setInputAddress(e.target.value);
  };

  const handlePostCodeChange = (e) => {
    setInputPostCode(e.target.value);
  };

  const handleCityChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      contact_person: inputContactName,
      email: inputEmail,
      mobile_phone: inputPhone,
      address: inputAddress,
      postcode: inputPostcode,
      suburb: inputCity,
    };
    try {
      // fetch method is used
      const response = await fetch(BUSINESS_SETTINGS2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  return (
    <div className="contact-details-container">
      <div className="mt-[20px]">
        <form className="space-y-5">
          {/* Contact Name */}
          <div>
            <label className="font-semibold">Contact Name*</label>
            <div>
              <input
                type="text"
                name="contact_person"
                required
                className="contactdetails-input-style"
                value={inputContactName}
                onChange={handleContactNameChange}
              />
            </div>
          </div>
          {/* email */}
          <div>
            <label className="font-semibold">Email*</label>
            <div>
              <input
                type="text"
                name="email"
                required
                className="contactdetails-input-style"
                value={inputEmail}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div>
            <label className="font-semibold">Phone/Mobile*</label>
            <div>
              <input
                type="number"
                inputMode="tel"
                name="mobile_phone"
                required
                className="contactdetails-input-style"
                value={inputPhone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>
          <div>
            <label className="font-semibold">Address</label>
            <div>
              <input
                type="text"
                name="address"
                required
                className="contactdetails-input-style"
                value={inputAddress}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">Postcode*</label>
            <div>
              <input
                type="text"
                name="postcode"
                required
                className="contactdetails-input-style"
                value={inputPostcode}
                onChange={handlePostCodeChange}
              />
            </div>
          </div>
          <div>
            <label className="font-semibold">City/Region*</label>
            <div>
              <input
                type="text"
                name="suburb"
                required
                className="contactdetails-input-style"
                value={inputCity}
                onChange={handleCityChange}
              />
            </div>
          </div>
          {/* <div>
            <label className="font-semibold">State*</label>
            <div className="relative contact-detail-singleselect">
              <SingleSelect options={states} />
            </div>
          </div> */}
          <div className="relative space-y-3">
            <button className="submit-button" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;
