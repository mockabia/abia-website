import React, { useState } from "react";
import { Button, Modal, Paper, Typography } from "@mui/material";

const BusinessSettings_6 = () => {
  const [formValues, setFormValues] = useState({
    card_number: "",
    expiry: "",
    ccv: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    // Handle cancel logic
    closeModal();
  };

  const handleCancelAndKeepActive = () => {
    // Handle cancel and keep me active logic
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Values:", formValues);
  };
  return (
    <div>
      <div className="basic-info-container">
        <div className="basic-sub-header">
          <p className="whitespace-break-spaces">Update Payment Detaisl</p>
        </div>
        <div className="mt-[20px]">
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className=" md:w-[25rem]">
              <label className="font-semibold">Card Number</label>
              <div>
                <input
                  type="number"
                  name="card_number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="cancelsub-input-style2"
                  value={formValues.card_number}
                  onChange={handleChange}
                  //   className={`basicinfo-input-style ${
                  //     errors.name ? "signup-error-border" : ""
                  //   }`}
                  //   defaultValue={vendorDetails.name}
                  //   {...register("name")}
                />
                {/* <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {errors.name?.message}
                </p> */}
              </div>
            </div>
            <div className=" lg:w-[26rem] flex gap-[1rem]">
              {/* Wesbite */}
              <div className="">
                <label className="font-semibold">Expiry</label>
                <div>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    className="cancelsub-input-style"
                    value={formValues.expiry}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* CCV */}
              <div className="">
                <label className="font-semibold">CCV</label>
                <div>
                  <input
                    type="text"
                    placeholder="XXX"
                    name="ccv"
                    className="cancelsub-input-style"
                    value={formValues.ccv}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="settings-cancelpay-buttons">
              {/* Submit */}
              <div
                className="basicinfo-submit-button"
                //   className={`basicinfo-submit-button ${
                //     settingResponse ? "focused" : ""
                //   }`}
                //   onClick={handleSubmit}
              >
                <button>Save</button>
                {/* <button>{loading ? "Loading..." : "Save"}</button> */}
              </div>
              {/* Cancel */}
              <div className="text-center">
                <button className="cancel-pr-button" onClick={openModal}>
                  Cancel Partnership & Reviews
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            position: "absolute",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="div"
            align="center"
            fontFamily={"Manrope"}
            fontWeight={"600"}
          >
            Are you ready to cancel?
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            If you cancel your ABIA Partnership, your listing and reviews will
            no longer be visible to the public on ABIA or Google.
          </Typography>
          <div className="modal-buttons">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="cpp-cancel-button"
              onClick={handleCancelAndKeepActive}
            >
              Cancel and Keep Me Active
            </button>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default BusinessSettings_6;
