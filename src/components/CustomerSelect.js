import React, { useEffect, useRef, useState } from "react";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const customSelectStyles = {
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

const MoreSelectedBadge = ({ items }) => {
  const style = {
    marginLeft: "auto",
    background: "#6cc2bc",
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

const MultiValue = ({ index, getValue, ...props }) => {
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

// const Menu = (props) => {
//   return <components.Menu {...props}>{props.children}</components.Menu>;
// };

const Menu = (props) => {
  const { getValue, children } = props;
  const optionSelectedLength = getValue().length || 0;
  const maxOptions = 4;

  return (
    <components.Menu {...props}>
      {React.Children.map(children, (child) => {
        const isSelected = getValue().some(
          (option) => option.value === child.props.value
        );

        const isDisabled = optionSelectedLength >= maxOptions && !isSelected;

        return React.cloneElement(child, {
          isDisabled: isDisabled,
        });
      })}
    </components.Menu>
  );
};

export const CheckboxOption = ({ innerProps, label, isSelected }) => {
  const divRef = useRef(null);

  const handleMouseEnter = () => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = "#e7f5f4";
    }
  };

  const handleMouseLeave = () => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = isSelected
        ? "#FAFAFA"
        : "transparent";
    }
  };
  return (
    <div
      {...innerProps}
      ref={divRef}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        color: isSelected ? "#6cc2bc" : "#333333",

        backgroundColor: isSelected ? "#FAFAFA" : "transparent",
        borderRadius: "4px",
        transition: "background-color 0.3s, color 0.3s", // Add transition for a smooth effect
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        style={{
          marginRight: "8px",
          fontSize: "14px",
          width: "20px",
          height: "20px",
          backgroundColor: isSelected ? "#000" : "initial",
        }}
      />
      <label
        style={{
          margin: "0.5rem",
          padding: 0,
          fontWeight: "400",
          fontSize: "14px",
          color: isSelected ? "#6cc2bc" : "#333333",
        }}
      >
        {label}
      </label>
    </div>
  );
};

export const CustomMultiSelect = ({ field, categoryOptions }) => (
  <Select
    {...field}
    isMulti
    options={categoryOptions}
    styles={customSelectStyles}
    closeMenuOnSelect={false}
    blurInputOnSelect={false}
    hideSelectedOptions={false}
    isClearable={false}
    components={{
      Menu,
      MultiValue,
      IndicatorSeparator: null,
      DropdownIndicator: () => (
        <div>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="dropDown-position"
            style={{ color: "#7c7c7c" }}
          />
        </div>
      ),
      Option: ({ innerProps, label, isSelected }) => (
        <CheckboxOption
          innerProps={innerProps}
          label={label}
          isSelected={isSelected}
        />
      ),
    }}
  />
);
