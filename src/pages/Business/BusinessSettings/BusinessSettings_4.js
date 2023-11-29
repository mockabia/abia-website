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
import {
  CheckboxOption,
  CustomMultiSelect,
} from "../../../components/CustomerSelect";

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
    BusinessJS.fetchAddCategory(
      vendorDetails.first_category,
      setAddCategoryOption
    );
  }, [vendorDetails.first_category]);

  // console.log("addtional category:", addCategoryOption);

  const getFieldError = (fieldName) => {
    return inputsErrors && inputsErrors[fieldName]
      ? inputsErrors[fieldName][0]
      : null;
  };

  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 3;

  const handleRegionChange = (selectedOption) => {
    setAdditionaCatSelect(selectedOption);
  };

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
                  <CustomMultiSelect
                    field={field}
                    categoryOptions={addCategoryOption}
                    selectedOptions={additionaCatSelect}
                  />
                )}
              />
              {/* <Select
                name="other_category"
                isMulti={true}
                options={addCategoryOption}
                // value={additionaCatSelect}
                styles={customSelectStyles}
                onChange={(selectedOptions) =>
                  handleRegionChange(selectedOptions)
                }
                isClearable={false}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                isOptionDisabled={() => additionaCatSelect.length >= 4}
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
              /> */}
              {getFieldError("other_category") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("other_category")}
                </p>
              )}
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

const Menu = (props) => {
  return <components.Menu {...props}>{props.children}</components.Menu>;
};
