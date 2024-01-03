import React, { useState } from "react";
import LayoutCouple from "../../layouts/Layout/LayourCouple2";
import "../Style/CoupleCatBudget.css";
import {
  BoxStyle,
  BoxStyle2,
  BudgetEditButton,
  CancelCoupleButton,
  CheckBoxStyle,
  CheckBoxTypo,
  CoupleAddButton,
  CoupleCommonInput,
} from "../../components/FormStyle";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as CoupleJS from "../Couple/Couple";

const CoupleCatBudget = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);
  //   const [marketingOptions, setMarketingOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [budget, setBudget] = useState("");
  const [showBudget, setShowBudget] = useState("");
  const [edit, setEdit] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const [selectedMarketingCategory, setSelectedMarketingCategory] =
    useState(null);
  const [selectedSubitem, setSelectedSubitem] = useState(null);
  const [subItemDetails, setSubItemDetails] = useState({
    unpaid: "",
    paid: "",
    totalCost: "",
  });
  const unpaidItems = [];

  useEffect(() => {
    console.log("Length of the unpaidItems:", unpaidItems.length);
  }, [unpaidItems]);

  console.log("unpaid items:", unpaidItems);
  const updateUnpaid = (value, marketingCategory, subitem) => {
    const key = `${marketingCategory}-${subitem}`;
    setSubItemDetails((prevDetails) => ({
      ...prevDetails,
      [key]: { ...prevDetails[key], unpaid: Number(value) },
    }));
  };

  const updatePaid = (value, marketingCategory, subitem) => {
    const key = `${marketingCategory}-${subitem}`;
    setSubItemDetails((prevDetails) => ({
      ...prevDetails,
      [key]: { ...prevDetails[key], paid: Number(value) },
    }));
  };

  const updateTotalCost = (value, marketingCategory, subitem) => {
    const key = `${marketingCategory}-${subitem}`;
    setSubItemDetails((prevDetails) => ({
      ...prevDetails,
      [key]: {
        ...prevDetails[key],
        totalCost: Number(value),
      },
    }));
  };

  const toggleBudget = (marketingCategory, subitem) => {
    setSelectedMarketingCategory(marketingCategory);
    setSelectedSubitem(subitem);
    setBudgetOpen(!budgetOpen);
  };

  const closeBudget = () => {
    setBudgetOpen(false);
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

  const handleAddClose = () => {
    console.log("Modal closed");
    setAddOpen(!addOpen);
  };

  //   const handleSaveBudget = () => {
  //     setShowBudget(Number(budget));
  //     setEdit(false);
  //   };
  //   const handleEditBudget = () => {
  //     setEdit(true);
  //   };

  const handleSaveCategory = () => {
    setAddOpen(false);
    console.log("Selected option:", selectedOptions);
  };

  const handleMarketingChange = (option) => {
    const isSelected = selectedOptions.includes(option.label);
    setSelectedOptions((prevSelectedOptions) => {
      return isSelected
        ? prevSelectedOptions.filter(
            (selectedOption) => selectedOption !== option.label
          )
        : [...prevSelectedOptions, option.label];
    });
  };

  // block 1
  const handleSaveBudget = () => {
    setShowBudget(Number(budget));
    setEdit(false);
  };
  const handleEditBudget = () => {
    setEdit(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //   useEffect(() => {
  //     CoupleJS.fetchMarketingCategory(setMarketingOptions);
  //   }, []);
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
  ];

  const renderTableRows = () => {
    const rows = [];

    selectedOptions.forEach((selectedOption, index) => {
      const selectedItem = marketingOptions.find(
        (option) => option.label === selectedOption
      );

      // Row for the marketing category
      rows.push(
        <tr key={`category-${index}`}>
          <td className="category-table-header" colSpan={4}>
            {selectedItem.label}
          </td>
        </tr>
      );

      // Rows for subitems
      if (selectedItem.subitems) {
        selectedItem.subitems.forEach((subitem, subindex) => {
          const subitemKey = `${selectedItem.label}-${subitem.label}`;
          const subitemDetail = subItemDetails[subitemKey] || {
            unpaid: 0,
            paid: 0,
            totalCost: 0,
          };
          // Calculate Unpaid value
          const unpaidValue = subitemDetail.totalCost - subitemDetail.paid;

          if (unpaidValue > 0) {
            unpaidItems.push({
              label: subitem.label,
              unpaid: unpaidValue,
            });
          }
          rows.push(
            <tr
              className="subitem-list-table"
              key={`subitem-${subindex}`}
              onClick={() => toggleBudget(selectedItem.label, subitem.label)}
            >
              <td>{subitem.label}</td>
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
      }
    });

    return rows;
  };

  //
  const maxSpeedSectionStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    marginBottom: "8px",
    cursor: "pointer",
    gap: "1rem",
    backgroundColor: showBudget ? "#D7F5D9" : "transparent",
  };

  return (
    <LayoutCouple>
      <section className="budget-section">
        <div className="budget-add-section">
          <p className="add-section-header">
            Manage your wedding budget in one place.
          </p>
          <div onClick={handleAddOpen}>
            <CoupleAddButton>Add</CoupleAddButton>
          </div>
        </div>
        {/* Add- Marketing Category */}
        <Modal
          open={addOpen}
          onClose={handleAddClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            sx={BoxStyle2}
            noValidate
            autoComplete="off"
            // className="marketing-category-list"
          >
            {/* <div
              className="flex justify-end"
              onClick={(e) => {
                e.stopPropagation();
                handleAddClose();
              }}
            >
              <AiOutlineClose size={26} />
            </div> */}
            {/* heading */}
            <div className="flex justify-start items-center p-[0.5rem]">
              <h3>
                Tick the services you are looking for and add you budgets.
              </h3>
            </div>
            <br />
            {/* checkboxes */}
            <Stack spacing={3} alignContent="center" className="">
              <FormGroup
                sx={{
                  width: {
                    xs: "100%",
                    md: "31rem",
                  },
                }}
              >
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
                            checked={selectedOptions.includes(option.label)}
                            onChange={() => handleMarketingChange(option)}
                            // checked={marketingSelect[option.value]}
                            // onChange={(e) => handleMarketingChange(e, index)}
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
        <br />
        {/* Budget Summary */}
        <div className="budget-main-section">
          <div className="budget-summary-section">
            <div className="budget-summary-1">
              {/* max spend */}
              <div className="max-speed-section" style={maxSpeedSectionStyle}>
                <div className="maxSpeed-1"></div>
                <div className="maxspend-2">My Budget</div>
                {!edit ? (
                  <div>
                    {showBudget ? (
                      <div className="flex gap-[6rem]">
                        <Typography sx={{ fontFamily: "Source-sans-pro" }}>
                          ${formatCurrency(showBudget)}
                        </Typography>
                        <button
                          className="font-[800] underline"
                          onClick={handleEditBudget}
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      <button className="maxspend-3" onClick={handleEditBudget}>
                        Click to add
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
                        className="pl-8 w-[5rem]"
                      />
                    </div>
                    <div className="flex gap-[1rem]">
                      <button
                        className="font-[800] underline"
                        onClick={handleSaveBudget}
                      >
                        Save
                      </button>
                      <button
                        className="font-[800] underline"
                        onClick={() => setEdit(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="max-speed-section">
                <div className="total-cost-1"></div>
                <div className="totalcost-2">Total Cost</div>
                <button className="totalcost-amount">
                  ${formatCurrency(3000)}
                </button>
              </div>
              <div className="max-speed-section">
                <div className="total-unpaid-1"></div>
                <div className="unpaid-2">Total Unpaid</div>
                <button className="totalunpaid-amount">
                  ${formatCurrency(1500)}
                </button>
              </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <br />
            <div className="budget-table-section">
              {/* Table */}
              <table>
                <thead>
                  <tr>
                    <th>Item name</th>
                    <th>Unpaid</th>
                    <th>Paid</th>
                    <th>Total Cost</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Budget Detail Box */}
        {budgetOpen && (
          <>
            <div className="budgetdetail-overlay">
              <div className="flex justify-end" onClick={closeBudget}>
                <AiOutlineClose size={26} className=" fixed " />
              </div>
              <div className="budgetdetail-content relative mt-[2rem] h-[100%]">
                <div>
                  <div className="text-[12px]">{selectedMarketingCategory}</div>
                  <h1>{selectedSubitem}</h1>
                </div>

                <div className="flex justify-between items-center">
                  <h2>Cost:</h2>
                  <CoupleCommonInput
                    type="number"
                    value={
                      subItemDetails[
                        `${selectedMarketingCategory}-${selectedSubitem}`
                      ]?.totalCost || ""
                    }
                    onChange={(e) =>
                      updateTotalCost(
                        e.target.value,
                        selectedMarketingCategory,
                        selectedSubitem
                      )
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h2>Paid:</h2>
                  <CoupleCommonInput
                    type="number"
                    value={
                      subItemDetails[
                        `${selectedMarketingCategory}-${selectedSubitem}`
                      ]?.paid || ""
                    }
                    onChange={(e) =>
                      updatePaid(
                        e.target.value,
                        selectedMarketingCategory,
                        selectedSubitem
                      )
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ fontWeight: "600" }}
                        >
                          $
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h4> Unpaid:</h4>
                  <div>
                    ${" "}
                    {formatCurrency(
                      subItemDetails[
                        `${selectedMarketingCategory}-${selectedSubitem}`
                      ]?.totalCost -
                        subItemDetails[
                          `${selectedMarketingCategory}-${selectedSubitem}`
                        ]?.paid
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <h2> Notes</h2>
                    <span>(optional)</span>
                  </div>

                  <textarea className="budgetdetail-notes-textarea" />
                </div>
                {/* Save and Cancel */}
                <Divider sx={{ marginTop: "8rem" }} />
                <div className="budgetdetail-save-button">
                  <CancelCoupleButton>Cancel</CancelCoupleButton>
                  <CoupleAddButton>Save</CoupleAddButton>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </LayoutCouple>
  );
};

export default CoupleCatBudget;
