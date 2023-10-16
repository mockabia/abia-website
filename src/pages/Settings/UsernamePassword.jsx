import React, { useEffect, useState } from "react";
import "./UsernamePassword.css";

const UsernamePassword = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPasswrd] = useState("");
  const [inputConfirmPasssword, setInputConfirmPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const handleInputUsernameChange = (e) => {
    setInputUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPasswrd(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setInputConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      inputUsername,
      inputPassword,
      inputConfirmPasssword,
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

  return (
    <div className="username-password-container">
      <div className="mt-[20px]">
        <form className="space-y-7">
          <div className="space-y-2">
            <label className="font-semibold">Username*</label>
            <br />
            <div>
              <input
                type="text"
                required
                className="usernamepassword-input-style"
                value={inputUsername}
                onChange={handleInputUsernameChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Password*</label>
            <br />
            <div>
              <input
                type="password"
                required
                className="usernamepassword-input-style"
                value={inputPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Repeat Password*</label>
            <br />
            <div>
              <input
                type="password"
                required
                className="usernamepassword-input-style"
                value={inputConfirmPasssword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
          <div className="usernamepassword-submit-button">
            <button onClick={handleSubmit}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsernamePassword;
