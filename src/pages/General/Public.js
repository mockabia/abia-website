import React from "react";
import LayoutGeneral from "../../layouts/Layout/LayoutGeneral";
import "../Style/Public.css";

const Public = () => {
  return (
    <>
      <LayoutGeneral>
        <div>
          <div className="public-content">
            <div className="public-box">
              <div className="flex flex-col justify-center items-center p-[20px] relative">
                {/* error message */}
                <h1 className="public-header">ABIA Home Page</h1>
              </div>
            </div>
          </div>
        </div>
      </LayoutGeneral>
    </>
  );
};

export default Public;
