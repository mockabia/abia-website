import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { CustomDropdownSelectStyles } from "../../FormStyle";

export const CommonInput = ({
  label,
  type,
  name,
  id,
  inputMode,
  value,
  onChange,
  placeholder,
}) => (
  <div className="flex flex-col gap-[5px] mb-[10px]" style={{ width: "100%" }}>
    <label className="text-[14px] font-bold">{label}</label>
    <input
      type={type}
      name={name}
      id={id}
      className="signup-input-style"
      inputMode={inputMode}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
    />
  </div>
);

export const CommonSelect = ({
  label,
  options,
  value,
  id,
  name,
  onChange,
  placeholder,
}) => (
  <div className="flex flex-col gap-[5px] mb-[10px]" style={{ width: "100%" }}>
    <label className="text-[14px] font-bold whitespace-nowrap">{label}</label>
    <div className="text-[14px]">
      <Select
        id={id}
        name={name}
        placeholder={placeholder}
        options={options}
        value={value}
        className="signup-input-style"
        styles={CustomDropdownSelectStyles}
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
        onChange={(selectedOption) => onChange(name, selectedOption)}
      />
    </div>
  </div>
);
