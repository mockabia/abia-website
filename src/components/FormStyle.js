// FormStyles.js
import Select, { components } from "react-select";
import { alpha, styled } from "@mui/material/styles";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";

export const RatingComponent = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: "#eaad36",
        },
        iconEmpty: {
          color: "#ccc",
        },
      },
    },
  },
});

export const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#6cc2bc",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#6cc2bc",
  },
});

export const StyledHeartIcon = styled(FavoriteBorderIcon)(({ theme }) => ({
  fontSize: "25px",
  border: "none",
  color: "white",
  "&:hover": {
    color: "#515151",
  },
}));

export const BoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "550px",
  height: "auto",
  bgcolor: "#fff",
  border: "1px solid #949494",

  p: 4,
};
export const ForgetBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "29rem",
  height: "auto",
  bgcolor: "#fff",
  border: "1px solid #949494",
  borderRadius: "1rem",
  padding: "3rem",
  "@media (max-width: 1024px)": {
    width: "20rem",
  },
};

export const RedditTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "50px",
    boxShadow: "none",
    fontSize: "14px",
    width: "auto",
    // maxWidth: " 14rem",
  },

  "& .MuiFormLabel-root": {
    fontSize: "14px",
    fontFamily: "Raleway",
  },
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    fontSize: "14px",
    boxShadow: "none",
    backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#1A2027",
    border: "1px solid",
    borderColor: "#949494",
    transition: theme.transitions.create(["border-color", "background-color"]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: "none",
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-filled": {
    color: theme.palette.mode === "light" ? "#515151" : "#2D3843",
    "&.Mui-focused": {
      color: "black",
    },
  },
}));

export const SelectTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "50px",
    boxShadow: "none",
    fontSize: "14px",
    width: "auto",
    // width: "14rem",
    // maxWidth: "100%",
    backgroundColor: "transparent",
  },
  [`@media (min-width: 550px)`]: {
    "& .MuiInputBase-root": {
      width: "14rem",
      maxWidth: "100%",
    },
  },

  "& .MuiFormLabel-root": {
    fontSize: "14px",
    fontFamily: "Raleway",
  },
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    fontSize: "14px",
    boxShadow: "none",
    backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#1A2027",
    border: "1px solid",
    borderColor: "#949494",
    transition: theme.transitions.create(["border-color", "background-color"]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: "none",
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-filled": {
    color: theme.palette.mode === "light" ? "#515151" : "#2D3843",
    "&.Mui-focused": {
      color: "black",
    },
  },
}));

export const DateTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "50px",
    boxShadow: "none",
    fontSize: "14px",
    width: "auto",
  },
  [`@media (min-width: 550px)`]: {
    "& .MuiInputBase-root": {
      width: "14rem",
      maxWidth: "100%",
    },
  },

  "& .MuiFormLabel-root": {
    fontSize: "14px",
    fontFamily: "Raleway",
  },
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    fontSize: "14px",
    boxShadow: "none",
    backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#1A2027",
    border: "1px solid",
    borderColor: "#949494",
    transition: theme.transitions.create(["border-color", "background-color"]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: "none",
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-filled": {
    color: theme.palette.mode === "light" ? "#515151" : "#2D3843",
    "&.Mui-focused": {
      color: "black",
    },
  },
}));

export const HeartIconTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "50px",
    boxShadow: "none",
    fontSize: "14px",
    // maxWidth: "15rem",
    width: "auto",
  },
  "& .MuiFormLabel-root": {
    fontSize: "14px",
    fontFamily: "Raleway",
  },
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    fontSize: "14px",
    boxShadow: "none",
    backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#1A2027",
    border: "1px solid",
    borderColor: "#949494",
    transition: theme.transitions.create(["border-color", "background-color"]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: "none",
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-filled": {
    color: theme.palette.mode === "light" ? "#515151" : "#2D3843",
    "&.Mui-focused": {
      color: "black",
    },
  },
}));

export const MultiTLinedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: "auto",
    border: "1px solid #949494",
    background: "white",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiFormLabel-root": {
    fontSize: "14px",
    fontFamily: "Raleway",
  },
}));

export const ColorSubmitButton = styled(Button)(({ theme }) => ({
  height: "50px",
  color: "white",
  backgroundColor: "#6cc2bc",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "black",
  },
}));

export const ColorSortButton = styled(Button)(({ theme }) => ({
  fontFamily: "Raleway",
  textTransform: "initial",
  color: "#515151", // Set text color to black
  backgroundColor: "white", // Set background color to white
  borderRadius: "50px",
  border: "1px solid #515151",
  maxWidth: "250px",
  width: "160px",
  height: "45px",
  fontSize: "12px",
  fontWeight: "600",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#000",
    boxShadow: "none",
    color: "white",
  },
  "&.Mui-selected": {
    backgroundColor: "#000",
    boxShadow: "none",
    color: "white",
  },
}));

export const CustomDropdownSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    borderRadius: "10px",
    background: "#fafafa",
    padding: "5px",
    width: "100%",
    // maxHeight: "50px",
    maxWidth: "100%",
    "@media (min-width: 1190px)": {
      width: "96%",
      maxWidth: "96%",
    },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "10px",
    borderRadius: "20px",
    padding: "15px",
    border: "1px solid #c3bebe",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#e7f5f4"
      : state.isFocused
      ? "#e7f5f4"
      : "white",
    color: state.isSelected ? "black" : "inherit",
    padding: "12px",
  }),
  indicatorSeparator: (defaultStyles) => {
    return {
      ...defaultStyles,
      display: "none",
    };
  },
  input: (provided) => ({
    ...provided,
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    inputMode: "none",
    tabIndex: "0",
  }),
};

/**============================================================ */
// COUPLES SIGNUP FORM  AND LOGIN FORM

export const StepperStyle = styled(Stepper)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: "#757575",
    // fill: "white",
  },
  "& .MuiSvgIcon-root.Mui-active": {
    color: "#6cc2bc",
  },
  "& .MuiSvgIcon-root.Mui-completed": {
    color: "#6cc2bc",
  },
  "& .MuiStepLabel-label": {
    fontFamily: "Raleway",
  },
  [`@media (max-width: 550px)`]: {
    "& .MuiStepLabel-root": {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  },
}));

export const ButtonStyle = styled(Button)(({ theme, isActive }) => ({
  display: "flex",
  justifyContent: "start",
  border: isActive ? "1px solid black" : "1px solid #B7B7B7",
  borderRadius: "1rem",
  width: "100%",
  height: "3rem",
  marginBottom: "1.5rem",
  backgroundColor: isActive ? "#f3f3f3" : "transparent",
  "&:hover": {
    backgroundColor: isActive ? "#f3f3f3" : "#f3f3f3", // Keep the same color for hover
    border: "1px solid black",
  },
  "&:active": {
    backgroundColor: "#f3f3f3",
    border: "1px solid black",
  },
  "&:focus": {
    backgroundColor: "#f3f3f3",
    border: "1px solid black",
  },

  "&.MuiSvgIcon": {
    fill: "black",
  },
}));

export const NextButtonStyle = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  borderRadius: "2rem",
  width: "100%",
  height: "3.5rem",
  backgroundColor: "#b7b7b7",
  border: "none",
  "&:hover": {
    backgroundColor: "#b7b7b7",
    border: "none",
    // border: "1px solid black",
  },
  "&:active": {
    backgroundColor: "#red",
    border: "1px solid black",
  },
  "&:focus": {
    backgroundColor: "black",
    border: "1px solid black",
  },
  "&. MuiSvgIcon": {
    fill: "black",
  },
}));

export const LeftAlignedTypography = styled(Typography)({
  fontSize: "14px",
  textAlign: "left",
  paddingLeft: "1rem",
  fontFamily: "Raleway",
  textTransform: "capitalize",
  color: "#0e0e0e",
  fontWeight: "600",
});

export const CheckBoxStyle = styled(Checkbox)({
  "& .MuiSvgIcon-root": {
    fontSize: "28px",
  },
  "& .MuiFormControlLabel-label": {
    fontFamily: "Raleway",
  },
});

export const CSTextfield = styled(TextField)({
  "& .MuiFormLabel-root ": {
    fontFamily: "Raleway",
  },
});

export const CouplesLoginBox = {
  width: "100%",
  maxWidth: "27rem",
  height: "auto",
  bgcolor: "#fff",
  border: "1px solid #949494",
  borderRadius: "1rem",
  p: 4,
  "@media (max-width: 600px)": {
    width: "100%",
  },
};

export const CLLoginStyle = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  borderRadius: "2rem",
  width: "100%",
  height: "3.5rem",
  backgroundColor: "#000",
  border: "none",
  "&:hover": {
    backgroundColor: "#000",
    border: "none",
  },
  "&:active": {
    backgroundColor: "#red",
    border: "1px solid black",
  },
  "&:focus": {
    backgroundColor: "#6cc2bc",
    border: "none",
  },
  "&. MuiSvgIcon": {
    fill: "black",
  },
}));

// Vendor Login
export const VLTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root ": {
    width: " 100% ",
    maxWidth: "17rem",
    height: "45px",
    borderRadius: "10px",
    border: "1px solid #c3bebe",
    background: "#fafafa",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Raleway",
  },

  "& .MuiFormHelperText-root": {
    color: "red",
    marginLeft: "0rem ",
  },
}));

export const VendorLoginButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  fontFamily: "Raleway",
  textTransform: "initial",
  color: "#fff", // Set text color to black
  backgroundColor: "#6cc2bc", // Set background color to white
  borderRadius: "50px",
  border: "1px solid #515151",
  maxWidth: "250px",
  width: "250px",
  height: "40px",
  fontSize: "12px",
  fontWeight: "600",
  boxShadow: "none",
  marginBottom: "1rem",
  "&:hover": {
    backgroundColor: "#000",
    boxShadow: "none",
    color: "white",
  },
  // "&.Mui-selected": {
  //   backgroundColor: "#000",
  //   boxShadow: "none",
  //   color: "white",
  // },
  "&.Mui-disabled": {
    backgroundColor: "grey", // Background color when disabled
    color: "white",
  },
}));

export const NavMenuStyle = styled(Button)(({ theme }) => ({
  fontFamily: "Playfair Display",
  color: "#515151", // Set text color to black
  height: "45px",
  fontSize: "16px",
  fontWeight: "600",
  letterSpacing: "1px",
}));

export const CSmenuItemStyle = {
  fontWeight: "500",
  fontFamily: "Raleway",

  // Add other styles as needed
};
/********sSELECT */
export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #c3bebe",
    boxShadow: "none",

    borderRadius: "10px",
    background: "#fafafa",
    padding: "5px",
    // width: "100%",
    height: "50px",
    // maxHeight: "50px",
    maxWidth: "100%",
    "&:hover": {
      border: "1px solid #c3bebe",
    },
    "@media (min-width: 1023px)": {
      width: "100%",
      // maxWidth: "100%",
    },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "10px",
    borderRadius: "20px",
    padding: "15px",
    border: "1px solid #c3bebe",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#e7f5f4"
      : state.isFocused
      ? "#e7f5f4"
      : "white",
    color: state.isSelected ? "black" : "inherit",
    padding: "12px",
  }),
  indicatorSeparator: (defaultStyles) => {
    return {
      ...defaultStyles,
      display: "none",
    };
  },
  input: (provided) => ({
    ...provided,
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    inputMode: "none",
    tabIndex: "0",
  }),
  clearIndicator: () => ({
    display: "none",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    display: "none",
  }),
};

export const MoreSelectedBadge = ({ items }) => {
  const style = {
    marginLeft: "1rem",
    background: "#d7d7d7",
    borderRadius: "4px",
    fontFamily: "Open Sans",
    fontSize: "11px",
    padding: "3px",
    order: 99,
  };

  const title = items.join(", ");
  const length = items.length;
  const label = `+ ${length} item${length !== 1 ? "s" : ""}`;

  return (
    <div style={style} title={title}>
      {label}
    </div>
  );
};

export const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 2;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};
