import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./LoginUserState.css";

const LoginUserState = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userStatesData } = location.state;
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    console.log("userStatesData in LoginUserState:", userStatesData);
  }, [userStatesData]);

  const handleStateSubmit = (stateid) => {
    console.log("Selected data:", stateid);
    navigate("/home");
  };

  // console.log("Selected state:", selectedState);

  return (
    <main className="h-[100%] flex flex-col overflow-y-auto">
      <NavBar className="" />
      <section className="login-main-container">
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
                            key={state.stateid}
                            onClick={() => handleStateSubmit(state.stateid)}
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
      </section>
      <Footer />
    </main>
  );
};

export default LoginUserState;

{
  /* {userStatesData.map((state) => (
                        <li key={state.stateid}>{state.statetitle}</li>
                      ))}{" "} */
}
{
  /* {userStatesData.map((state) => (
                          <MenuItem key={state.stateid} value={state.stateid}>
                            {state.statetitle}
                          </MenuItem>
                        ))} */
}
{
  /* <Select
                        id="state"
                        name="userStates"
                        className="signup-input-style"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                      >
                        {userStatesData.map((state) => (
                          <MenuItem key={state.stateid} value={state.stateid}>
                            {state.statetitle}
                          </MenuItem>
                        ))}
                      </Select> */
}
{
  /* <Button
                        // type="submit"
                        variant="contained"
                        style={{
                          backgroundColor: isButtonDisabled
                            ? "#CCCCCC"
                            : "#6cc2bc",
                          color: isButtonDisabled ? "#777777" : "#ffffff",
                          height: "40px",
                          textTransform: "capitalize",
                          width: "100%",
                          marginTop: "1rem",
                        }}
                        onClick={handleStateSubmit}
                        disabled={isButtonDisabled}
                      >
                        Proceed
                      </Button> */
}
