import React, { useEffect, useState } from "react";
import "./UsernamePassword.css";
import { BUSINESS_SETTINGS3 } from "../../api/apiUrls";

const UsernamePassword = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPasswrd] = useState("");
  const [inputConfirmPasssword, setInputConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const handleInputEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPasswrd(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setInputConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputPassword !== inputConfirmPasssword) {
      setPasswordMatchError("Please repeat the password");
      return;
    } else {
      setPasswordMatchError("");
    }
    const formData = {
      emaiil: inputEmail,
      password: inputPassword,
      re_password: inputConfirmPasssword,
    };

    try {
      const response = await fetch(BUSINESS_SETTINGS3, {
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
            <label className="font-semibold">Email*</label>
            <br />
            <div>
              <input
                type="email"
                name="email"
                required
                className="usernamepassword-input-style"
                value={inputEmail}
                onChange={handleInputEmailChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Password*</label>
            <br />
            <div>
              <input
                type="password"
                name="password"
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
                name="re_password"
                required
                className="usernamepassword-input-style"
                value={inputConfirmPasssword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {passwordMatchError && (
              <div className="error-message">{passwordMatchError}</div>
            )}
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
