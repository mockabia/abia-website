import React, { useEffect, useState } from "react";
import "./ContactDetails.css";

const ContactDetails = () => {
  const [inputContactName, setInputContactName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputPostcode, setInputPostCode] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputState, setInputState] = useState("");

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

  const handleStateChange = (e) => {
    setInputState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      contactName: inputContactName,
      email: inputEmail,
      phone: inputPhone,
      address: inputAddress,
      postcode: inputPostcode,
      city: inputCity,
      state: inputState,
    };
    const vendorId = "<Vendor_id>";
    const apiEndpoint = `https://abia.abia-test.com/web/WebBusinessVendor/${vendorId}`;
    try {
      const response = await fetch(apiEndpoint, {
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     inputContactName,
  //     inputEmail,
  //     inputPhone,
  //     inputAddress,
  //     inputPostcode,
  //     inputCity,
  //     // inputState,
  //     // selectedOptions,
  //   };
  //   console.log(formData);

  //   setInputContactName("");
  //   setInputEmail("");
  //   setInputPhone(null);
  //   setInputAddress("");
  //   setInputPostCode("");
  //   setInputCity("");
  //   setInputState("");
  //   // setSelectedOptions([]);
  // };

  const states = [
    { value: "ACT", label: "ACT" },
    { value: "NSW", label: "NSW" },
    { value: "QLD", label: "QLD" },
    { value: "SA", label: "SA" },
    { value: "VIC", label: "VIC" },
    { value: "WA", label: "WA" },
  ];
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
                type="text"
                inputMode="tel"
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
