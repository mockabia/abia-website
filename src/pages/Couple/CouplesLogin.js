import React, { useEffect } from "react";
import "../Style/CouplesLogin.css";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import {
  CLLoginStyle,
  CouplesLoginBox,
  ForgetBox,
  NextButtonStyle,
} from "../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import CoupleForgotPwd from "./CoupleForgotPwd";
import { Link } from "react-router-dom";

const CouplesLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleClosePage = () => {
    window.history.back();
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.email) {
      // Validate Email
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid Email";
    }
    // Validate Password
    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      errors.password = "Minimum 6 characters";
    }

    return errors;
  };

  const handleInputChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setFormValues({ ...formValues });
      console.log("Current form values:", {
        formValues,
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="cl-container">
      <Box sx={CouplesLoginBox}>
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
          <h1 className="cs-signup-header flex justify-center items-center">
            Log In
          </h1>
          <label className="cl-label">Email</label>
          <div className="cl-field">
            <TextField
              name="email"
              type="email"
              className="cs-textfield-2"
              id="demo-helper-text-aligned"
              // label="Email*"
              sx={{
                width: "100%",
                maxWidth: "22rem",
                borderRadius: "10px",
                "& .MuiInputBase-root": {
                  fontFamily: "Raleway",
                },
              }}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={errors.email}
              helperText={errors.email}
            />
            {/* EMAIL */}
            {/* <TextField
              type="text"
              name="email"
              
              sx={{
                width: "100%",
                maxWidth: "22rem",
                borderRadius: "10px",
                "& .MuiInputBase-root": {
                  fontFamily: "Raleway",
                },
              }}
            /> */}

            {/* <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="text"
                  placeholder="Email"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    maxWidth: "22rem",
                    "& .MuiInputBase-root": {
                      fontFamily: "Raleway",
                    },
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            /> */}
          </div>
          <br />
          {/* PASSWORD */}
          <label className="cl-label">Password</label>
          <div className="cl-field">
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              className="cs-textfield-2"
              id="demo-helper-text-aligned"
              // label="Password*"
              sx={{
                width: "100%",
                maxWidth: "22rem",
                borderRadius: "10px",
                "& .MuiInputBase-root": {
                  fontFamily: "Raleway",
                },
              }}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password}
              helperText={errors.password}
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

          <button
            onClick={handleSubmit}
            // type="submit"
            className="clLoginButton"
          >
            Log In
          </button>

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
              <Link
                to="/wedding/coupleregister"
                className="font-[900] underline"
              >
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
              <Link to="/business/login" className="font-[900] underline">
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
