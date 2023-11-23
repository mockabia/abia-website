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
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const formValues = {
      email: watch("email"),
      password: watch("password"),
    };
    console.log("Submitted data:", formValues);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="cs-signup-header flex justify-center items-center">
            Log In
          </h1>
          <label className="cl-label">Email</label>
          <div className="cl-field">
            {/* EMAIL */}
            <TextField
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
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid.",
                },
              })}
            />
            {errors.email && (
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                {errors.email.message}
              </p>
            )}
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
              type="text"
              name="password"
              sx={{
                width: "100%",
                maxWidth: "22rem",
                borderRadius: "10px",
                "& .MuiInputBase-root": {
                  fontFamily: "Raleway",
                },
              }}
              {...register("password", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 6,
                },
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                Password is required.
              </p>
            )}
            {errors.password?.type === "checkLength" && (
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                Password should be at-least 6 characters.
              </p>
            )}
            {/* <Controller
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
            /> */}
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "2rem",
            }}
          ></Box>

          <button type="submit" className="clLoginButton">
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
