import React, { useEffect, useState } from "react";
import { Button, Modal, Paper, Typography } from "@mui/material";
import { Expiryinput, PaymentInput } from "../../../components/FormStyle";
import MaskedInput from "react-text-mask";
import * as BusinessJS from "../Business";
const BusinessSettings_6 = () => {
  const [vendorDetail, setVendorDetails] = useState({});
  const [formValues, setFormValues] = useState({
    card_number: "",
    expiry: "",
    ccv: "",
  });
  const [isUpdatePaymentModalOpen, setUpdatePaymentModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    BusinessJS.vendorSubs(setVendorDetails);
  }, []);

  console.log("Subscription:", vendorDetail.subscription);
  // Update modal
  const openUpdatePaymentModal = () => {
    setUpdatePaymentModalOpen(true);
  };

  const closeUpdatePaymentModal = () => {
    setUpdatePaymentModalOpen(false);
  };
  const handleUpdatePaymentSubmit = (e) => {
    e.preventDefault();
    console.log("Form Values:", formValues);
    // Add logic to save payment details
    closeUpdatePaymentModal(); // Close the modal after saving
  };

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
        <span onClick={openUpdatePaymentModal} className="subs-update-header">
          Update Payment Details
        </span>
        <div className="mt-[20px]">
          <form className="space-y-7" onSubmit={handleSubmit}>
            {/* Card number */}
            <div className=" md:w-[25rem] input-label-field">
              <label className="font-semibold">Card Number</label>
              <div>
                <Expiryinput
                  type="text"
                  name="card_number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="cancelsub-input-style2"
                  value={
                    formValues.card_number ||
                    (vendorDetail.subscription &&
                      vendorDetail.subscription.card_number)
                  }
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: MaskedInput,
                    inputProps: {
                      mask: [
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ],
                      guide: false,
                    },
                  }}
                />
                {/* <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {errors.name?.message}
                </p> */}
              </div>
            </div>
            <div className=" lg:w-[26rem] flex gap-[1rem]">
              {/* Expiry */}
              <div className="input-label-field">
                <label className="font-semibold">Expiry</label>
                <div>
                  <Expiryinput
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    className="cancelsub-input-style"
                    value={
                      formValues.expiry ||
                      (vendorDetail.subscription &&
                        vendorDetail.subscription.expiry)
                    }
                    onChange={handleChange}
                    InputProps={{
                      inputComponent: MaskedInput,
                      inputProps: {
                        mask: [/\d/, /\d/, "/", /\d/, /\d/],
                        guide: false,
                      },
                      placeholder: "MM/YY",
                    }}
                  />
                </div>
              </div>
              {/* CCV */}
              <div className="input-label-field">
                <label className="font-semibold">CCV</label>
                <div>
                  <Expiryinput
                    type="password"
                    placeholder="XXX"
                    name="ccv"
                    className="cancelsub-input-style"
                    value={
                      formValues.ccv ||
                      (vendorDetail.subscription &&
                        vendorDetail.subscription.ccv)
                    }
                    onChange={handleChange}
                    InputProps={{
                      inputComponent: MaskedInput,
                      inputProps: {
                        mask: [/\d/, /\d/, /\d/],
                        guide: false,
                      },
                    }}
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
      {/*Cancel Modal */}
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
            width: { xs: "90vw", sm: "40vw" },
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
              Keep Me Active
            </button>
          </div>
        </Paper>
      </Modal>

      {/* Modal for updating payment details */}
      <Modal
        open={isUpdatePaymentModalOpen}
        onClose={closeUpdatePaymentModal}
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
            Update Payment Details
          </Typography>
          <form className="space-y-7" onSubmit={handleUpdatePaymentSubmit}>
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
                />
              </div>
            </div>
            <div className=" lg:w-[26rem] flex gap-[1rem]">
              {/* Expiry */}
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
            {/* Submit */}
            <div className="basicinfo-submit-button" onSubmit={handleSubmit}>
              <button>Save</button>
            </div>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default BusinessSettings_6;
