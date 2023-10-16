import React, { useState } from "react";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

const schema = yup.object({
  //   language: yup.number().nullable().required("Please select language"),
  language: yup.mixed().test("required", "Please select language", (value) => {
    return value !== null && value !== undefined;
  }),
});

const languageList = [
  { value: 1, label: "English" },
  { value: 2, label: "Hindi" },
];

const DropdownValidation = () => {
  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    field: { value: langValue, onChange: langOnChange, ...restLangField },
  } = useController({ name: "language", control });

  const { errors } = formState;

  return (
    <form>
      <div>
        <label>Language</label>
        <Select
          className="select-input"
          placeholder="placeholder"
          isClearable
          options={languageList}
          value={
            langValue
              ? languageList.find((x) => x.value === langValue)
              : langValue
          }
          onChange={(option) => langOnChange(option ? option.value : option)}
          {...restLangField}
        />
        {errors.language && <p>{errors.language.message}</p>}
      </div>
    </form>
  );
};

export default DropdownValidation;
