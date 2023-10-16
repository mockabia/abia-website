import React from "react";
import { Controller, useForm } from "react-hook-form";


const SingleSelect2 = ({ options: propOptions, onFormSubmit }) => {
  const { register, errors } = useForm();
  return (
    <select {...register("select", { required: true })}>
      {propOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SingleSelect2;
