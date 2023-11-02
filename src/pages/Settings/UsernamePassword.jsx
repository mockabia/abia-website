import React, { useEffect, useState } from "react";
import "./UsernamePassword.css";
import * as apiurls from "../../api/apiUrls";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
export const MAIN_API       = apiurls.BUSINESS_API;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("No password provided.")
    .min(6, "Password ishould be 6 chars minimum."),
});

const UsernamePassword = ({ vendorDetails }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    re_password: "",
  });

  const {
    register,
    //  handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting, submitCount },
    control,
    setValue,
    reset,
  } = useForm({
    mode: "onChange", //isValid works on mode=onChange
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: "",
      password: "",
      re_password: "",
    };

    try {
      const response = await fetch(MAIN_API['SETTINGS3'], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  return (
    <div className="username-password-container">
      <div className="mt-[20px]">
        <form className="space-y-7">
          <div className="space-y-2">
            <label className="font-semibold">Email*</label>
            <br />
            <div>
              <input
                type="email"
                name="email"
                required
                className="usernamepassword-input-style"
                value={vendorDetails.email}
                {...register("email")}
              />
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                {errors.email?.message}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Password*</label>
            <br />
            <div>
              <input
                type="password"
                name="password"
                required
                className="usernamepassword-input-style"
                value={vendorDetails.password}
                {...register("password")}
                // value={inputPassword}
                // onChange={handlePasswordChange}
              />
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                {errors.password?.message}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Repeat Password*</label>
            <br />
            <div>
              <input
                type="password"
                name="re_password"
                required
                className="usernamepassword-input-style"
                // value={inputConfirmPasssword}
                // onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
          <div className="usernamepassword-submit-button">
            <button onClick={handleSubmit}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsernamePassword;
