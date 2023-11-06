import React, { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LayoutVendor from "../Common/LayoutVendor";
import * as GeneralJS from "./Business";
import "../Style/BusinessLoginState.css";

const BusinessLoginState = () => {



  useEffect(() => {

  }, []);

  const handleStateSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <>
      <LayoutVendor>
        Settings
      </LayoutVendor>
    </>
  );
};
export default BusinessLoginState;


