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
