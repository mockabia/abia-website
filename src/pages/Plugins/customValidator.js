import { get } from "lodash";

//*******************************

//Email
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
    let results = password.length >= 6;
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
    case "name":
      validateName(values.name, errors);
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
export const validateteBasicInfo = (inputs, setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  let validName = validateName(inputs["name"], setInputsErrors);
  if (validName.valid === false) {
    validate = false;
    setInputsErrors((values) => ({
      ...values,
      ["name"]: validName.error,
    }));
    const nameInput = document.querySelector('input[name="email"]');
    if (nameInput) {
      nameInput.focus();
    }
  }
  let validContact = validateName(inputs["name"], setInputsErrors);
  if (validName.valid === false) {
    validate = false;
    setInputsErrors((values) => ({
      ...values,
      ["name"]: validName.error,
    }));
    const nameInput = document.querySelector('input[name="email"]');
    if (nameInput) {
      nameInput.focus();
    }
  }

  return validate;
};

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
  if (!inputs.email) {
    validate = false;
    setInputsErrors((values) => ({...values,["email"]: "Email is required"}));
  } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
    validate = false;
    setInputsErrors((values) => ({...values,["email"]: "Invalid Email"}));
  }
  // Validate Password
  if (!inputs.password) {
    validate = false;
    setInputsErrors((values) => ({...values,["password"]: "Password is required"}));
  } else if (inputs.password.length < 6) {
    validate = false;
    setInputsErrors((values) => ({...values,["password"]: "Minimum 6 characters"}));
  }
  return validate;
};
export const validateCoupleSignup = (activeStep,formValues, setInputsErrors) => {
  setInputsErrors({});
  let validate = true;
  if (activeStep === 0) {
    if (!formValues.bride_message) {
      validate = false;
      setInputsErrors((values) => ({...values,["bride_message"]: "Please Select an Option"}));
    }
  } else if (activeStep === 1) {
    if (!formValues.bride) {
      validate = false;
      setInputsErrors((values) => ({...values,["bride"]: "Full Name is required"}));
    }
    if (!formValues.groom) {
      validate = false;
      setInputsErrors((values) => ({...values,["groom"]: "Partner's Name is required"}));
    }
    if ((formValues.decision == false || formValues.decision == undefined) && !formValues.wedding_date) {
      validate = false;
      setInputsErrors((values) => ({...values,["wedding_date"]: "Date is required"}));
    }
    if (!formValues.wedding_state) {
      validate = false;
      setInputsErrors((values) => ({...values,["wedding_state"]: "State is required"}));
    }
  } else if (activeStep === 2) {
    if (!formValues.email) {
      validate = false;
      setInputsErrors((values) => ({...values,["email"]: "Email is required"}));
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      validate = false;
      setInputsErrors((values) => ({...values,["email"]: "Invalid Email"}));
    }
    if (!formValues.password) {
      validate = false;
      setInputsErrors((values) => ({...values,["password"]: "Password is required"}));
    } else if (formValues.password.length < 6) {
      validate = false;
      setInputsErrors((values) => ({...values,["password"]: "Minimum 6 characters"}));
    }
  }
  return validate;
};

// export function validateContact(contact_person, errors) {
//   var result = [];
//   var obj = {};
//   obj["valid"] = true;

//   if (!contact_person) {
//     obj["error"] = "Contact Name is Required";
//     obj["valid"] = false;
//   }
//   return obj;
// }
