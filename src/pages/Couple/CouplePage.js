import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LayoutVendor from "../../layouts/Layout/LayoutCouple";
import * as BusinessJS from "./Couple";


const CouplePage = (props) => {
  let navigate = useNavigate();
  const [dataSet, setDataSet] = useState(false);
  const [inputs, setInputs] = useState({});
  const [inputsErrors, setInputsErrors] = useState({});

  useEffect(() => {
    //BusinessJS.fetchbusiness(setInputs, setDataSet);
  }, []);

  return (
    <>
      <LayoutVendor>
        <div>
          <div className="main-content">
          <h1 className="main-header">Business Page Demo</h1>
          <div className="content" dangerouslySetInnerHTML={{__html: pageContent.detail}}></div>
          </div>
        </div>
      </LayoutVendor>
    </>
  );
};
export default CouplePage;
