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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("No password provided.")
    .min(6, "Password ishould be 6 chars minimum."),
});

const CouplesLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [inputsErrors, setInputsErrors] = useState({});

  const {
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    mode: "onChange", //isValid works on mode=onChange
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data, e) => {
    e.preventDefault();
    // const formValues = {
    //   email: watch("email"),
    //   password: watch("password"),
    // };
    // console.log("Submitted data:", data);
    console.log("Submitted data:", watch());
  };
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleClosePage = () => {
    window.history.back();
  };

  return (
    <div className="cl-container">
      <Box component="form" sx={CouplesLoginBox} noValidate autoComplete="off">
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
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <h1 className="cs-signup-header flex justify-center items-center">
            Log In
          </h1>
          <label className="cl-label">Email</label>
          <div className="cl-field">
            {/* EMAIL */}
            <Controller
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
            />
          </div>
          <br />
          {/* PASSWORD */}
          <label className="cl-label">Password</label>
          <div className="cl-field">
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  variant="outlined"
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
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
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

          <button className="clLoginButton" disabled={!isValid || isSubmitted}>
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
              <Link to="/wedding/signup" className="font-[900] underline">
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
