import React from "react";
import "./CouplesLogin.css";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import {
  CLLoginStyle,
  CouplesLoginBox,
  ForgetBox,
  NextButtonStyle,
} from "../../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import CoupleForgotPwd from "../CoupleForgotPwd";
import { Link } from "react-router-dom";

const CouplesLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleClosePage = () => {
    window.history.back();
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="cl-container">
      <Box component="form" sx={CouplesLoginBox}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
          onClick={handleClosePage}
        >
          <IconButton
            type="button"
            className="cl-iconsbutton"
            style={{
              position: "absolute",
            }}
          >
            <AiOutlineClose />
          </IconButton>
        </Box>
        <form>
          {/* onSubmit={handleSubmit(onSubmit)} */}
          <h1 className="cs-signup-header flex justify-center items-center">
            Log In
          </h1>
          <label className="cl-label">Email</label>
          <div className="cl-field">
            {/* EMAIL */}
            <TextField
              name="email"
              type="text"
              placeholder="Email"
              variant="outlined"
              error={isFormSubmitted && !email}
              helperText={isFormSubmitted && !email && "Email is required"}
              sx={{
                width: "100%",
                maxWidth: "22rem",
                "& .MuiInputBase-root": {
                  fontFamily: "Raleway",
                },
              }}
            />
          </div>
          <br />
          {/* PASSWORD */}
          <label className="cl-label">Password</label>
          <div className="cl-field">
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              variant="outlined"
              error={isFormSubmitted && !password}
              helperText={isFormSubmitted && !password && "Password is required"}
              sx={{
                width: "100%",
                maxWidth: "22rem",
                "& .MuiInputBase-root": {
                  fontFamily: "Raleway",
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                ),
              }}
            />
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "2rem",
            }}
          ></Box>
          <CLLoginStyle>
            {" "}
            <span className="cs-next-button">Log in</span>
          </CLLoginStyle>
          {/* FORGOT PASSWORD */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "1rem",
            }}
          >
            <CoupleForgotPwd />
          </Box>

          {/* SIGN UP NOW AND SIGN IN VENDOR */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "1rem",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginBottom: "1rem",
                fontFamily: "Raleway",
                fontSize: "14px",
              }}
            >
              Don't have an account?{" "}
              <Link to="/wedding-signup" className="font-[900] underline">
                {" "}
                <span className="cl-gap">q</span>Sign Up Now
              </Link>
            </Typography>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                fontFamily: "Raleway",
                fontSize: "14px",
              }}
            >
              Are you a Abia vendor?{" "}
              <Link to="/login" className="font-[900] underline">
                {" "}
                <span className="cl-gap">q</span> Sign In Here
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default CouplesLogin;
