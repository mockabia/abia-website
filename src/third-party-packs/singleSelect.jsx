import React, { useState } from "react";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./singleSelect.css";

const SingleSelect = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isClearable, setIsClearable] = useState(true);
  const [isFocused, setIsFocused] = useState(true);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    console.log(selected);
  };

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <label className="label-checkbox">
            {/* <input
              type="checkbox"
              checked={props.isSelected}
              onChange={() => null}
              className="custom-inputcheckbox"
            />
            <span className="checkbox-indicator"></span> */}
            {props.label}
          </label>
        </components.Option>
      </div>
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #c3bebe",
      boxShadow: "none",
      '&:hover': {
        border: '1px solid #c3bebe',
    },
      borderRadius: "10px",
      background: "#fafafa",
      padding: "10px",
      width: "100%",
      maxWidth: "100%",
      "@media (min-width: 1190px)": {
        width: "96%",
        maxWidth: "96%",
      },
      // boxShadow: state.isFocused ? "0 0 0 2px lightblue" : "none",
    }),
    menu: (provided) => ({
      ...provided,
      // marginTop: "5px",
      borderRadius: "20px",
      border: "1px solid #c3bebe",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#e7f5f4"
        : state.isFocused
        ? "#e7f5f4"
        : "white",
      color: state.isSelected ? "black" : "inherit",
    }),
    indicatorSeparator: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        display: "none",
      };
    },
  };

  return (
    <div>
      <style></style>
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please select account(s)"
      >
        <ReactSelect
          options={options}
          placeholder
          defaultValue={options[1]}
          isClearable={false}
          hideSelectedOptions={false}
          allowSelectAll={true}
          value={selectedOptions}
          onChange={handleSelectChange}
          styles={customStyles}
          components={{
            DropdownIndicator: () => (
              <div>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="dropDown-position"
                  style={{ color: "#7c7c7c" }}
                />
              </div>
            ),
            Option,
          }}
        />
      </span>
    </div>
  );
};

export default SingleSelect;
