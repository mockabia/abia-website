import React from "react";
import RequestPricing from "./RequestPricing";
import HeartButton from "./HeartButton";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { ThemeProvider } from "@mui/material/styles";
import { ReactComponent as PriceTag } from "../../../icons/price-tag.svg";
import { RatingComponent } from "../../../components/FormStyle";
import "../../Style/GeneralDirectory.css";

const Card = ({ card, locationOptions, servicesOptions }) => {
  // need to handle the data from external api ( check)
  const [location, setLocation] = useState("Sample");
  const [business, setBusiness] = useState(card.business);
  const [rating, setRating] = useState(0);
  const [votes, setVotes] = useState(0);
  const [special, setSpecial] = useState(0);
  const [businessImage, setBusinessImage] = useState("");

  const isPlural = card.special !== (0 || 1);
  const formattedVotes = card.votes.toLocaleString();

  return (
    <div className=" relative">
      <HeartButton locationOptions={locationOptions} />
      <img src={card.imgSrc} className="dircard-image" />
      <div className="dircard-info  space-y-[5px]">
        <h5 className="direcard-location text-[#8e8e8e]">{card.location}</h5>
        <h2 className="header font-[500]">{card.business}</h2>

        {/* Rating info */}
        <ThemeProvider theme={RatingComponent}>
          <div className="rating-ifno-div space-x-2">
            <h5 className="font-semibold text-[16px] ">{card.rating}</h5>
            <Rating
              name="half-rating-read"
              size="medium"
              precision={0.25}
              value={card.rating}
              readOnly
            />
            <span className="text-[#8e8e8e]  ">({formattedVotes})</span>
          </div>
        </ThemeProvider>

        {/* Special Tag */}
        <div className="flex justify-start items-end space-x-2">
          <PriceTag style={{ width: "22px", height: "22px" }} />
          <div className="font-semibold">
            <span>
              <span className="font-source-pro">{card.special}</span>{" "}
              <span className="small-x">x</span> Special{isPlural ? "s" : ""}
            </span>
          </div>
        </div>
        {/* Request Pricing */}
        <RequestPricing
          business={business}
          locationOptions={locationOptions}
          servicesOptions={servicesOptions}
        />
      </div>
    </div>
  );
};

export default Card;
