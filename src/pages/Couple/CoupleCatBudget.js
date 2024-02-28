import React, { useEffect, useState } from "react";
import "../Style/CoupleCatBudget.css";
import { BoxStyle2, BudgetInput, CancelCoupleButton, CheckBoxStyle, CheckBoxTypo, CoupleAddButton } from "../../components/FormStyle";
import { Box, Divider, FormControlLabel, FormGroup, Grid, InputAdornment, Modal, Stack, Typography, } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useNavigate,Link } from "react-router-dom";
import * as CoupleJS from "./Couple";
import AddNewCategory from "./CoupleCatBudget/AddNewCategory";
import RenderSelectedCategories from "./CoupleCatBudget/RenderSelectedCategories";

const CoupleCatBudget = (props) => {

  let navigate                                  = useNavigate();
  const [data, setData]                         = useState([]);
  const [budget, setBudget]                     = useState([]);
  const [unpaidList, setUnpaidList]             = useState([]);
  const [addOpen, setAddOpen]                   = useState(false);
  const [showBudget, setShowBudget]             = useState("");
  const [edit, setEdit]                         = useState(false);
  const [showBudgetField, setShowBudgetField]   = useState(false);

  useEffect(() => {
    CoupleJS.coupleCategories(setBudget, setData, setUnpaidList);
  }, []);

  const handleAddOpen = () => setAddOpen(true);

  //  Block 1
  const saveBudget = () => {
    CoupleJS.updateBudget(budget,setShowBudget,setEdit);
  };

  const showHideBudgetField = () => {
    setShowBudgetField(!showBudgetField)
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setBudget(value)
  };
  const formatCurrency = (value) => {
    if (value === undefined) {
      return "";
    }
    /* return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }); */
    return (Math.round(value * 100) / 100).toFixed(2);
  };

  return (
    <section className="budget-section">
      <div className="budget-add-section">
        <p className="add-section-header">
          Manage your wedding budget in one place.
        </p>
        <div onClick={handleAddOpen}>
          <CoupleAddButton>Add</CoupleAddButton>
        </div>
      </div>
      {/* Adding Marketing Category- Modal */}
      <AddNewCategory services={data.services} open={addOpen} setOpen={setAddOpen} setData={setData} setBudget={setBudget} setUnpaidList={setUnpaidList}  />
      <Divider />
      {/* Budget Summary */}
      <div className="budget-main-section">
        <div className="budget-summary-section">
          <div className="budget-summary-flex">
            <div className="budget-summary-1">
              {/*bloc 1*/}
              <div className="mb-[0.5rem]">
                <h3>Your Budget Goals</h3>
              </div>
              <div className={`max-speed-section ${showBudget ? "filled" : ""}`} >
                <div className="maxSpeed-1"></div>
                <h5 className="maxspend-2">My Budget</h5>
                {showBudgetField ? (
                  <div className="flex gap-[1rem]">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                        $
                      </span>
                      <input type="number" value={budget} onChange={(e) => handleChange(e)} className="pl-8 " />
                    </div>
                    <div className="flex gap-[1rem]">
                      <button className="font-[800] underline" onClick={saveBudget} >
                        <h5>Save</h5>
                      </button>
                      <button className="font-[800] underline" onClick={() => { setBudget(data.budget);showHideBudgetField()}}>
                        <h5>Cancel</h5>
                      </button>
                    </div>
                  </div>
                ) : (budget!='' && budget>0) ? (
                  <div className="flex gap-[6rem]">
                    <span
                      sx={{
                        fontFamily: "Source-sans-pro",
                        fontSize: "14px",
                      }}
                    >
                      ${formatCurrency(budget)}
                    </span>
                    <button
                      className="edit-button-block1 font-[800] underline"
                      onClick={showHideBudgetField}
                    >
                      <h5>Edit</h5>
                    </button>
                  </div>
                ):(
                  <button className="maxspend-3" onClick={showHideBudgetField} > <h5>Click to add</h5> </button>
                )}
              </div>
              <div className="max-speed-section">
                <div className="total-cost-1"></div>
                <h5 className="totalcost-2">Total Cost</h5>
                <h5 className="totalcost-amount">
                  ${formatCurrency(data.totalCost)}
                </h5>
              </div>
              <div className="max-speed-section">
                <div className="total-unpaid-1"></div>
                <h5 className="unpaid-2">Total Unpaid</h5>
                <h5 className="totalunpaid-amount">
                  ${formatCurrency(data.totalUnpaid)}
                </h5>
              </div>
            </div>
            {/* block 2 */}
            <div className="budget-summary-2">
              {unpaidList.length > 0 ? (
                <div className="unpaid-items-section">
                  <h3>
                    <number>{unpaidList.length}</number> Unpaid payments:
                  </h3>
                  <ul>
                    {unpaidList.map((item, index) => (
                      <li key={index} className="unpaid-list-item">
                        <h5>{item.title}:</h5>{" "}
                        <h5 className="font-change">
                          ${formatCurrency(item.unpaid)}
                        </h5>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="unpaid-items-section">
                  <h3>0 Unpaid Payments</h3>
                </div>
              )}
            </div>
          </div>

          <Divider orientation="vertical" flexItem />

          <br />
          {/* Table */}
          <div className="budget-table-section">
            <table style={{ width: "100%" }}>
              <thead className="table-header-row">
                <tr>
                  <th className="budget-th-item-style">Item name</th>
                  <th className="budget-th-style">Unpaid</th>
                  <th className="budget-th-style">Paid</th>
                  <th className="budget-th-style">Total Cost</th>
                </tr>
              </thead>
              <RenderSelectedCategories services={data.services} setData={setData} setBudget={setBudget} setUnpaidList={setUnpaidList} />
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleCatBudget;
