import { get } from "lodash";

//*******************************

//Email
export function validateEmail(email, field,setInputsErrors) {
  let validate = true;
  if (!email) {
    validate = false;
    setInputsErrors((values) => ({...values,[field]: "Email is required"}));
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    validate = false;
    setInputsErrors((values) => ({...values,[field]: "Invalid Email"}));
  }
  return validate;
}

// valdate password
export function validatePassword(password, field,setInputsErrors) {
  let validate = true;
  if (!password) {
    validate = false;
    setInputsErrors((values) => ({...values,[field]: "Password is required"}));
  } else if (password.length < 6) {
    validate = false;
    setInputsErrors((values) => ({...values,[field]: "Minimum 6 characters"}));
  }
  return validate;
}
export const validateSaveFavourite = (inputs, setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  if (!inputs.bride) {
    validate = false;
    setInputsErrors((values) => ({...values,["bride"]: "Full Name is required"}));
  }
  if (!inputs.groom) {
      validate = false;
      setInputsErrors((values) => ({...values,["groom"]: "Partner's Name is required"}));
  }
  let validEmail     = validateEmail(inputs.email, 'email',setInputsErrors);
  let validPassword  = validatePassword(inputs.password, 'password',setInputsErrors);
  if(!validEmail || !validPassword){
    validate = false;
  }
  if (!inputs.wedding_state) {
    validate = false;
    setInputsErrors((values) => ({...values,["wedding_state"]: "State is required"}));
  }
  if (!inputs.phone) {
    validate = false;
    setInputsErrors((values) => ({...values,["phone"]: "Phone no: is required"}));
  }
  return validate;
};
export const validateSaveEnquiry = (inputs,setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  if (!inputs.bride) {
    validate = false;
    setInputsErrors((values) => ({...values,["bride"]: "Full Name is required"}));
  }
  if (!inputs.state) {
    validate = false;
    setInputsErrors((values) => ({...values,["state"]: "Location is required"}));
  }
  if (!inputs.phone) {
    validate = false;
    setInputsErrors((values) => ({...values,["phone"]: "Phone no: is required"}));
  }
  if (!inputs.date_of_wedding) {
    validate = false;
    setInputsErrors((values) => ({...values,["date_of_wedding"]: "Wedding Date is required"}));
  }
  if (!inputs.category) {
    validate = false;
    setInputsErrors((values) => ({...values,["category"]: "Wedding Service is required"}));
  }
  let validEmail     = validateEmail(inputs.email, 'email',setInputsErrors);
  if(!validEmail){
    validate = false;
  }
  return validate;
};

export const validateCoupleSaveEnquiry = (inputs,setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  if (!inputs.phone) {
    validate = false;
    setInputsErrors((values) => ({...values,["phone"]: "Phone is required"}));
  }
  if (!inputs.date_of_wedding) {
    validate = false;
    setInputsErrors((values) => ({...values,["date_of_wedding"]: "Wedding Date is required"}));
  }
  return validate;
};
export const validateCoupleSettings = (inputs,setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  validate = validatePassword(inputs.password, 'password',setInputsErrors);
  validate = validatePassword(inputs.confirm_password, 'confirm_password',setInputsErrors);
  if (inputs.password!=inputs.confirm_password) {
    validate = false;
    setInputsErrors((values) => ({...values,["confirm_password"]: "Confirm new password"}));
  }
  return validate;
};