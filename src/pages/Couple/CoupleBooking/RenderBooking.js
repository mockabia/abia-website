import React, { useEffect, useState } from "react";

import { LuCheckCircle2 } from "react-icons/lu";
import { Link } from "react-router-dom";

function RenderBooking(props) {
  const data = props.data;
  const setChoosenCategory = props.setChoosenCategory;
  const setFormValues = props.setFormValues;

  const handleEdit = (vendor) => {
    setChoosenCategory(vendor.catId);
    setFormValues({});
    setFormValues((values) => ({
      ...values,
      ["business_id"]: vendor.vid,
      ["phone"]: vendor.phone,
      ["email"]: vendor.email,
      ["budget"]: vendor.budget,
    }));
  };

  return (
    <>
      {data?.map((vendor) => {
        return (
          <div className="booked-card">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[10px]">
                <LuCheckCircle2 size={40} fill="#fff" color="#d7d7d7" />
                <h4>Booked</h4>
              </div>
              <h4
                className="font-[600] underline cursor-pointer"
                onClick={() => handleEdit(vendor)}
              >
                Edit
              </h4>
            </div>
            <h2>{vendor.category}</h2>
            <j4>{vendor.vname}</j4>
            <div className="booked-image-container">
              <img className="" src={vendor.imageUrl} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RenderBooking;
