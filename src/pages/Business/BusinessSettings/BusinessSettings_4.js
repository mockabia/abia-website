import React, { useEffect, useState } from "react";

import "../../Style/BusinessSettings.css";
import * as BusinessJS from "../Business";
import Select, { components } from "react-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

const Category = ({ vendorDetails }) => {
  const [formValues, setFormValues] = useState({
    first_category: "",
    other_category: "",
    vid: vendorDetails.vid,
  });
  const [categoryOption, setCategoryOption] = useState([]);
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
    const formValues = {
      first_category: data.first_category || vendorDetails.first_category,
      other_category: data.other_category,
    };
    formValues.vid = vendorDetails.vid;
    BusinessJS.updateBusiness(4, formValues, setInputsErrors);
    console.log("Category:", formValues);
  };

  useEffect(() => {
    BusinessJS.fetchCategory(setCategoryOption);
  }, []);

  const getFieldError = (fieldName) => {
    return inputsErrors && inputsErrors[fieldName]
      ? inputsErrors[fieldName][0]
      : null;
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
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    name="other_category"
                    placeholder=""
                    {...field}
                    isMulti
                    options={categoryOption}
                  />
                )}
              />
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
