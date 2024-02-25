import React, { useEffect, useState } from "react";
import "../Style/CoupleCatBudget.css";
import { BoxStyle2, BudgetInput, CancelCoupleButton, CheckBoxStyle, CheckBoxTypo, CoupleAddButton } from "../../components/FormStyle";
import { Box, Divider, FormControlLabel, FormGroup, Grid, InputAdornment, Modal, Stack, Typography, } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useNavigate,Link } from "react-router-dom";
import * as CoupleJS from "./Couple";

const CoupleCatBudget = (props) => {

  let navigate                        = useNavigate();
  const [data, setData]               = useState([]);
  const [budget, setBudget]           = useState([]);
  const [unpaidList, setUnpaidList]   = useState([]);
  const [viewService, setViewService] = useState([]);


  const [addOpen, setAddOpen]                   = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [showBudget, setShowBudget]             = useState("");
  const [edit, setEdit]                         = useState(false);
  const [budgetOpen, setBudgetOpen]             = useState(false);
  const [wordCount, setWordCount]               = useState("0");
  const [expandedCategory, setExpandedCategory] = useState(false);

  useEffect(() => {
    CoupleJS.coupleCategories(setBudget, setData, setUnpaidList);
  }, []);

  const toggleAccordion = (category) => {
    setExpandedCategory((prevExpandedCategory) =>
      prevExpandedCategory === category ? false : category
    );
  };

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
  const closeBudget = () => {
    setBudgetOpen(false);
  };

  const handleAddOpen = () => setAddOpen(true);

  //  Block 1
  const handleSaveBudget = () => {
    CoupleJS.updateBudget(budget,setShowBudget,setEdit);
  };
  const handleEditBudget = () => {
    setEdit(true);
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

/*   useEffect(() => {
    if (savedCategories.length > 0) {
      const firstItemLabel = savedCategories[0].label;
      setExpandedCategory(firstItemLabel);
    }
  }, [savedCategories]); */

  function RenderCategories() {
    return (
      <>
        {/* <pre>{JSON.stringify(data.services, null, 2)}</pre> */}
        <tbody>
          {data.services && data.services.map((selectedOption, index) => {

            const isCategoryExpanded =
              expandedCategory === selectedOption.itemTitle;
            const rows = [];

            // Display category row
            rows.push(
              <tr
                key={`category-${index}`}
                onClick={() => toggleAccordion(selectedOption.itemTitle)}
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
                    {budgetOpen && (<ViewCategory />)}
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
  function ViewCategory(categoryProps) {

    const [modalInputs, setModalInputs]             = React.useState(viewService);
    const [modalInputsErrors, setModalInputsErrors] = React.useState({});

    const modalHandleChange = (name, value) => {
      setModalInputs(values => ({ ...values, [name]: value }))
    };
    const unpaidValue = viewService.cost - viewService.paid;
    
    const handleSaveBudgetDetails = () => {
      CoupleJS.updateBudgetCategory(modalInputs,setModalInputsErrors,setData,setBudget,setUnpaidList,closeBudget)
      //closeBudget();
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
            <Link to="/wedding-directory0" className="flex items-center cursor-pointer">
              <h5 className="font-bold">Explore Category</h5>
              <HiOutlineArrowSmRight size={26} />
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <h3>Cost:</h3>
            <BudgetInput
              type="number"
              value={modalInputs.cost || ""}
              onChange={(e) =>
                modalHandleChange('cost',e.target.value)
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
              value={modalInputs.paid || ""}
              onChange={(e) => modalHandleChange('paid',e.target.value)}
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
              {formatCurrency(unpaidValue)}
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

                /* setSubitemContent(inputValue);
                setSubitemContents((prevSubitemContents) => ({
                  ...prevSubitemContents,
                  [key]: inputValue,
                })); */
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
    );
  }
  function AddBudgetModal(modalProps) {
    const open                            = modalProps.open || false;
    const setOpen                         = modalProps.setOpen;
    const [inputs, setInputs]             = React.useState([]);
    const [inputsErrors, setInputsErrors] = React.useState({});

    const handleChange = (e) => {
      var name  = e.target.name;
      var value = e.target.value;
      if (value == 1) {
        setInputs(oldArray => [...oldArray, name]);
      } else {
        setInputs(inputs.filter(item => item !== name));
      }
    };

    const handleSaveCategory = async () => {
      //setSavedCategories([...selectedCategory]);
      //handleAddClose();
      CoupleJS.addCategories(inputs,setInputsErrors,setData,setBudget,setUnpaidList,handleAddClose)
    };
    const handleAddClose = () => {
      setAddOpen(!addOpen);
    };
    return (
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
              {data.services !== undefined && data.services.length > 0 && data.services.map((services, index) => {
                return (
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6} key={index} direction="column" >
                    <FormControlLabel
                      control={
                        <CheckBoxStyle
                          size="medium"
                          name={`${services.id}`}
                          //value={services.value}
                          /* checked={selectedCategory.some(
                            (selectedOption) =>
                              selectedOption.id === option.id
                          )} */
                          onChange={(e) => handleChange(e)}
                        />
                      }
                      label={<CheckBoxTypo>{services.itemTitle}</CheckBoxTypo>}
                    />
                  </Grid>
                )
              })}
              </Grid>
            </FormGroup>
            <div className="cbudget-button-group">
              <CancelCoupleButton onClick={handleAddClose}>
                Cancel
              </CancelCoupleButton>
              <CoupleAddButton type="button" onClick={handleSaveCategory}>
                Save
              </CoupleAddButton>
            </div>
          </Stack>
        </Box>
      </Modal>
    );
  }

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
      <AddBudgetModal open={addOpen} setOpen={setAddOpen} />
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
                      <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="pl-8 w-[5rem] font-change text-[14px]" />
                    </div>
                    <div className="flex gap-[1rem]">
                      <button className="font-[800] underline" onClick={handleSaveBudget} >
                        <h5>Save</h5>
                      </button>
                      <button className="font-[800] underline" onClick={() => setEdit(false)} >
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
              <RenderCategories />
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleCatBudget;
