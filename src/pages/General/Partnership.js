import React, { useState } from "react";
import LayoutGeneral from "../../layouts/Layout/LayoutGeneral";
import "../Style/Partnership.css";

const Partnership = () => {
  const [mode, setMode] = useState(false);

  const onClickHandler = () => {
    setMode(!mode);
  };
  return (
    <LayoutGeneral>
      <div className="h-screen">
        {/* toggle switch */}
        <h2 className="main-header">Partnetship Benefits</h2>
        <div className="toggle-div">
          <h5>Monthly</h5>
          <button onClick={onClickHandler} className="toggle-switch">
            <div
              className="benefit-button"
              style={{
                marginLeft: `${mode ? "36px" : "2px"}`,
                background: `${mode ? "#fff" : "#fff"}`,
              }}
            />
          </button>
          <h5>Annually</h5>
        </div>
        {/* main section */}
        <main className="partnership-main">
          <div className="partnership-info-box">
            <div className="flex flex-col gap-[1rem]">
              <div>
                <span>
                  <span className="text-[30px] font-[600] font-change">
                    $41.99
                  </span>{" "}
                  /month{" "}
                </span>
                <h5>
                  {" "}
                  + <span className="font-change">$100.00 </span>Setup Fee{" "}
                </h5>
              </div>
              <div>
                <span className="text-[30px] font-[600]">Partnership</span>

                <h5>12 month minimum</h5>
              </div>
            </div>

            <button className="partnership-apply-button">Apply</button>
          </div>{" "}
          {/* Box 2 */}
          <div className="partnership-info-box">
            <div className="flex flex-col gap-[1rem]">
              <div>
                <span>
                  <span className="text-[30px] font-[600] font-change">
                    $69.99
                  </span>{" "}
                  /month{" "}
                </span>
                <h5>
                  {" "}
                  + Featured + <span className="font-change">$100.00 </span>Setup
                  Fee{" "}
                </h5>
              </div>
              <div>
                <span className="text-[30px] font-[600]">+ Featured</span>

                <h5>12 month minimum</h5>
              </div>
            </div>

            <button className="partnership-apply-button">Apply</button>
          </div>
        </main>
      </div>
    </LayoutGeneral>
  );
};

export default Partnership;
