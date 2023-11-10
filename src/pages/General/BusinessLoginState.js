import React, { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LayoutGeneral from "../Common/LayoutGeneral";
import * as GeneralJS from "./General";
import "../Style/BusinessLoginState.css";

const BusinessLoginState = () => {
  const location                = useLocation();
  const navigate                = useNavigate();
  const { userStatesData }      = location.state;
  const email                   = location.state.email;
  const password                = location.state.password;
  const token                   = location.state.token;


  useEffect(() => {

  }, []);

  const handleStateSubmit = (e) => {
    e.preventDefault();
    let vid                 = e.target.getAttribute('vid');
    let state               = e.target.getAttribute('state');
    var inputs              = {};
    inputs["email"]         = email;
    inputs["password"]         = password;
    inputs["currenttocken"] = token;
    inputs["currentvid"]    = vid;
    inputs["currentstate"]  = state;
    GeneralJS.vendorLoginStateForm(e, inputs, navigate);
  };

  return (
    <>
      <LayoutGeneral>
        <div className="login-vendorlogin-content relative">
          <div className="login-vendorlogin-box">
            <div className="flex flex-col justify-center items-center p-[20px] relative">
              <h1 className="login-loginbox-header">Welcome</h1>
              <Stack spacing={2}>
                <div className="flex flex-col justify-center items-center ">
                  <Box component="form" noValidate autoComplete="off">
                    <p className="flex justify-center">
                      Select your respective State.
                    </p>
                    <div className="mt-[1rem]">
                      <ul>
                        {userStatesData.map((state) => (
                          <li
                            state={state.stateurl}
                            vid={state.vid}
                            onClick={handleStateSubmit}
                            className="selectedStyled"
                          >
                            {state.statetitle}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Box>
                </div>
              </Stack>
            </div>
          </div>
        </div>
      </LayoutGeneral>
    </>
  );
};
export default BusinessLoginState;


