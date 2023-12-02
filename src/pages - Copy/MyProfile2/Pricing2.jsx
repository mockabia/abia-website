import React, { useState } from "react";
import "./Pricing2.css";

const Pricing2 = () => {
  const [amount, setAmount] = useState("");
  const [displayPrice, setDisplayPrice] = useState(false);
  const [inputs, setInputs] = useState({});


  return (
    <div>
      {/* <div className="myprofile-accordion-item-header">
                </div> */}
      {inputs.first_category_val && (
        <div className="mt-[0px]">
          <div>
            <div className="text-[16px] font-semibold">
              {inputs.first_category_val}
            </div>
            {/* pricing input */}
            <div className="mt-[10px] relative">
              <span className="dollar-icon"></span>
              <input
                type="text"
                inputMode="tel"
                required
                className="pricing-input-style"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {/* display price status */}
            <div className="myprofile-button-group relative">
              {/* quickdec-button-group */}
              <div className="mt-[15px]">
                <span className="font-semibold">Display Price ?</span>
                <div className="mt-[15px] space-x-2">
                  <button
                    className={`yes-button ${displayPrice ? "selected" : ""}`}
                    onClick={() => setDisplayPrice(true)}
                  >
                    Yes
                  </button>
                  <button
                    className={`no-button ${!displayPrice ? "selected" : ""}`}
                    onClick={() => setDisplayPrice(false)}
                  >
                    No
                  </button>
                </div>
              </div>
              {/* Submit buttons */}
              <button
                className="pricing-save-button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <br />
      {inputs.other_category && inputs.other_category.length > 0 && (
        <div>
          {inputs.other_category.map((category, index) => (
            <div key={index}>
              {/* <p>Value: {category.value}</p>
                        <p>Label: {category.label}</p> */}
              <div className="mt-[0px]">
                <div>
                  <div className="text-[16px] font-semibold">
                    {category.label}
                  </div>
                  {/* pricing input */}
                  <div className="mt-[10px] relative">
                    <span className="dollar-icon"></span>
                    <input
                      type="text"
                      inputMode="tel"
                      required
                      className="pricing-input-style"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  {/* display price status */}
                  <div className="myprofile-button-group relative">
                    {/* quickdec-button-group */}
                    <div className="mt-[15px]">
                      <span className="font-semibold">Display Price ?</span>
                      <div className="mt-[15px] space-x-2">
                        <button
                          className={`yes-button ${
                            displayPrice ? "selected" : ""
                          }`}
                          onClick={() => setDisplayPrice(true)}
                        >
                          Yes
                        </button>
                        <button
                          className={`no-button ${
                            !displayPrice ? "selected" : ""
                          }`}
                          onClick={() => setDisplayPrice(false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    {/* Submit buttons */}
                    <button
                      className="pricing-save-button"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              {/* Other details you want to display */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pricing2;
