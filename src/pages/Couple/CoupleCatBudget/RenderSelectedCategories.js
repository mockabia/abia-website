import React, { useEffect, useState } from "react";
import { BoxStyle2, BudgetInput,CancelCoupleButton, CheckBoxStyle, CheckBoxTypo, CoupleAddButton } from "../../../components/FormStyle";
import { Box, FormControlLabel, FormGroup,InputAdornment, Grid, Modal, Stack, } from "@mui/material";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useNavigate,Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";

import * as CoupleJS from "../Couple";
import UpdateCategoryBudget from "./UpdateCategoryBudget";

function RenderSelectedCategories(props) {
    const services                                  = props.services;
    const setData                                   = props.setData;
    const setBudget                                 = props.setBudget;
    const setUnpaidList                             = props.setUnpaidList;
    const [budgetOpen, setBudgetOpen]               = useState(false);
    const [viewService, setViewService]             = useState([]);

      const [expandedCategory, setExpandedCategory] = useState(false);

      useEffect(() => {
        setExpandedCategory(0);
      }, []);
    
  const toggleBudget = (mainTitle, subitem) => {
    setBudgetOpen(!budgetOpen);
    setViewService(subitem)
    setViewService(values => ({...values,['itemTitle']: mainTitle }))
    /* setSelectedMarketingCategory(marketingCategory);
    setSelectedSubitem(subitem);

    // Initialize the updatedSubitemDetails and updatedPaid state values
    const subitemKey = `${marketingCategory}-${subitem}`;
    const subitemDetail = subItemDetails[subitemKey] || {
      unpaid: 0,
      paid: 0,
      totalCost: 0,
    };
    setSubitemContent(subitemContents[subitemKey] || "");
    setUpdatedSubitemDetails(subitemDetail);
    setUpdatedPaid(subitemDetail.paid); */
  };
  const formatCurrency = (value) => {
      if (value === undefined) {
      return "";
      }
      return (Math.round(value * 100) / 100).toFixed(2);
  };
  const toggleAccordion = (category) => {
    setExpandedCategory((prevExpandedCategory) =>
      prevExpandedCategory === category ? false : category
    );
  };

    return (
        <>
          {/* <pre>{JSON.stringify(props.services, null, 2)}</pre> */}
          <tbody>
            {services && services.map((selectedOption, index) => {
  
              const isCategoryExpanded =
                expandedCategory === index;
              const rows = [];
  
              // Display category row
              rows.push(
                <tr
                  key={`category-${index}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <td
                    className="category-table-header cursor-pointer"
                    colSpan={4}
                  >
                    <div className="flex justify-between items-center">
                      {selectedOption.itemTitle}
                      <span
                        className={`cursor-pointer expand-icon ${isCategoryExpanded ? "expanded" : "collapsed"
                          }`}
                      >
                        {/* Your expand/collapse icon */}
                        <svg
                          width="2rem"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d={
                              isCategoryExpanded
                                ? "M7 14l5 5 5-5z"
                                : "M7 10l5-5 5 5z"
                            }
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              );
  
              if (selectedOption.sub && isCategoryExpanded) {
                // If there are subitems and the category is expanded
                let categoryUnpaidTotal = 0;
                let categoryPaidTotal = 0;
                let categoryTotalCost = 0;
  
                selectedOption.sub.forEach((subitem, subindex) => {
                  const unpaidValue = subitem.cost - subitem.paid;
                  categoryUnpaidTotal = Number(categoryUnpaidTotal) + Number(unpaidValue);
                  categoryPaidTotal = Number(categoryPaidTotal) + Number(subitem.paid);
                  categoryTotalCost = Number(categoryTotalCost) + Number(subitem.cost);
  
                  // Display subitem row
                  rows.push(
                    <>
                    <tr className="subitem-list-table" key={`subitem-${subindex}`}
                      onClick={() =>
                        toggleBudget(selectedOption.itemTitle, subitem)
                      }
                    >
                      <td className="subitem-label">{subitem.title}</td>
                      <td className="renderdata-td-style"> ${formatCurrency(unpaidValue)} </td>
                      <td className="renderdata-td-style"> ${formatCurrency(subitem.paid)} </td>
                      <td className="renderdata-td-style"> ${formatCurrency(subitem.cost)} </td>
                    </tr>
                    <tr className="subitem-list-table">
                      {/* Budget detail box */}
                      {budgetOpen && (<UpdateCategoryBudget viewService={viewService} setOpen={setBudgetOpen} setData={setData} setBudget={setBudget} setUnpaidList={setUnpaidList}  />)}
                    </tr>
                    </>
                  );
                });
  
                // Display total row for the category
                rows.push(
                  <tr key={`category-totals-unpaid-${index}`} className="total-row" >
                    <td className="font-bold text-[14px] pl-[1rem]"> Total </td>
                    <td className="renderdata-td-style font-bold"> ${formatCurrency(categoryUnpaidTotal)} </td>
                    <td className="renderdata-td-style font-bold"> ${formatCurrency(categoryPaidTotal)} </td>
                    <td className="renderdata-td-style font-bold"> ${formatCurrency(categoryTotalCost)} </td>
                  </tr>
                );
              }
  
              return rows;
            })}
          </tbody>
        </>
      );
  }
  
export default RenderSelectedCategories;