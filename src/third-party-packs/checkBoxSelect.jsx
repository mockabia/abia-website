import { useState } from "react";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./checkboxSelect.css";

library.add(faCaretDown);

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#e7f5f4";
  if (isActive) bg = "#6cc2bc";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "#515151",
    display: "flex ",
    gap: "30px",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      {/* <input type="checkbox" checked={isSelected} /> */}
      <span
        className={`checkbox ${isSelected ? "checked" : ""}`}
        aria-hidden="true"
      />
      <div className="font-semibold">{children}</div>
    </components.Option>
  );
};

const allOptions = [
  { value: "wedding-venue", label: "Wedding Venue" },
  { value: "ceremony-venue", label: "Ceremony Venue" },
  { value: "function-cordinator", label: "Function Cordinator" },
  { value: "1st-night-honeymoon", label: "1st Night Honeymoon" },
];

export default function SelectDropdown({ options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const Placeholder = (props) => {
  //   return <components.Placeholder {...props} />;
  // };

  // const CaretDownIcon = () => {
  //   return <FontAwesomeIcon icon="caret-down" />;
  // };

  // const DropdownIndicator = (props) => {
  //   return (
  //     <components.DropdownIndicator {...props}>
  //       <CaretDownIcon />
  //     </components.DropdownIndicator>
  //   );
  // };

  return (
    <div className="">
      <style>
        
      </style>
      <Select
        defaultValue={[]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        // components={{ Placeholder, DropdownIndicator }}
        onChange={(options) => {
          if (Array.isArray(options)) {
            setSelectedOptions(options.map((opt) => opt.value));
          }
        }}
        options={allOptions}
      />
      <div className="hidden">
        <pre>{JSON.stringify({ selected: selectedOptions }, null, 2)}</pre>
      </div>
    </div>
  );
}

// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { default as ReactSelect } from "react-select";
// import { components } from "react-select";

// const Option = (props) => {
//   return (
//     <div>
//       <components.Option {...props}>
//         <input
//           type="checkbox"
//           checked={props.isSelected}
//           onChange={() => null}
//         />{" "}
//         <label>{props.label}</label>
//       </components.Option>
//     </div>
//   );
// };
// const SelectOptions = [
//   { value: "ocean1", label: "Ocean" },
//   { value: "blue", label: "Blue" },
//   { value: "purple", label: "Purple" },
//   { value: "red", label: "Red" },
//   { value: "orange", label: "Orange" },
//   { value: "yellow", label: "Yellow" },
//   { value: "green", label: "Green" },
//   { value: "forest", label: "Forest" },
//   { value: "slate", label: "Slate" },
//   { value: "silver", label: "Silver" },
// ];

// export default class SelectCheckBox extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       optionSelected: null,
//     };
//   }

//   handleChange = (selected) => {
//     this.setState({
//       optionSelected: selected,
//     });
//   };

//   render() {
//     return (
//       <span
//         class="d-inline-block"
//         data-toggle="popover"
//         data-trigger="focus"
//         data-content="Please selecet account(s)"
//       >
//         <ReactSelect
//           options={SelectOptions}
//           isMulti
//           closeMenuOnSelect={false}
//           hideSelectedOptions={false}
//           components={{
//             Option,
//           }}
//           onChange={this.handleChange}
//           allowSelectAll={true}
//           value={this.state.optionSelected}
//         />
//       </span>
//     );
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<SelectCheckBox />, rootElement);
