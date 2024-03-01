import React, { useEffect, useState } from "react";
import "../../Style/BusinessSettings.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as BusinessJS from "../Business";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("No password provided.")
    .min(6, "Password ishould be 6 chars minimum.")
    .oneOf([yup.ref("confirm_password")], "Passwords must match"),
  confirm_password: yup
    .string()
    .required("Confirm Password is required.")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const UsernamePassword = ({ vendorDetails }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirm_password: "",
    vid: vendorDetails.vid,
  });
  const [inputsErrors, setInputsErrors] = useState({});
  const [settingResponse, setSettingResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting, submitCount },
  } = useForm({
    mode: "onChange", //isValid works on mode=onChange
    resolver: yupResolver(schema),
    defaultValues: {
      email: vendorDetails.email,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    setFormValues();
    setLoading(true);
    const formValues = {
      email: data.email || vendorDetails.email,
      password: data.password,
      confirm_password: data.confirm_password,
    };
    formValues.vid = vendorDetails.vid;
    setTimeout(() => {
      BusinessJS.updateBusiness(
        3,
        formValues,
        setInputsErrors,
        setSettingResponse
      );
      setLoading(false); // Set loading to false when the response is received
    }, 1000);

    console.log("Form Data:", formValues);
  };

  const getFieldError = (fieldName) => {
    return inputsErrors && inputsErrors[fieldName]
      ? inputsErrors[fieldName][0]
      : null;
  };

  return (
    <div className="username-password-container">
      <div className="mt-[20px]">
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="font-semibold">Email*</label>
            <br />
            <div>
              <input
                type="email"
                name="email"
                required
                className="basicinfo-input-style"
                {...register("email")}
              />
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                {errors.email?.message}
              </p>
              {getFieldError("email") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("email")}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Password*</label>
            <br />
            <div>
              <input
                type="password"
                name="password"
                className="basicinfo-input-style"
                {...register("password")}
              />
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                {errors.password?.message}
              </p>
              {getFieldError("password") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("password")}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Repeat Password*</label>
            <br />
            <div>
              <input
                type="password"
                name="confirm_password"
                className="basicinfo-input-style"
                {...register("confirm_password")}
              />
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                {errors.confirm_password?.message}
              </p>
              {getFieldError("confirm_password") && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {getFieldError("confirm_password")}
                </p>
              )}
            </div>
          </div>
          <div
            className={`basicinfo-submit-button ${
              settingResponse ? "focused" : ""
            }`}
            onClick={handleSubmit}
          >
            <button>{loading ? "Loading..." : "Update"}</button>
          </div>
          {/* <div className="usernamepassword-submit-button">
            <button>Update</button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default UsernamePassword;
