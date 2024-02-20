import React from "react";
import { PublicProfileDate } from "../../../components/DatepickerPublic";

const PublicEnquiry = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[1rem] p-[34px] ">
      <h2>Message Vendor </h2>
      <input placeholder="Name" className="pp-input-message" />
      <input placeholder="Email" className="pp-input-message" />
      <input placeholder="Phone" className="pp-input-message" />
      <PublicProfileDate />
      <textarea placeholder="wrtie your message" className="pp-textarea" />
      <button className="pp-submit-button">Send</button>
    </div>
  );
};

export default PublicEnquiry;
