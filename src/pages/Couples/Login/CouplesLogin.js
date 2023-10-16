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
            <div>
              <TextField />
              <TextField />
            </div>

            {/* <Button type="submit" variant="contained" color="primary">
              Submit
            </Button> */}
          </form>
        </Box>
      </div>
    </div>
  );
};

export default CouplesLogin;
