// FormStyles.js
import Select, { components } from "react-select";
import { alpha, styled } from "@mui/material/styles";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Accordion, IconButton, InputBase, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { RxTriangleUp } from "react-icons/rx";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

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
  backgroundColor: "#5a9d98",
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
    backgroundColor: "#5a9d98",
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
export const BoxStyle2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "600px",
  height: "auto",
  bgcolor: "#fff",
  border: "1px solid #949494",
  borderRadius: "1.5rem",
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
  outline: "none",
  "@media (max-width: 1025px)": {
    width: "20rem",
    padding: "2rem",
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
    fontFamily: "Manrope, sans-serif",
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
    fontFamily: "Manrope, sans-serif",
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
    fontFamily: "Manrope, sans-serif",
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
    fontFamily: "Manrope, sans-serif",
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
    fontFamily: "Manrope, sans-serif",
  },
}));

export const ColorSubmitButton = styled(Button)(({ theme }) => ({
  height: "50px",
  color: "white",
  backgroundColor: "#5a9d98",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "black",
  },
}));

export const ColorSortButton = styled(Button)(({ theme }) => ({
  fontFamily: "Manrope, sans-serif",
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
    color: "#5a9d98",
  },
  "& .MuiSvgIcon-root.Mui-completed": {
    color: "#5a9d98",
  },
  "& .MuiStepLabel-label": {
    fontFamily: "Manrope, sans-serif",
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
  alignItems: "center",
  border: isActive ? "1px solid black" : "1px solid #B7B7B7",
  borderRadius: "1rem",
  width: "100%",
  height: "2.5rem",
  padding: "28px",
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
  backgroundColor: "#5a9d98",
  border: "none",
  "&:hover": {
    backgroundColor: "#5a9d98",
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
  fontFamily: "Manrope, sans-serif",
  textTransform: "initial",
  fontWeight: "600",
});

export const CheckBoxTypo = styled(Typography)({
  fontSize: "16px",
  fontFamily: "Manrope, sans-serif",
  color: "#0e0e0e",
  fontWeight: "600",
  whiteSpace: "normal",
});

export const CheckBoxStyle = styled(Checkbox)({
  "& .MuiSvgIcon-root": {
    fontSize: "32px",
    color: "#d7d7d7",
  },
  "&.Mui-checked": {
    color: "#5a9d98",
  },
  "& .MuiFormControlLabel-label": {
    fontFamily: "Manrope, sans-serif",
  },
});

export const CSTextfield = styled(TextField)({
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    height: "45px",
    width: "100%",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    width: "100%",
    maxWidth: "100%",
    fontSize: "14px",
    "& > fieldset": { borderColor: "#c3bebe" },
    "&:hover fieldset": {
      borderColor: "#c3bebe",
    },
  },
  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },
  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  "& .MuiFormLabel-root ": {
    fontFamily: "Manrope, sans-serif",
  },
});

export const CouplesLoginBox = {
  width: "100%",
  maxWidth: "24rem",
  height: "auto",
  bgcolor: "#fff",
  border: "1px solid #949494",
  borderRadius: "1rem",
  p: 4,
  "@media (max-width: 600px)": {
    width: "100%",
    maxWidth: "20rem",
  },
};

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 18%;
  margin-top: -2rem;

  @media (min-width: 1023px) {
    right: 11%;
  }
`;

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
    backgroundColor: "#5a9d98",
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
    fontFamily: "Manrope, sans-serif",
    outline: "none",
  },

  "& .MuiFormHelperText-root": {
    color: "red",
    marginLeft: "0rem ",
  },
}));

export const VendorLoginButton = styled(Button)(({ theme }) => ({
  outline: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  fontFamily: "Manrope, sans-serif",
  textTransform: "initial",
  color: "#000", // Set text color to black
  backgroundColor: "#FFF", // Set background color to white
  border: "2px solid #000",
  borderRadius: "50px",
  maxWidth: "250px",
  width: "250px",
  height: "40px",
  fontSize: "12px",
  fontWeight: "600",
  boxShadow: "none",
  marginBottom: "1rem",
  "&:hover": {
    // backgroundColor: "var(--abia-color)",
    backgroundColor: "white",
    boxShadow: "none",
  },

  "&.Mui-disabled": {
    backgroundColor: "grey", // Background color when disabled
    color: "white",
  },
  "@media (min-width: 1024px)": {
    maxWidth: "350px", // Change maxWidth to 250px for screens above 1024px
    width: "350px",
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
  fontFamily: "Manrope, sans-serif",
  fontSize: "14px",

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
export const customSelectStyles2 = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #c3bebe",
    boxShadow: "none",
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    color: "#575757",
    fontWeight: "400",
    borderRadius: "10px",
    background: "#fafafa",
    padding: "5px",
    height: "50px",
    // maxHeight: "50px",
    maxWidth: "100%",
    "&:hover": {
      border: "1px solid #c3bebe",
    },
    "@media (min-width: 1023px)": {
      width: "96%",
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
  const maxToShow = 1;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};

/***************ACCORDION******************* */
// used in Business-Myprofile
export const StyledAccordion = styled(Accordion)(({ theme, expanded }) => ({
  padding: "1rem 0rem 2rem 0 ",
  paddingLeft: "0rem",
  boxShadow: "none !important",
  borderTop: expanded ? "1px solid #D6D6D6" : "none",
  margin: "0px !important",
  borderBottom: expanded ? "1px solid #D6D6D6" : "none",
  width: {
    xs: "100%",
    md: "83%",
  },

  ...(expanded && {
    border: "1px solid #D6D6D6",
    borderTop: "1px solid #000",
    borderRadius: "1rem 1rem 0 0",
  }),
  "@media (max-width: 500px)": {
    padding: "1rem 1rem 1rem 0",
  },
}));

/*******COUPLES profile*******/
export const CoupleInput = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
  },
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    height: "45px",
    width: "100%",
    maxWidth: "22rem",
    boxShadow: "none",
    borderRadius: "10px",
    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    width: "100%",
    "& > fieldset": { borderColor: "#c3bebe" },
    "&:hover fieldset": {
      borderColor: "#c3bebe",
    },
  },

  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },

  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },

  [`@media (min-width: 1100px)`]: {
    "& .MuiOutlinedInput-root": {
      width: "18rem",
    },
  },
}));

export const TextAreaInput = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
  },
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    height: "45px",
    width: "100%",
    maxWidth: "22rem",
    boxShadow: "none",
    borderRadius: "10px",
    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    width: "100%",
    "& > fieldset": { borderColor: "#c3bebe" },
    "&:hover fieldset": {
      borderColor: "#c3bebe",
    },
  },

  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },

  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
}));

export const CoupleCommonInput = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    height: "45px",
    width: "100%",
    // maxWidth: "22rem",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    "& > fieldset": { borderColor: "#c3bebe" },
    "&:hover fieldset": {
      borderColor: "#c3bebe",
    },
    "& input::placeholder": {
      color: "#000 !important",
      fontFamily: "Manrope, sans-serif",
      fontSize: "12px",
    },
  },
  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },
  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
}));

// search field
export const SearchInputStyle = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    boxShadow: "none",
    border: "1px solid #B7B7B7",
  },
  "& .MuiOutlinedInput-root": {
    width: "18rem",
    maxWidth: "100%",
    height: "2.7rem",
    borderRadius: "1.5rem",
    fontFamily: "Manrope, sans-serif",
    "& > fieldset": { borderColor: "#B7B7B7" },
    "&:hover fieldset": {
      borderColor: "#B7B7B7", // Set the same color as normal state to prevent the black border during hovering
    },
  },

  "& .MuiFormHelperText-root.Mui-error": {
    border: "1px solid #fff",
    marginLeft: "0rem",
  },

  "& .Mui-focused": {
    border: "1px solid #c3bebe",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  "@media (max-width: 800px)": {
    display: "none",
  },
}));

// Box style - div
export const MuiBoxStyles = {
  display: "flex",
  flexDirection: "column",
  // gap: "5px",
};

export const CoupleSelectStyle = {
  control: (provided, state) => ({
    ...provided,
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    border: "1px solid #c3bebe",
    boxShadow: "none",
    marginTop: "8px",
    borderRadius: "10px",
    // background: "#fafafa",
    height: "50px",
    // width: "22rem",
    maxWidth: "25rem",
    "&:hover": {
      border: "1px solid #c3bebe",
    },
    "@media (min-width: 551px)": {
      width: "11rem",
      maxWidth: "30rem",
    },
    "@media (min-width: 769px)": {
      width: "11.5rem",
      maxWidth: "30rem",
    },
    "@media (min-width: 1100px)": {
      width: "18rem",
      maxWidth: "30rem",
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

// BUDGET
export const CoupleAddButton = styled(Button)(({ theme }) => ({
  fontFamily: "Manrope, sans-serif",
  textTransform: "initial",
  color: "white", // Set text color to black
  backgroundColor: "#5a9d98", // Set background color to white
  borderRadius: "50px",
  border: "1px solid #5a9d98",
  maxWidth: "6rem",
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

export const BudgetEditButton = styled(Button)(({ theme }) => ({
  fontFamily: "Manrope, sans-serif",
  textTransform: "initial",
  color: "white", // Set text color to black
  backgroundColor: "#000", // Set background color to white
  borderRadius: "50px",
  border: "1px solid #515151",
  maxWidth: "6rem",
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
export const CancelCoupleButton = styled(Button)(({ theme }) => ({
  fontFamily: "Manrope, sans-serif",
  textTransform: "initial",
  color: "#5a9d98", // Set text color to black
  backgroundColor: "white", // Set background color to white
  borderRadius: "50px",
  border: "1px solid #5a9d98",
  maxWidth: "6rem",
  width: "160px",
  height: "45px",
  fontSize: "12px",
  fontWeight: "600",
  boxShadow: "none",
}));

export const BlackLargeButton = styled(Button)(({ theme }) => ({
  fontFamily: "Manrope, sans-serif",
  textTransform: "initial",
  color: "#fff", // Set text color to black
  backgroundColor: "#5a9d98", // Set background color to white
  borderRadius: "50px",
  border: "1px solid #5a9d98",
  maxWidth: "250px",
  width: "160px",
  height: "45px",
  fontSize: "12px",
  fontWeight: "600",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#B7b7b7",
    boxShadow: "none",
    color: "white",
  },
}));

export const BlackSmallButton = styled(Button)(({ theme }) => ({
  fontFamily: "Manrope, sans-serif",
  textTransform: "initial",
  color: "#fff", // Set text color to black
  backgroundColor: "#5a9d98", // Set background color to white
  borderRadius: "50px",
  border: "1px solid #5a9d98",
  maxWidth: "250px",
  width: "5rem",
  height: "2rem",
  fontSize: "12px",
  fontWeight: "600",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#B7b7b7",
    boxShadow: "none",
    color: "white",
  },
}));

export const BudgetInput = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    width: "100%",
    maxWidth: "22rem",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    height: "46px",
    width: "11rem",
    fontFamily: "Source",
    "& > fieldset": { borderColor: "#c3bebe" },
    "&:hover fieldset": {
      borderColor: "#c3bebe",
    },
  },
  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },
  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
}));

// RATING AND REVIEW IPUT
export const RatingInput = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    height: "45px",
    width: "16rem",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    width: "16rem",
    maxWidth: "100%",
    "& > fieldset": { borderColor: "#c3bebe" },
    "&:hover fieldset": {
      borderColor: "#c3bebe",
    },
  },
  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },
  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
}));

export const IndiRatingInput = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    height: "45px",
    // width: "16rem",
    width: "100%",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    textAlign: "center",
    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    width: "7rem",
    maxWidth: "100%",
    "& > fieldset": { borderColor: "#c3bebe" },
    "&:hover fieldset": {
      borderColor: "#c3bebe",
    },
  },
  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
    position: "absolute",
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)",
  },
  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  "@media screen and (min-width: 1024px)": {
    "& .MuiOutlinedInput-root": {
      width: "10rem", // Change width for larger screens
    },
  },
}));

export const RatingCustomStyle = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #c3bebe",
    boxShadow: "none",
    fontSize: "14px",
    borderRadius: "10px",
    // background: "#fafafa",
    padding: "5px",
    width: "16rem",
    maxWidth: "100%",
    height: "50px",
    // maxHeight: "50px",
    "&:hover": {
      border: "1px solid #c3bebe",
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
      : "#fff",
    color: state.isSelected ? "black" : "black",
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

export const RatingButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  borderRadius: "2rem",
  width: "16rem",
  maxWidth: "100%",
  height: "40px",
  backgroundColor: "#5a9d98",
  color: "white",
  textTransform: "capitalize",
  border: "none",
  "&:hover": {
    backgroundColor: "#5a9d98",
    border: "none",
    // border: "1px solid black",
  },
  "&:active": {
    backgroundColor: "#fff",
    border: "1px solid black",
  },
  [theme.breakpoints.down("600")]: {
    width: "8rem",
  },
  "&. MuiSvgIcon": {
    fill: "black",
  },
}));

/*****REACT SELECT SCROLL STYLE */
export const reactSelectScroll = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: "300px",
    padding: "1rem",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px", // Set the width of the scrollbar
      height: "30px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#5a9d98", // Set the color of the scrollbar thumb
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f5f5f5", // Set the color of the scrollbar track
    },
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  }),
};

// PAYMENTS INPUT
export const PaymentInput = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    height: "45px",
    width: "16rem",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    backgroundColor: "#f5f5f5",
    fontSize: "14px",
    width: "100%",
    maxWidth: "100%",
    "& > fieldset": { borderColor: "transparent" },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
  },
  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },
  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
}));

export const CheckBoxStyle2 = styled(Checkbox)({
  "& .MuiSvgIcon-root": {
    fontSize: "24px",
    color: "#d7d7d7",
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    fontSize: "24px",
    backgroundColor: "#515151", // Set background color to black when checked
  },
  "& .MuiFormControlLabel-label": {
    fontFamily: "Manrope, sans-serif",
  },
});

// Pricing Checkbox
export const PricingCheckbox = styled(Checkbox)({
  " & .MuiSvgIcon-root path": {
    visibility: "hidden",
  },
  "& .MuiSvgIcon-root": {
    width: "4rem",
    height: "2rem",
    borderRadius: "10px",
    backgroundColor: "#ced6d2",
    color: "",
    fontWeight: 500,
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ced6d2", // Adjust the color on hover if needed
    },
  },
});

// Couple Enquiry Button
export const CoupleAddCategoryButton = styled(Button)(({ theme }) => ({
  fontFamily: "Manrope, sans-serif",
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

//
export const EnquirySelectStyle = {
  control: (provided, state) => ({
    ...provided,
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    border: "1px solid #c3bebe",
    boxShadow: "none",
    marginTop: "8px",
    borderRadius: "10px",
    // background: "#fafafa",
    height: "50px",
    width: "62vw",
    maxWidth: "100%",
    "&:hover": {
      border: "1px solid #c3bebe",
    },

    "@media (min-width: 1100px)": {
      width: "30vw",
      maxWidth: "30vw",
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
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
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

// Expiryinput
export const Expiryinput = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Manrope, sans-serif",
    height: "45px",
    // width: "16rem",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope, sans-serif",
    backgroundColor: "#FAFAFA",
    fontSize: "14px",
    width: "100%",
    maxWidth: "100%",
  },
  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },
}));
