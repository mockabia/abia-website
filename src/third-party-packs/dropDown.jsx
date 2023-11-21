import React, { useEffect, useState } from "react";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./dropDown.css";
import { forwardRef } from "react";

const Dropdown = forwardRef(({ options, onFormSubmit }, ref) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    onFormSubmit(selected);
  };

  useEffect(() => {
    return () => {
      setSelectedOptions([]);
    };
  }, [onFormSubmit]);

  const inputProps = {
    readOnly: true,
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #c3bebe",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #c3bebe",
      },
      borderRadius: "10px",
      background: "#fafafa",
      padding: "5px",
      width: "100%",
      height: "50px",
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
    clearIndicator: () => ({
      display: "none",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
    }),
  };

  //multi value
  const MultiValue = ({ index, getValue, selectProps, data, ...props }) => {
    const maxToShow = 2;
    const overflow = getValue()
      .slice(maxToShow)
      .map((x) => x.label);

    if (index < maxToShow) {
      return <components.MultiValue {...props} />;
    } else if (index === maxToShow) {
      return <MoreSelectedBadge items={overflow} />;
    } else {
      return null;
    }
  };

  const MoreSelectedBadge = ({ items }) => {
    const style = {
      marginLeft: "auto",
      fontSize: "12px",
      fontWeight: "400",
      padding: "5px",
    };

    const title = items.join(", ");
    const length = items.length;
    const label = `+ ${length}  `;

    return (
      <div style={style} title={title}>
        {label}
      </div>
    );
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
          isMulti={true}
          tabIndex={0}
          inputProps={inputProps}
          closeMenuOnSelect={false}
          blurInputOnSelect={false} //bug fixed
          hideSelectedOptions={false}
          value={selectedOptions}
          ref={ref}
          onChange={handleSelectChange}
          styles={customStyles}
          components={{
            MultiValue,
            DropdownIndicator: () => (
              <div>
                {!selectedOptions.length && (
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="dropDown-position"
                    style={{ color: "#7c7c7c" }}
                  />
                )}
              </div>
            ),
            ClearIndicator: null,
          }}
        />
      </span>
    </div>
  );
});

export default Dropdown;
