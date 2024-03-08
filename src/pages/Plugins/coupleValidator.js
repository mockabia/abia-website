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
export function validateName(name, errors) {
  var result = [];
  var obj = {};
  obj["valid"] = true;

  if (!name) {
    obj["error"] = "Name is Required";
    obj["valid"] = false;
  }
  return obj;
}
export const validateCoupleLogin = (inputs, setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  let validEmail     = validateEmail(inputs.email, 'email',setInputsErrors);
  let validPassword  = validatePassword(inputs.password, 'password',setInputsErrors);
  if(!validEmail || !validPassword){
    validate = false;
  }
  return validate;
};
export const validateCoupleForgot = (inputs, setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  validate = validateEmail(inputs.email, 'email',setInputsErrors);
  return validate;
};
export const validateCoupleSignup = (activeStep,inputs, setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  if (activeStep === 0) {
    if (inputs.bride_message===null || inputs.bride_message===undefined) {
      validate = false;
      setInputsErrors((values) => ({...values,["bride_message"]: "Please Select an Option"}));
    }
  } else if (activeStep === 1) {
    if (!inputs.bride) {
      validate = false;
      setInputsErrors((values) => ({...values,["bride"]: "Full Name is required"}));
    }
    if (!inputs.groom) {
      validate = false;
      setInputsErrors((values) => ({...values,["groom"]: "Partner's Name is required"}));
    }
    if (inputs.wedding == '1' && !inputs.date_of_wedding) {
      validate = false;
      setInputsErrors((values) => ({...values,["date_of_wedding"]: "Date is required"}));
    }
    if (!inputs.wedding_state) {
      validate = false;
      setInputsErrors((values) => ({...values,["wedding_state"]: "State is required"}));
    }
  } else if (activeStep === 2) {
    let validEmail     = validateEmail(inputs.email, 'email',setInputsErrors);
    let validPassword  = validatePassword(inputs.password, 'password',setInputsErrors);
    if(!validEmail || !validPassword){
      validate = false;
    }
  }
  return validate;
};
export const validateCoupleContact = (inputs,setInputsErrors) => {
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
  if (!inputs.phone) {
    validate = false;
    setInputsErrors((values) => ({...values,["phone"]: "Phone no: is required"}));
  }
  let validEmail     = validateEmail(inputs.email, 'email',setInputsErrors);
  if(!validEmail){
    validate = false;
  }
  return validate;
};

export const validateCoupleWeddingDetails = (inputs,setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  if (inputs.wedding == false && !inputs.date_of_wedding) {
    validate = false;
    setInputsErrors((values) => ({...values,["date_of_wedding"]: "Date is required"}));
  }
  if (!inputs.wedding_state) {
    validate = false;
    setInputsErrors((values) => ({...values,["wedding_state"]: "State is required"}));
  }
  if (!inputs.wedding_location) {
    validate = false;
    setInputsErrors((values) => ({...values,["wedding_location"]: "Wedding Location is required"}));
  }
  if (!inputs.budget) {
    validate = false;
    setInputsErrors((values) => ({...values,["budget"]: "Budget is required"}));
  }
  if (!inputs.guests) {
    validate = false;
    setInputsErrors((values) => ({...values,["guests"]: "Guests is required"}));
  }
  if (!inputs.bridesmaids) {
    validate = false;
    setInputsErrors((values) => ({...values,["bridesmaids"]: "Bridesmaids is required"}));
  }
  if (!inputs.groomsmen) {
    validate = false;
    setInputsErrors((values) => ({...values,["groomsmen"]: "Groomsmen is required"}));
  }
  if (!inputs.travellingguests) {
    validate = false;
    setInputsErrors((values) => ({...values,["travellingguests"]: "Travelling guests is required"}));
  }
  if (!inputs.profile_desc) {
    validate = false;
    setInputsErrors((values) => ({...values,["profile_desc"]: "Profile description is required"}));
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