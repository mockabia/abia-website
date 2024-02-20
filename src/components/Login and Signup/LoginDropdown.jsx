import React, { useEffect, useRef } from "react";
import "./LoginDropdown.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import CouplesLogin from "../../pages/Couple/CouplesLogin";

const LoginDropdown = () => {
  const [buttonClicked, setButtonClicked]   = useState(false);
  const [open, setOpen]                     = useState(false);
  const [loginOpen, setLoginOpen]           = useState(false);

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
        <div className="login-dropdown-menu">
          <ul>
            <li
              className="loginnav-menu-item"
              onClick={() => setButtonClicked(false)}
            >
              <Link to={window.VLOGIN}>Vendor</Link>
            </li>
            <li className="loginnav-menu-item">
              <div onClick={handleLoginOpen}>Couple</div>
            </li>
          </ul>
        </div>
      )}

      {/* <Modal
        open={loginOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CouplesLogin handleClosePage={handleModalClose} />
        </Box>
      </Modal> */}
      <CouplesLogin modalOpen={loginOpen} setModalOpen={setLoginOpen} />
    </div>
  );
};

export default LoginDropdown;

/* {menuItem.map((item) => (
              <li className="loginnav-menu-item" key={item.title}>
                <Link to={item.path}>{item.title}</Link>{" "}
              </li>
            ))} */
