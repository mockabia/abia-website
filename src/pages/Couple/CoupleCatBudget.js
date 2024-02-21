import React, { useEffect, useState } from "react";
import LayoutCouple from "../../layouts/Layout/LayourCouple2";
import "../Style/CoupleCatBudget.css";
import {
  BoxStyle,
  BoxStyle2,
  BudgetInput,
  CancelCoupleButton,
  CheckBoxStyle,
  CheckBoxTypo,
  CoupleAddButton,
  CoupleCommonInput,
} from "../../components/FormStyle";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const CoupleCatBudget = () => {
  const title = "Budget";
  const [addOpen, setAddOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [savedCategories, setSavedCategories] = useState([]);
  const [budget, setBudget] = useState("");

  const [showBudget, setShowBudget] = useState("");
  const [edit, setEdit] = useState(false);
  //   budget detail
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [subItemDetails, setSubItemDetails] = useState({
    unpaid: "",
    paid: "",
    totalCost: "",
  });
  const [selectedSubitem, setSelectedSubitem] = useState(null);
  const [selectedMarketingCategory, setSelectedMarketingCategory] =
    useState(null);
  const unpaidItems = [];
  const [updatedSubitemDetails, setUpdatedSubitemDetails] = useState({});
  const [updatedPaid, setUpdatedPaid] = useState(0);
  const [subitemContent, setSubitemContent] = useState("");
  const [subitemContents, setSubitemContents] = useState("");
  const [wordCount, setWordCount] = useState("0");
  const [expandedCategory, setExpandedCategory] = useState(false);

  const toggleAccordion = (category) => {
    setExpandedCategory((prevExpandedCategory) =>
      prevExpandedCategory === category ? false : category
    );
  };

  const toggleBudget = (marketingCategory, subitem) => {
    setSelectedMarketingCategory(marketingCategory);
    setSelectedSubitem(subitem);
    setBudgetOpen(!budgetOpen);

    // Initialize the updatedSubitemDetails and updatedPaid state values
    const subitemKey = `${marketingCategory}-${subitem}`;
    const subitemDetail = subItemDetails[subitemKey] || {
      unpaid: 0,
      paid: 0,
      totalCost: 0,
    };
    setSubitemContent(subitemContents[subitemKey] || "");
    setUpdatedSubitemDetails(subitemDetail);
    setUpdatedPaid(subitemDetail.paid);
  };
  const closeBudget = () => {
    setBudgetOpen(false);
  };

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => {
    setAddOpen(!addOpen);
  };

  const handleMarketingChange = (option) => {
    const isSelected = selectedCategory.some(
      (selectedOption) => selectedOption.id === option.id
    );

    setSelectedCategory((prevSelectedOptions) => {
      return isSelected
        ? prevSelectedOptions.filter(
            (selectedOption) => selectedOption.id !== option.id
          )
        : [...prevSelectedOptions, { id: option.id, label: option.label }];
    });
  };

  const handleSaveCategory = () => {
    console.log("Selected Categories:", selectedCategory);
    setSavedCategories([...selectedCategory]);
    handleAddClose();
  };

  //  Block 1
  const handleSaveBudget = () => {
    setShowBudget(Number(budget));
    setEdit(false);
    console.log("Entered Budget:", budget);
  };
  const handleEditBudget = () => {
    setEdit(true);
  };

  const formatCurrency = (value) => {
    if (value === undefined) {
      return "";
    }
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const marketingOptions = [
    {
      id: 1,
      label: "Vendor venue",
      subitems: [
        {
          id: 1,
          label: "Sea-side Resort",
        },
        {
          id: 2,
          label: "Food and Beverages",
        },
        {
          id: 3,
          label: "Photographer",
        },
        {
          id: 4,
          label: "Florist",
        },
      ],
    },
    {
      id: 2,
      label: "Wedding Dresses",
      subitems: [
        {
          id: 1,
          label: "Rental Gowns",
        },
        {
          id: 2,
          label: "Rental Suit",
        },
        {
          id: 3,
          label: "Classic Gowns",
        },
        {
          id: 4,
          label: "Combo Dresses",
        },
      ],
    },
    {
      id: 3,
      label: "Photography",
      subitems: [
        {
          id: 1,
          label: "Rental Gowns",
        },
        {
          id: 2,
          label: "Rental Suit",
        },
        {
          id: 3,
          label: "Classic Gowns",
        },
        {
          id: 4,
          label: "Combo Dresses",
        },
      ],
    },
  ];

  useEffect(() => {
    if (savedCategories.length > 0) {
      const firstItemLabel = savedCategories[0].label;
      setExpandedCategory(firstItemLabel);
    }
  }, [savedCategories]);

  const handleSaveBudgetDetails = () => {
    // Calculate the unpaid value
    const unpaidValue = updatedSubitemDetails.totalCost - updatedPaid;

    // Update subItemDetails with the modified details
    setSubItemDetails((prevSubItemDetails) => ({
      ...prevSubItemDetails,
      [`${selectedMarketingCategory}-${selectedSubitem}`]: {
        unpaid: unpaidValue,
        paid: updatedPaid,
        totalCost: updatedSubitemDetails.totalCost,
      },
    }));
    // Update subitem content for the current subitem
    setSubitemContents((prevSubitemContents) => ({
      ...prevSubitemContents,
      [`${selectedMarketingCategory}-${selectedSubitem}`]: subitemContent,
    }));

    // console.log("Marketing Category:", selectedMarketingCategory);
    // console.log("Subitem:", selectedSubitem);
    // console.log("Updated Total Cost:", updatedSubitemDetails.totalCost);
    // console.log("Updated Paid:", updatedPaid);
    // console.log("Subitem Content:", subitemContent);
    // Close the Budget detail box
    closeBudget();
  };

  // unpaid items list
  const getUnpaidItems = () => {
    const unpaidItemsList = [];

    savedCategories.forEach((selectedOption) => {
      const selectedItem = marketingOptions.find(
        (option) => option.label === selectedOption.label
      );

      if (!selectedItem) {
        console.error("Selected item not found:", selectedOption);
        return null;
      }

      if (selectedItem.subitems) {
        selectedItem.subitems.forEach((subitem) => {
          const subitemKey = `${selectedItem.label}-${subitem.label}`;
          const subitemDetail = subItemDetails[subitemKey] || {
            unpaid: 0,
            paid: 0,
            totalCost: 0,
          };

          if (subitemDetail.unpaid > 0) {
            unpaidItemsList.push({
              label: subitem.label,
              unpaid: subitemDetail.unpaid,
            });
          }
        });
      }
    });

    return unpaidItemsList;
  };

  const unpaidItemsList = getUnpaidItems();

  // Calcualte total
  const calculateTotals = () => {
    let totalCostTotal = 0;
    let unpaidTotal = 0;
    savedCategories.forEach((selectedOption) => {
      const selectedItem = marketingOptions.find(
        (option) => option.label === selectedOption.label
      );

      if (!selectedItem) {
        console.error("Selected item not found:", selectedOption);
        return null;
      }

      if (selectedItem.subitems) {
        selectedItem.subitems.forEach((subitem) => {
          const subitemKey = `${selectedItem.label}-${subitem.label}`;
          const subitemDetail = subItemDetails[subitemKey] || {
            unpaid: 0,
            paid: 0,
            totalCost: 0,
          };

          unpaidTotal += subitemDetail.unpaid;
          totalCostTotal += subitemDetail.totalCost;
        });
      }
    });
    return {
      totalCostTotal,
      unpaidTotal,
    };
  };

  // Call the calculateTotals function to get the totals
  const { totalCostTotal, unpaidTotal } = calculateTotals();

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
        <Modal
          open={addOpen}
          onClose={handleAddClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={BoxStyle2} noValidate autoComplete="off">
            <div className="flex justify-start items-center p-[0.5rem]">
              <h4>
                Tick the services you are looking for and add you budgets.
              </h4>
            </div>
            {/* Checkbox */}
            <Stack spacing={3} alignContent="center">
              <FormGroup>
                <Grid container spacing={1}>
                  {marketingOptions.map((option, index) => (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      key={index}
                      direction="column"
                    >
                      <FormControlLabel
                        control={
                          <CheckBoxStyle
                            size="medium"
                            value={option.value}
                            checked={selectedCategory.some(
                              (selectedOption) =>
                                selectedOption.id === option.id
                            )}
                            onChange={() => handleMarketingChange(option)}
                          />
                        }
                        label={<CheckBoxTypo>{option.label}</CheckBoxTypo>}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
              <div className="cbudget-button-group">
                <CancelCoupleButton onClick={handleAddClose}>
                  Cancel
                </CancelCoupleButton>
                <CoupleAddButton type="submit" onClick={handleSaveCategory}>
                  Save
                </CoupleAddButton>
              </div>
            </Stack>
          </Box>
        </Modal>
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
                <div
                  className={`max-speed-section ${showBudget ? "filled" : ""}`}
                >
                  <div className="maxSpeed-1"></div>
                  <h5 className="maxspend-2">My Budget</h5>
                  {!edit ? (
                    <div>
                      {showBudget ? (
                        <div className="flex gap-[6rem]">
                          <Typography
                            sx={{
                              fontFamily: "Source-sans-pro",
                              fontSize: "14px",
                            }}
                          >
                            ${formatCurrency(showBudget)}
                          </Typography>
                          <button
                            className="edit-button-block1 font-[800] underline"
                            onClick={handleEditBudget}
                          >
                            <h5>Edit</h5>
                          </button>
                        </div>
                      ) : (
                        <button
                          className="maxspend-3"
                          onClick={handleEditBudget}
                        >
                          <h5>Click to add</h5>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-[1rem]">
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="pl-8 w-[5rem] font-change text-[14px]"
                        />
                      </div>
                      <div className="flex gap-[1rem]">
                        <button
                          className="font-[800] underline"
                          onClick={handleSaveBudget}
                        >
                          <h5>Save</h5>
                        </button>
                        <button
                          className="font-[800] underline"
                          onClick={() => setEdit(false)}
                        >
                          <h5>Cancel</h5>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="max-speed-section">
                  <div className="total-cost-1"></div>
                  <h5 className="totalcost-2">Total Cost</h5>
                  <h5 className="totalcost-amount">
                    ${formatCurrency(totalCostTotal)}
                  </h5>
                </div>
                <div className="max-speed-section">
                  <div className="total-unpaid-1"></div>
                  <h5 className="unpaid-2">Total Unpaid</h5>
                  <h5 className="totalunpaid-amount">
                    ${formatCurrency(unpaidTotal)}
                  </h5>
                </div>
              </div>
              {/* block 2 */}
              <div className="budget-summary-2">
                {unpaidItemsList.length > 0 ? (
                  <div className="unpaid-items-section">
                    <h3>
                      <number>{unpaidItemsList.length}</number> Unpaid payments:
                    </h3>
                    <ul>
                      {unpaidItemsList.map((item, index) => (
                        <li key={index} className="unpaid-list-item">
                          <h5>{item.label}:</h5>{" "}
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
                <tbody>
                  {savedCategories.map((selectedOption, index) => {
                    const selectedItem = marketingOptions.find(
                      (option) => option.label === selectedOption.label
                    );

                    if (!selectedItem) {
                      console.error("Selected item not found:", selectedOption);
                      return null;
                    }

                    const isCategoryExpanded =
                      expandedCategory === selectedItem.label;

                    const rows = [];

                    // Display category row
                    rows.push(
                      <tr
                        key={`category-${index}`}
                        onClick={() => toggleAccordion(selectedItem.label)}
                      >
                        <td
                          className="category-table-header cursor-pointer"
                          colSpan={4}
                        >
                          <div className="flex justify-between items-center">
                            {selectedItem.label}
                            <span
                              className={`cursor-pointer expand-icon ${
                                isCategoryExpanded ? "expanded" : "collapsed"
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

                    if (selectedItem.subitems && isCategoryExpanded) {
                      // If there are subitems and the category is expanded
                      let categoryUnpaidTotal = 0;
                      let categoryPaidTotal = 0;
                      let categoryTotalCostTotal = 0;

                      selectedItem.subitems.forEach((subitem, subindex) => {
                        const subitemKey = `${selectedItem.label}-${subitem.label}`;
                        const subitemDetail = subItemDetails[subitemKey] || {
                          unpaid: 0,
                          paid: 0,
                          totalCost: 0,
                        };
                        const unpaidValue =
                          subitemDetail.totalCost - subitemDetail.paid;

                        categoryUnpaidTotal += unpaidValue;
                        categoryPaidTotal += subitemDetail.paid;
                        categoryTotalCostTotal += subitemDetail.totalCost;

                        if (unpaidValue > 0) {
                          unpaidItems.push({
                            label: subitem.label,
                            unpaid: unpaidValue,
                          });
                        }

                        // Display subitem row
                        rows.push(
                          <tr
                            className="subitem-list-table"
                            key={`subitem-${subindex}`}
                            onClick={() =>
                              toggleBudget(selectedItem.label, subitem.label)
                            }
                          >
                            <td className="subitem-label">{subitem.label}</td>
                            <td className="renderdata-td-style">
                              ${formatCurrency(unpaidValue)}
                            </td>
                            <td className="renderdata-td-style">
                              ${formatCurrency(subitemDetail.paid)}
                            </td>
                            <td className="renderdata-td-style">
                              ${formatCurrency(subitemDetail.totalCost)}
                            </td>
                          </tr>
                        );
                      });

                      // Display total row for the category
                      rows.push(
                        <tr
                          key={`category-totals-unpaid-${index}`}
                          className="total-row"
                        >
                          <td className="font-bold text-[14px] pl-[1rem]">
                            Total
                          </td>
                          <td className="renderdata-td-style font-bold">
                            ${formatCurrency(categoryUnpaidTotal)}
                          </td>
                          <td className="renderdata-td-style font-bold">
                            ${formatCurrency(categoryPaidTotal)}
                          </td>
                          <td className="renderdata-td-style font-bold">
                            ${formatCurrency(categoryTotalCostTotal)}
                          </td>
                        </tr>
                      );
                    }

                    return rows;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Budget detail box */}
        {budgetOpen && (
          <>
            <div className="budgetdetail-overlay">
              <div className="flex justify-end" onClick={closeBudget}>
                <AiOutlineClose size={26} className=" fixed cursor-pointer " />
              </div>
              <div className="budgetdetail-content relative mt-[2rem] h-[100%]">
                <div>
                  <h5>{selectedMarketingCategory}</h5>
                  <h1>{selectedSubitem}</h1>
                </div>
                {/* icon */}
                <div className="budget-icon-section">
                  <IoRestaurantOutline size={30} />
                  <Link to="/wedding-directory0" className="flex items-center cursor-pointer">
                    <h5 className="font-bold">Explore Category</h5>
                    <HiOutlineArrowSmRight size={26} />
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <h3>Cost:</h3>
                  <BudgetInput
                    type="number"
                    value={updatedSubitemDetails.totalCost || ""}
                    onChange={(e) =>
                      setUpdatedSubitemDetails({
                        ...updatedSubitemDetails,
                        totalCost:
                          e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
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
                    value={updatedPaid || ""}
                    onChange={(e) => setUpdatedPaid(Number(e.target.value))}
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
                    $
                    {formatCurrency(
                      updatedSubitemDetails.totalCost - updatedPaid
                    )}
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
                    value={
                      subitemContents[
                        `${selectedMarketingCategory}-${selectedSubitem}`
                      ] || ""
                    }
                    onChange={(e) => {
                      const key = `${selectedMarketingCategory}-${selectedSubitem}`;
                      const inputValue = e.target.value;

                      const words = inputValue.trim().split(/\s+/);
                      const count = words.length;

                      setWordCount(count);

                      setSubitemContent(inputValue);
                      setSubitemContents((prevSubitemContents) => ({
                        ...prevSubitemContents,
                        [key]: inputValue,
                      }));
                    }}
                  />
                  <h5 className="word-count">{wordCount} / 200</h5>
                </div>
                {/* Save and Cancel */}
                <div className="budgetdetail-save-button mt-[3rem]">
                  <CancelCoupleButton onClick={closeBudget}>
                    Cancel
                  </CancelCoupleButton>
                  <CoupleAddButton onClick={handleSaveBudgetDetails}>
                    Save
                  </CoupleAddButton>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
  );
};

export default CoupleCatBudget;
