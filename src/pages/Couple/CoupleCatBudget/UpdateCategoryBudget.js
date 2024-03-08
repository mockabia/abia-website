import React, { useEffect, useState } from "react";
import {
  BoxStyle2,
  BudgetInput,
  CancelCoupleButton,
  CheckBoxStyle,
  CheckBoxTypo,
  CoupleAddButton,
} from "../../../components/FormStyle";
import {
  Box,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Grid,
  Modal,
  Stack,
} from "@mui/material";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";

import * as CoupleJS from "../Couple";

function UpdateCategoryBudget(props) {
  const setData = props.setData;
  const setBudget = props.setBudget;
  const setUnpaidList = props.setUnpaidList;
  //const open                                      = props.open;
  const setOpen = props.setOpen;
  const [wordCount, setWordCount] = useState("0");
  const viewService = props.viewService;
  const [modalInputs, setModalInputs] = React.useState(viewService);
  const [modalInputsErrors, setModalInputsErrors] = React.useState({});
  const [unpaidValue, setUnpaidValue] = useState(0);
  useEffect(() => {
    let unpaidValue = modalInputs.cost - modalInputs.paid;
    setUnpaidValue(unpaidValue);
  }, [modalInputs.cost, modalInputs.paid]);

  const modalHandleChange = (name, value) => {
    setModalInputs((values) => ({ ...values, [name]: value }));
  };

  const formatCurrency = (value) => {
    if (value === undefined) {
      return "";
    }
    return (Math.round(value * 100) / 100).toFixed(2);
  };
  const handleSaveBudgetDetails = () => {
    CoupleJS.updateBudgetCategory(
      modalInputs,
      setModalInputsErrors,
      setData,
      setBudget,
      setUnpaidList,
      closeBudget
    );
    //closeBudget();
  };
  const closeBudget = () => {
    setOpen(false);
  };

  return (
    <div className="budgetdetail-overlay">
      <div className="flex justify-end" onClick={closeBudget}>
        <AiOutlineClose size={26} className=" fixed cursor-pointer " />
      </div>
      <div className="budgetdetail-content relative mt-[2rem] h-[100%]">
        <div>
          <h5>{modalInputs.itemTitle}</h5>
          <h1>{modalInputs.title}</h1>
        </div>
        {/* icon */}
        <div className="budget-icon-section">
          <IoRestaurantOutline size={30} />
          <Link
            to="/wedding-directory0"
            className="flex items-center cursor-pointer"
          >
            <h5 className="font-bold">Explore Category</h5>
            <HiOutlineArrowSmRight size={26} />
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <h3>Cost:</h3>
          <BudgetInput
            type="number"
            value={modalInputs.cost || ""}
            onChange={(e) => modalHandleChange("cost", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <h3>Paid:</h3>
          <BudgetInput
            type="number"
            value={modalInputs.paid || ""}
            onChange={(e) => modalHandleChange("paid", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <h5>Unpaid:</h5>
          <p className="unpaid-text-budgetbox ">
            ${formatCurrency(unpaidValue)}
          </p>
        </div>
        {/* Notes */}
        <div>
          <div className="flex gap-[0.5rem]">
            <h3> Notes</h3>
            <span>(optional)</span>
          </div>
          <textarea
            className="budgetdetail-notes-textarea"
            value={modalInputs.notes || ""}
            onChange={(e) => {
              const inputValue = e.target.value;

              const words = inputValue.trim().split(/\s+/);
              const count = words.length;

              setWordCount(count);
            }}
          />
          <h5 className="word-count">{wordCount} / 200</h5>
        </div>
        {/* Save and Cancel */}
        <div className="budgetdetail-save-button mt-[3rem]">
          <CancelCoupleButton onClick={closeBudget}>Cancel</CancelCoupleButton>
          <CoupleAddButton onClick={handleSaveBudgetDetails}>
            Save
          </CoupleAddButton>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategoryBudget;
