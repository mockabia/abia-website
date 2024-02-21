import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Style/CouplesLogin.css";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import { CoupleCommonInput, CouplesLoginBox, StyledIconButton } from "../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import CoupleForgotPwd from "./CoupleForgotPwd";
import * as CoupleJS from "../Couple/Couple";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
};

const CouplesLogin = (props) => {
  let navigate                                      = useNavigate();
  const [showPassword, setShowPassword]             = useState(true);
  const [passwordType, setPasswordType]             = useState("text");
  const [formValues, setFormValues]                 = useState({});
  const [errors, setErrors]                         = React.useState({});
  const [showVisibilityIcon, setShowVisibilityIcon] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    if (formValues.cpassword.trim() !== "" && showPassword) {
      setShowVisibilityIcon(!showPassword);
    } else {
      setShowVisibilityIcon(false);
    }
  };

  useEffect(() => {
    if(showPassword){
      setPasswordType("text")
    }else{
      setPasswordType("password")
    }
  }, [showPassword]);

  const handleKeyPress = (e) => {
    setShowPassword(false);
    setPasswordType("password")
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
    setShowVisibilityIcon(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CoupleJS.coupleLogin(formValues, setErrors, navigate)
  };
  const handleModalClose = () => props.setModalOpen(false);

  const hasErrors = Object.values(errors).some(
    (error) => typeof error !== "undefined"
  );

  return (
    <Modal
      open={props.modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="cl-container">
          <Box sx={CouplesLoginBox}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <StyledIconButton type="button" onClick={handleModalClose}>
                <AiOutlineClose size={20} />
              </StyledIconButton>
            </Box>
            <form>
              <h1 className="cs-login-header">Bride/Groom Login</h1>
              <div className="cl-field">
                <label className="cl-label">Email</label>
                <CoupleCommonInput
                  variant="outlined"
                  name="cemail"
                  type="text"
                  onChange={handleInputChange}
                />
                {errors.email && <div className="error-text">{errors.email}</div>}
              </div>
              <br />
              {/* PASSWORD */}
              <div className="cl-field">
                <label className="cl-label">Password</label>
                <CoupleCommonInput
                  variant="outlined"
                  name="cpassword"
                  type={passwordType}
                  onKeyUp={handleKeyPress}
                  onKeyDown={handleKeyPress}
                  // label="Password*"
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: showVisibilityIcon && (
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon sx={{ fill: "#c3bebe" }} />
                        ) : (
                          <VisibilityOutlinedIcon sx={{ fill: "#c3bebe" }} />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                {errors.password && (
                  <div className="error-text">{errors.password}</div>
                )}
              </div>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: "2rem",
                }}
              ></Box>

              {hasErrors && (
                <div className="flex font-bold text-red-600 text-[12px]">
                  {errors}
                </div>
              )}

              <button
                onClick={handleSubmit}
                // type="submit"
                className="clLoginButton"
              >
                Login
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
              <div className="clogin-margin-auto">
                <h6>
                  Don't have an account?{" "}
                  <Link to={window.CSIGNUP} className="font-[900] underline">
                    {" "}
                    <span className="cl-gap">q</span>Sign Up Now
                  </Link>
                </h6>
                <h6 style={{ marginTop: "10px" }}>
                  Are you a vendor?{" "}
                  <Link to={window.VLOGIN} className="font-[900] underline">
                    {" "}
                    <span className="cl-gap">q</span> Sign In Here
                  </Link>
                </h6>
              </div>
            </form>
          </Box>
          {" "}
        </div>
      </Box>
    </Modal>

  );
};

export default CouplesLogin;
