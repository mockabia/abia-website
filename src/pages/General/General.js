import * as apiService from "../../api/apiServices";
import * as servicesPage from "../../services/vendor/businessServices";
import * as customValidator from "../Plugins/customValidator";

const vendordashboard = "/home";
const vendorstatelistPage = "/user-state";
const vendorLogin = "/login";

export const hasJWT = async (navigate) => {
  let flag = false;
  localStorage.getItem("vendorToken") ? (flag = true) : (flag = false);
  if (flag == true) {
    navigate(vendordashboard);
  }
};
export const checkRememberMe = (setInputs) => {
  setInputs({
    ["username"]: localStorage.vusername,
    ["password"]: localStorage.vpassword,
    ["remember_me"]: localStorage.vremember_me,
  });
};
export const handleChange = (e, setInputs, setInputsErrors) => {
  const name = e.target.name;
  const value = e.target.value;
  // const formData = { [name]: value };
  // const fieldErrors = customValidator.validator(formData, name);
  setInputs((values) => ({ ...values, [name]: value }));
  setInputsErrors({});

  // if (Object.values(fieldErrors).length > 0) {
  //   setInputsErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
  // }
};

export const vendorLoginForm = async (e, inputs, setInputsErrors, navigate) => {
  e.preventDefault();
  let requestData = inputs;
  //if (customValidator.validateEmail && customValidator.validatePassword) {
  if (customValidator.validateVendorLoginForm(inputs, setInputsErrors)) {
    await servicesPage.login(requestData).then(function (response) {
      if (response.statuscode == 200) {
        const token = response.token;
        const userStatesData = response.result;
        const statesLegnth = response.result.length;
        console.log("State length:", statesLegnth);
        console.log("State Listed:", userStatesData);
        //setToken(token);
        console.log(token);
        //setUserStates(userStatesData);
        //setApiRequestSuccess(true);

        if (statesLegnth <= 1) {
          localStorage.setItem("vendorToken", JSON.stringify(token));
          let expiresInMS = token.expires_in;
          let currentTime = new Date();
          let expireTime = new Date(currentTime.getTime() + expiresInMS);

          localStorage.setItem("vexpireTime", expireTime);
          localStorage.removeItem("vusername");
          localStorage.removeItem("vpassword");
          localStorage.removeItem("vremember_me");
          /* if (inputs.remember_me && inputs.remember_me !== "") {
              localStorage.vusername     = inputs.username;
              localStorage.vpassword     = inputs.password;
              localStorage.vremember_me  = inputs.remember_me;
            } */
            apiService.setAuthToken(token);
            navigate(vendordashboard);
          } else {
            navigate(vendorstatelistPage, {
              state: { userStatesData, token: token , email: inputs.email ,}
            });
          }
      } else {
        setInputsErrors(response.errors);
      }
    });
  }
};

export const vendorLoginStateForm = async (e, inputs, navigate) => {
  e.preventDefault();
  let requestData = inputs;
    await servicesPage.loginStates(requestData).then(function (response) {
      if (response.statuscode == 200) {
        const token = response.token;

        localStorage.setItem("vendorToken", JSON.stringify(token));
        let expiresInMS = token.expires_in;
        let currentTime = new Date();
        let expireTime = new Date(currentTime.getTime() + expiresInMS);

        localStorage.setItem("vexpireTime", expireTime);
        localStorage.removeItem("vusername");
        localStorage.removeItem("vpassword");
        localStorage.removeItem("vremember_me");
        /* if (inputs.remember_me && inputs.remember_me !== "") {
            localStorage.vusername     = inputs.username;
            localStorage.vpassword     = inputs.password;
            localStorage.vremember_me  = inputs.remember_me;
          } */
          apiService.setAuthToken(token);
          navigate(vendordashboard);
        }
    });
};
export const logout = async (navigate) => {
  await servicesPage.logout().then(function (response) {
    if (response) {
      if (response.statuscode == 200) {
        apiService.setAuthToken(null);
        localStorage.removeItem("vendorToken");
        localStorage.removeItem("user");
        navigate(vendorLogin);
      }
    }
  });
};

export const vendorForgot = async (e, inputs, setInputsErrors, navigate) => {
  e.preventDefault();
  let requestData = inputs;
  if (customValidator.validateEmail) {
    await servicesPage.forgot(requestData).then(function (response) {
      if (response.statuscode == 200) {
        const token = response.token;
        const userStatesData = response.result;
        const statesLegnth = response.result.length;
        console.log("State length:", statesLegnth);
        console.log("State Listed:", userStatesData);
        //setToken(token);
        console.log(token);
        //setUserStates(userStatesData);
        //setApiRequestSuccess(true);

        if (statesLegnth == 1) {
          localStorage.setItem("vendorToken", JSON.stringify(token));
          let expiresInMS = token.expires_in;
          let currentTime = new Date();
          let expireTime = new Date(currentTime.getTime() + expiresInMS);

          localStorage.setItem("vexpireTime", expireTime);
          localStorage.removeItem("vusername");
          localStorage.removeItem("vpassword");
          localStorage.removeItem("vremember_me");
          /* if (inputs.remember_me && inputs.remember_me !== "") {
              localStorage.vusername     = inputs.username;
              localStorage.vpassword     = inputs.password;
              localStorage.vremember_me  = inputs.remember_me;
            } */
          apiService.setAuthToken(token);
          navigate(vendordashboard);
        } else {
          navigate(vendorstatelistPage, {
            state: { userStatesData },
          });
        }
      } else {
        setInputsErrors(response.errors);
      }
    });
  }
};

// validateForm
export const validateForm = (values) => {
  let errors = {};
  errors.email = customValidator.validateEmail(values.email);
  errors.password = customValidator.validatePassword(values.password);
  return errors;
};
