import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    fontFamily: "Manrope",
    height: "45px",
    width: "100%",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "10px",
    outline: "none",
    borderColor: state.isFocused ? "#c3bebe" : "#f5f5f5", // Adjust border color based on focus
    backgroundColor: "#f5f5f5",
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Manrope",
    fontSize: "14px",
    backgroundColor: state.isSelected ? "#5a9d98" : "#ffffff", // Adjust background color based on selection
    color: state.isSelected ? "#ffffff" : "#000000", // Adjust text color based on selection
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontFamily: "Manrope",
    fontSize: "14px",
    color: "#000000", // Adjust text color
  }),
  // Add more styles as needed
};

const PaymentSelect = (props) => {
  return <Select styles={customStyles} {...props} />;
};

export default PaymentSelect;
