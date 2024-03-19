import React, { useEffect, useRef } from "react";
import "./LoginDropdown.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import CouplesLogin from "../../pages/Couple/CouplesLogin";

const LoginDropdown = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
    setButtonClicked(false);
    setOpen(false);
  };

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
        <div className="login-dropdown-menu arrow-top">
          <ul>
            <li
              className="loginnav-menu-item"
              onClick={() => setButtonClicked(false)}
            >
              <Link to={window.VLOGIN}>Vendor</Link>
            </li>
            <li className="loginnav-menu-item">
              {/* <div onClick={handleLoginOpen}>Couple</div> */}
              <Link to="/wedding/login">Couple</Link>
            </li>
          </ul>
        </div>
      )}

      {/* <CouplesLogin modalOpen={loginOpen} setModalOpen={setLoginOpen} /> */}
    </div>
  );
};

export default LoginDropdown;
