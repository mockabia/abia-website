import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import {
  CoupleCommonInput,
  VendorLoginButton,
} from "../../../components/FormStyle";
import { PublicProfileDate } from "../../../components/DatepickerPublic";
import { IoClose } from "react-icons/io5";
import "../../Style/PublicProfile.css";

const MobEnquiry = ({ open, onClose }) => {
  const handleClose = () => {
    console.log("Closing Modal");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="mob-pp-enquiry-box">
        <div className="flex justify-end cursor-pointer" onClick={handleClose}>
          <IoClose size={26} />
        </div>
        <h2 id="modal-title" style={{ textAlign: "center" }}>
          Message Vendor
        </h2>
        <input placeholder="Name" className="pp-input-message" />
        <input placeholder="Email" className="pp-input-message" />
        <input placeholder="Phone" className="pp-input-message" />
        <PublicProfileDate />
        <textarea placeholder="wrtie your message" className="pp-textarea" />
        <VendorLoginButton>Send</VendorLoginButton>
      </div>
    </Modal>
  );
};

export default MobEnquiry;
