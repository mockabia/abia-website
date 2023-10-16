import React from "react";
import { ReactComponent as PriceTag } from "../../icons/price-tag.svg";

const SpecialTag = () => {
  const quantity = 5;
  return (
    <div className="flex justify-start items-end space-x-2">
      <PriceTag style={{ width: "22px", height: "22px" }} />
      <div className="font-semibold">
        {quantity === 1 ? (
          <span>
            <span className="font-source-pro">1</span>{" "}
            <span className="small-x">x</span> Special
          </span>
        ) : (
          <span>
            <span className="font-source-pro">{quantity}</span>{" "}
            <span className="small-x">x</span> Specials
          </span>
        )}
      </div>
    </div>
  );
};

export default SpecialTag;
