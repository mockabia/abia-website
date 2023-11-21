import React, { useEffect, useState } from "react";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./dropDown.css";
import { forwardRef } from "react";

const SingleSelect = forwardRef(
  ({ options, onFormSubmit, name, defaultValue }, ref) => {
    const [selectedOptions, setSelectedOptions] = useState(
      defaultValue || null
    );

    const handleSelectChange = (selected) => {
      setSelectedOptions(selected);
      onFormSubmit(selected);
    };


    useEffect(() => {
      setSelectedOptions(defaultValue || null);
    }, [defaultValue]);

    useEffect(() => {
      return () => {
        setSelectedOptions(null);
      };
    }, [onFormSubmit]);

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

    const inputProps = {
      inputMode: "none",
      name: name || "defaultName",
    };

 

    // ... (rest of the code)

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
            isSearchable={true}
            inputProps={inputProps}
            isClearable={false}
            hideSelectedOptions={false}
            allowSelectAll={true}
            value={selectedOptions}
            ref={ref}
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
            }}
          />
        </span>
      </div>
    );
  }
);

export default SingleSelect;
