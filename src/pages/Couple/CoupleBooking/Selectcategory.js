import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { CoupleAddCategoryButton } from "../../../components/FormStyle";

function Selectcategory(props) {
  const categoryList = props.categoryList;
  const open = props.open;
  const setOpen = props.setOpen;
  const setData = props.setData;
  const setChoosenCategory = props.setChoosenCategory;
  const setFormValues = props.setFormValues;

  const handleModalClose = () => {
    setChoosenCategory(0);
    setOpen(false);
  };
  const toggleOpenBusiness = (category) => {
    setOpen(false);
    setChoosenCategory(category.id);
    setFormValues({});
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-category"
        aria-describedby="modal-category-add"
      >
        <div>
          <div className="booked-modal-container">
            <div className="booked-modal-content">
              <div className="flex justify-end" onClick={handleModalClose}>
                <AiOutlineClose size={26} className=" fixed cursor-pointer " />
              </div>
              <div className="flex flex-col gap-[1rem]">
                {/* heading */}
                <div className="text-center mt-[3rem]">
                  <h1>Who do you want to add ?</h1>
                </div>
                {/* Category item */}
                <div className="flex justify-center items-center flex-wrap gap-[0.5rem]">
                  {categoryList.map((category, index) => (
                    <div key={category.id}>
                      <CoupleAddCategoryButton
                        onClick={() => toggleOpenBusiness(category)}
                      >
                        {category.title}
                      </CoupleAddCategoryButton>
                    </div>
                  ))}
                </div>
                <div
                  className="flex justify-end items-center mt-[3rem] mr-[10%]"
                  onClick={handleModalClose}
                >
                  <button className="cancel-button">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Selectcategory;
