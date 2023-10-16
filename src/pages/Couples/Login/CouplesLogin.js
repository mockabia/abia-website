import React from "react";
import "./CouplesLogin.css";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { ForgetBox } from "../../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import { Controller, useForm } from "react-hook-form";
import LockIcon from "@mui/icons-material/Lock";

const CouplesLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="cl-container">
        <Box component="form" sx={ForgetBox} noValidate autoComplete="off">
          <Box>
            <IconButton
              type="button"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            >
              <AiOutlineClose />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{
                required: "Username is required",
                minLength: {
                  value: 6,
                  message: "Username must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.username)}
                  helperText={errors.username && errors.username.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  error={Boolean(errors.password)}
                  helperText={errors.password && errors.password.message}
                  InputProps={{
                    startAdornment: (
                      <LockIcon color="disabled" position="end" />
                    ),
                  }}
                />
              )}
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default CouplesLogin;
