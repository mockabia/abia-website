import { get } from "lodash";

//*******************************
export function validateEmail(email, errors) {
  var result = [];
  var obj = {};
  obj["valid"] = true;

  if (!email) {
    obj["error"] = "Email is Required";
    obj["valid"] = false;
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var results = re.test(String(email).toLowerCase());
    if (!results) {
      obj["error"] = "Invalid Email address";
      obj["valid"] = false;
    }
  }
  return obj;
}

// valdate password
export function validatePassword(password, errors) {
  let result = [];
  var obj = {};
  obj["valid"] = true;

  if (!password) {
    obj["error"] = "Password is Required";
    obj["valid"] = false;
  } else {
    let results = password.length > 6;
    if (!results) {
      obj["error"] = "Your password has less than 6 characters.";
      obj["valid"] = false;
    }
  }
  return obj;
}

// ******************************
export const validator = (values, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "email":
      validateEmail(values.email, errors);
      break;
    case "password":
      validatePassword(values.password, errors);
      break;

    default:
  }
  return errors;
};
export const validateVendorLoginForm = (inputs, setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  let vaildEmail = validateEmail(inputs["email"], setInputsErrors);
  if (vaildEmail.valid === false) {
    validate = false;
    setInputsErrors((values) => ({
      ...values,
      ["email"]: vaildEmail.error,
    }));
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
      emailInput.focus();
    }
  }
  let validPassword = validatePassword(inputs["password"], setInputsErrors);
  if (validPassword.valid === false) {
    validate = false;
    setInputsErrors((values) => ({
      ...values,
      ["password"]: validPassword.error,
    }));
    const passwordInput = document.querySelector('input[name="password"]');
    if (passwordInput) {
      passwordInput.focus();
    }
  }
  return validate;
};
//**********************************
