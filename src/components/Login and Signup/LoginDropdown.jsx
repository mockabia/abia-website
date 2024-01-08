import React, { useEffect, useRef } from "react";
import "./LoginDropdown.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import CouplesLogin from "../../pages/Couple/CouplesLogin";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
};

const LoginDropdown = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, seetModalOpen] = useState(false);

  const handleModalOpen = () => seetModalOpen(true);
  const handleModalClose = () => seetModalOpen(false);

  const menuItem = [
    {
      title: "Couple",
      path: window.CLOGIN,
    },
    {
      title: "Vendor",
      path: window.VLOGIN,
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
            <li className="loginnav-menu-item">
              <Link to={window.VLOGIN}>Vendor</Link>
            </li>
            <li className="loginnav-menu-item">
              <div onClick={handleModalOpen}>Couple</div>
            </li>
          </ul>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CouplesLogin handleClosePage={handleModalClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default LoginDropdown;

/* {menuItem.map((item) => (
              <li className="loginnav-menu-item" key={item.title}>
                <Link to={item.path}>{item.title}</Link>{" "}
              </li>
            ))} */
