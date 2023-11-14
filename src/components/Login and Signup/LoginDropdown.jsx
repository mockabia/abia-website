import React, { useEffect, useRef } from "react";
import "./LoginDropdown.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginDropdown = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const menuItem = [
    {
      title: "Couple",
      path: "/business/wedding-login",
    },
    {
      title: "Vendor",
      path: "/business/login",
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
    <div className="" ref={dropdownRef}>
      <button
        className={`navbar-login-button ${buttonClicked ? "active" : ""}`}
        onClick={handleButtonClick}
      >
        Login
      </button>
      {open && (
        <div className="login-dropdown-menu">
          <ul>
            {menuItem.map((item) => (
              <li className="loginnav-menu-item" key={item.title}>
                <Link to={item.path}>{item.title}</Link>{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;
