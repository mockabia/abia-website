import React from "react";
import "../../Style/fonts.css";

const fonts = () => {
  return (
    <div className="center-container">
      {/* Digits */}
      <div>
        <h1>ABIA Digit Font</h1>
        <div className="flex flex-col">
          <span>Raleway - 0 1 2 3 4 5 6 7 8 9</span>
          <span className="font-source">Source - 0 1 2 3 4 5 6 7 8 9</span>
          <span className="font-manrope">Manrope - 0 1 2 3 4 5 6 7 8 9</span>
          <span className="font-veranda" style={{ fontFamily: "Verdana" }}>
            Verdana - 0 1 2 3 4 5 6 7 8 9
          </span>
        </div>
      </div>
      <br />
      <div className="flex justify-center">
        <div className="font-container">
          <span className="text-[30px] font-bold">Manrope</span>
          <h1>Heading 1 – Bold – Size 20px</h1>
          <h1 style={{ color: "black" }}>Heading 1 – Black – Size 20px</h1>
          <h1 style={{ fontWeight: "400" }}>Heading 1 – Bold – Size 20px</h1>
          <br />
          <h2>Heading 2 – Bold – Size 18px</h2>
          <h2 style={{ color: "black" }}>Heading 2 – Black – Size 18px</h2>
          <h2 style={{ fontWeight: "400" }}>Heading 2 – Bold – Size 18px</h2>
          <br />
          <h3>Heading 3 – Bold – Size 20px</h3>
          <h3 style={{ color: "black" }}>Heading 3 – Black – Size 20px</h3>
          <h3 style={{ fontWeight: "400" }}>Heading 3 – Bold – Size 20px</h3>
        </div>
        <br />
        <div className="font-container-2">
          <span className="text-[30px] font-bold">Roboto</span>
          <h1>Heading 1 – Bold – Size 20px</h1>
          <h1 style={{ color: "black" }}>Heading 1 – Black – Size 20px</h1>
          <h1 style={{ fontWeight: "400" }}>Heading 1 – Bold – Size 20px</h1>
          <br />
          <h2>Heading 2 – Bold – Size 18px</h2>
          <h2 style={{ color: "black" }}>Heading 2 – Black – Size 18px</h2>
          <h2 style={{ fontWeight: "400" }}>Heading 2 – Bold – Size 18px</h2>
          <br />
          <h3>Heading 3 – Bold – Size 20px</h3>
          <h3 style={{ color: "black" }}>Heading 3 – Black – Size 20px</h3>
          <h3 style={{ fontWeight: "400" }}>Heading 3 – Bold – Size 20px</h3>
        </div>
      </div>
      <br />
      <div className="flex justify-center">
        <div className="font-container-3">
          <span className="text-[30px] font-bold">Nimbus</span>
          <h1>Heading 1 – Bold – Size 20px</h1>
          <h1 style={{ color: "black" }}>Heading 1 – Black – Size 20px</h1>
          <h1 style={{ fontWeight: "400" }}>Heading 1 – Bold – Size 20px</h1>
          <br />
          <h2>Heading 2 – Bold – Size 18px</h2>
          <h2 style={{ color: "black" }}>Heading 2 – Black – Size 18px</h2>
          <h2 style={{ fontWeight: "400" }}>Heading 2 – Bold – Size 18px</h2>
          <br />
          <h3>Heading 3 – Bold – Size 20px</h3>
          <h3 style={{ color: "black" }}>Heading 3 – Black – Size 20px</h3>
          <h3 style={{ fontWeight: "400" }}>Heading 3 – Bold – Size 20px</h3>
        </div>
        <br />
        <div className="font-container-4">
          <span className="text-[30px] font-bold">Helvetica</span>
          <h1>Heading 1 – Bold – Size 20px</h1>
          <h1 style={{ color: "black" }}>Heading 1 – Black – Size 20px</h1>
          <h1 style={{ fontWeight: "400" }}>Heading 1 – Bold – Size 20px</h1>
          <br />
          <h2>Heading 2 – Bold – Size 18px</h2>
          <h2 style={{ color: "black" }}>Heading 2 – Black – Size 18px</h2>
          <h2 style={{ fontWeight: "400" }}>Heading 2 – Bold – Size 18px</h2>
          <br />
          <h3>Heading 3 – Bold – Size 20px</h3>
          <h3 style={{ color: "black" }}>Heading 3 – Black – Size 20px</h3>
          <h3 style={{ fontWeight: "400" }}>Heading 3 – Bold – Size 20px</h3>
        </div>
      </div>
    </div>
  );
};

export default fonts;
