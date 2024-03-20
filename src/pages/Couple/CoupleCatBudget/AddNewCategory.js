import React, { useEffect, useState } from "react";
import { BoxStyle2, CancelCoupleButton, CheckBoxStyle, CheckBoxTypo, CoupleAddButton } from "../../../components/FormStyle";
import { Box, FormControlLabel, FormGroup, Grid, Modal, Stack, } from "@mui/material";

import * as CoupleJS from "../Couple";

function AddNewCategory(props) {
    const services                        = props.data.moreservices;
    const setData                         = props.setData;
    const setBudget                       = props.setBudget;
    const setUnpaidList                   = props.setUnpaidList;
    const open                            = props.open;
    const setOpen                         = props.setOpen;
    const [inputs, setInputs]             = React.useState([]);
    const [inputsErrors, setInputsErrors] = React.useState({});

    const handleChange = (e) => {
      const name      = e.target.name;
      const value     = e.target.value;
      let targetValue = e.target.checked ? value : '';
      if (targetValue != '') {
        setInputs(oldArray => [...oldArray, name]);
      } else {
        setInputs(inputs.filter(item => item !== name));
      }
    }
    const handleSaveCategory = async () => {
      let requestData           = {};
      requestData.categories    = inputs;
      CoupleJS.addCategories(requestData,setInputsErrors,setData,setBudget,setUnpaidList,handleAddClose)
    };
    const handleAddClose = () => {
      setOpen(!open);
    };
    return (
      <Modal
        open={open}
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
            {/* <pre>{JSON.stringify(inputs, null, 2)}</pre> */}
              <Grid container spacing={1}>
              {services !== undefined && services.length > 0 && services.map((services, index) => {
                return (
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6} key={index} direction="column" >
                    <FormControlLabel
                      control={
                        <CheckBoxStyle
                          size="medium"
                          name={`${services.omcid}`}
                          value={services.omcid}
                          /* checked={(inputs != undefined && inputs.length > 0) ?
                            ((inputs.split(',').map(JSON.parse)).indexOf(services.omcid) != -1 ? 'checked' : '')
                            : ''} */
                          onChange={(e) => handleChange(e)}
                        />
                      }
                      label={<CheckBoxTypo>{services.title}</CheckBoxTypo>}
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
  
export default AddNewCategory;