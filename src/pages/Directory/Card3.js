import React from "react";
import "./style.css";
import hotel from "../../assets/hotels/The Event Artists-02.jpg";
import RatingInfo from "./RatingInfo";
import SpecialTag from "./SpecialTag";
import RequestPricing from "./RequestPricing";
import HeartButton from "./HeartButton";
import { PricingButton } from "../../components/FormStyle";

const Card3 = () => {
  return (
    <div className=" relative">
      <HeartButton />
      <img src={hotel} className="dircard-image" />
      <div className="dircard-info  space-y-[5px]">
        <h5 className="direcard-location text-[#8e8e8e]">Carold, QLD</h5>
        <h2 className="header font-[500]">Summergrove Estate</h2>
        <RatingInfo />
        <SpecialTag />
        <RequestPricing />
      </div>
    </div>
  );
};

export default Card3;
