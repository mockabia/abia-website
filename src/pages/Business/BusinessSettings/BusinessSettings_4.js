import React, { useEffect, useRef, useState } from "react";

import "../../Style/BusinessSettings.css";
import * as BusinessJS from "../Business";
import Select, { components } from "react-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles, MultiValue } from "../../../components/FormStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const CheckboxOption = ({ innerProps, label, isSelected }) => {
  const divRef = useRef(null);

  const handleMouseEnter = () => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = "#6cc2bc";
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
        style={{ marginRight: "8px" }}
      />
      <label style={{ margin: "0.5rem", padding: 0 }}>{label}</label>
    </div>
  );
};
const CustomSelect = ({ field, categoryOptions }) => (
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
const Menu = (props) => {
  const optionSelectedLength = props.getValue().length || 0;
  return (
    <components.Menu {...props}>
      {optionSelectedLength < 4 ? (
        props.children
      ) : (
        <div style={{ margin: "1rem", color: "red" }}>Max limit achieved</div>
      )}
    </components.Menu>
  );
};

const Category = ({ vendorDetails }) => {
  const [formValues, setFormValues] = useState({
    first_category: "",
    other_category: "",
    vid: vendorDetails.vid,
  });
  const [categoryOption, setCategoryOption] = useState([]);
  const [addCategoryOption, setAddCategoryOption] = useState([]);

  const [additionaCatSelect, setAdditionaCatSelect] = useState([]);
  const [inputsErrors, setInputsErrors] = useState({});

  // useforms
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      first_category: vendorDetails.first_category,
      other_category: vendorDetails.other_category,
    },
  });

  const onSubmit = (data) => {
    setFormValues(data);

    const transformedOtherCategory = data.other_category.map((category) => [
      category.value,
      category.label,
    ]);
    const formValues = {
      first_category: data.first_category || vendorDetails.first_category,
      other_category: transformedOtherCategory,
    };
    formValues.vid = vendorDetails.vid;
    BusinessJS.updateBusiness(4, formValues, setInputsErrors);
    console.log("Category:", formValues);
  };

  useEffect(() => {
    BusinessJS.fetchCategory(setCategoryOption);
  }, []);

  useEffect(() => {
    BusinessJS.fetchAddCategory(vendorDetails.first_category, setAddCategoryOption);
  }, [vendorDetails.first_category]);

  console.log("addtional category:", addCategoryOption);

  const getFieldError = (fieldName) => {
    return inputsErrors && inputsErrors[fieldName]
      ? inputsErrors[fieldName][0]
      : null;
  };

  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 3;

  return (
    <div className="category-container">
      <div>
        <p className="text-[14px] whitespace-break-spaces">
          Only select categories that your business services.
        </p>
      </div>
      <div className="mt-[20px]">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="font-semibold">Primary Category</label>
            <br />
            <div className="relative lg:w-[52%] category-single-select">
              <Select
                name="first_category"
                placeholder=""
                options={categoryOption}
                defaultValue={{
                  label: vendorDetails.first_category_val,
                  value: vendorDetails.first_category,
                }}
                styles={customSelectStyles}
                components={{
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
                }}
              />
              {getFieldError("first_category") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("first_category")}
                </p>
              )}
            </div>
            <br />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Additional Categories</label>
            <br />
            <div className="relative lg:w-[52%] category-multi-select">
              <Controller
                name="other_category"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    field={field}
                    categoryOptions={addCategoryOption}
                  />
                )}
              />
              {/* <Controller
                name="other_category"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    name="other_category"
                    // components={{ Menu }}
                    placeholder=""
                    isMulti
                    value={additionaCatSelect}
                    styles={customSelectStyles}
                    options={categoryOption}
                    onChange={(selectedOptions) => {
                      setAdditionaCatSelect(selectedOptions);
                      field.onChange(selectedOptions);
                    }}
                    {...field}
                    isValidNewOption={isValidNewOption}
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
                    }}
                  />
                )}
              /> */}
            </div>
            <br />
          </div>
          <div className="basicinfo-submit-button relative">
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Category;
