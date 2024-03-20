import React from "react";
import "./SignUpDropDown.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

const SignUpDropDown = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const menuItem = [
    {
      title: "Couple",
      path: window.CSIGNUP,

      // path: "/test/signup",
    },
    {
      title: "Vendor",
      path: window.VSIGNUP,
      // path: "busisness/signup",
    },
  ];

  const dropdownRef = useRef(null);

  //css change
  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked);
    setOpen(!open);
  };

  const handleDocumentClick = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setButtonClicked(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        className={`navbar-signup-button ${buttonClicked ? "active" : ""}`}
        onClick={handleButtonClick}
      >
        Sign Up
      </button>
      {open && (
        <div className="signup-dropdown-menu arrow-top">
          <ul>
            {menuItem.map((item) => (
              <li className="signupnav-menu-item" key={item}>
                <Link to={item.path}>{item.title}</Link>{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SignUpDropDown;
