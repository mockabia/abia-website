import React, { useEffect, useState } from "react";
import { Button, Modal, Paper, Typography } from "@mui/material";
import { Expiryinput, PaymentInput } from "../../../components/FormStyle";
import MaskedInput from "react-text-mask";
import * as BusinessJS from "../Business";
import { AiOutlineClose } from "react-icons/ai";
import * as servicesPage from "../../../services/vendor/businessServices";
import StripePayUpdate from "../../Stripe/StripePayUpdate";

const BusinessSettings_6 = (props) => {
  const [formvalues, setFormvalues]             = useState({});
  const [paymentStatus, setPaymentStatus]       = useState(0);
  const [updateModal, setUpdateModal]           = useState(false);
  const [cancelModal, setCancelModal]           = useState(false);

  useEffect(() => {
    console.log()
    //BusinessJS.vendorSubs(setFormvalues);
  }, []);
  useEffect(() => {
    let vendorDetail = props.vendorDetails;
    if(vendorDetail.SubscriptionsDetails!=""){
      setFormvalues((values) => ({...values,["vid"]: vendorDetail.id,
      ["subscr_id"]: vendorDetail.SubscriptionsDetails.subscr_id,
      ["stripe_subscription_id"]: vendorDetail.SubscriptionsDetails.stripe_subscription_id,
      ["stripe_customer_id"]: vendorDetail.SubscriptionsDetails.stripe_customer_id,
      ["card_no"]: vendorDetail.SubscriptionsDetails.last4,
      ["card_expiry"]: vendorDetail.SubscriptionsDetails.exp_month+'/'+vendorDetail.SubscriptionsDetails.exp_year,
        ["email"]: vendorDetail.email,["holdername"]: vendorDetail.contact_person,
        ["mem_stype"]: vendorDetail.mem_stype,["mem_ftype"]: vendorDetail.mem_ftype,
        ["payamount"]: vendorDetail.mem_amount}));
    }
    
  }, [props.vendorDetails]);

  const openUpdateModal = () => {
    setUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
  };
  const handleUpdatePaymentSubmit = (e) => {
    e.preventDefault();
    closeUpdateModal(); // Close the modal after saving
  };

  const openCancelModal = () => {
    setCancelModal(true);
  };

  const closeCancelModal = () => {
    setCancelModal(false);
  };

  const handleCancel = () => {
    //api for cancel stripe
    BusinessJS.cancelSubscription(formvalues,setCancelModal)
  };

  const handleCancelAndKeepActive = () => {
    // Handle cancel and keep me active logic
    closeCancelModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="basic-info-container">
        <span onClick={openUpdateModal} className="subs-update-header">
          Update Payment Details
        </span>
        <div className="mt-[20px]">
          <form className="space-y-7" onSubmit={handleSubmit}>
            {/* Card number */}
            <div className=" md:w-[25rem] input-label-field">
              <label className="font-semibold">Card Number</label>
              <div>
                <Expiryinput
                  disabled
                  type="text"
                  name="card_number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  style={{ width: "98%" }}
                  // className="cancelsub-input-style2"
                  value={formvalues.mem_card_no}
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
                    disabled
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    // className="cancelsub-input-style"
                    value={formvalues.mem_card_expiry}
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
                    disabled
                    type="password"
                    placeholder="XXX"
                    name="ccv"
                    // className="cancelsub-input-style"
                    value={formvalues.ccv}
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
                <button className="cancel-pr-button" onClick={openCancelModal}>
                  Cancel Partnership & Reviews
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/*Cancel Modal */}
      <Modal
        open={cancelModal}
        onClose={closeCancelModal}
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
            width: { xs: "90vw", sm: "35vw" },
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div
            className="flex justify-end cursor-pointer"
            onClick={handleCancel}
          >
            <AiOutlineClose size={26} />
          </div>
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
            <button
              className="cpp-cancel-button"
              onClick={handleCancelAndKeepActive}
            >
              Keep me Active
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </Paper>
      </Modal>

      {/* Modal for updating payment details */}
      <Modal
        open={updateModal}
        onClose={closeUpdateModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
        }}
      >
        <Paper
          sx={{
            position: "absolute",
            width: { xs: "90vw", sm: "35vw" },
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div
            className="flex justify-end cursor-pointer"
            onClick={closeUpdateModal}
          >
            <AiOutlineClose size={26} />
          </div>
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
          <StripePayUpdate formvalues={formvalues} setFormvalues={setFormvalues}
              paymentAPI={servicesPage.STRIPE_API['UPDATE_CARD_DETAILS']} setPaymentStatus={setPaymentStatus} setUpdateModal={setUpdateModal} />
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default BusinessSettings_6;
