import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/coupleService";
import * as customValidator from "../Plugins/customValidator";
import * as customJS from "../../plugins/custom/custom";
export {customJS};

export const fetchState = async (setStateOptions) => {
  await servicesPage.stateDropdown().then(function (response) {
    if (response.statuscode === 200) {
      setStateOptions(response.result);
    }
  });
};

export const fetchMarketingCategory = async (setMarketingOptions) => {
  await servicesPage.marketCategory().then(function (response) {
    if (response.statuscode === 200) {
      setMarketingOptions(response.result);
    }
  });
};


export const fetchRegion = async (selectedStates, setRegions) => {
  await servicesPage
    .stateRegionDropdwon(selectedStates)
    .then(function (response) {
      if (response.statuscode === 200) {
        setRegions(response.result);
      }
    });
};
export const hasCoupleJWT = async (navigate) => {
  let flag = false;
  localStorage.getItem("coupleToken") ? (flag = true) : (flag = false);
  if (flag == true) {
    navigate(window.CDASHBOARD);
  }
};
export const checkCoupleRememberMe = (setInputs) => {
  setInputs({
    ["username"]: localStorage.cusername,
    ["password"]: localStorage.cpassword,
    ["remember_me"]: localStorage.cremember_me,
  });
};
export const logout = async (navigate) => {
  //setLogoutTemp(navigate)
  await servicesPage.logout().then(function (response) {
    if (response) {
      if (response.statuscode == 200) {
        apiService.setAuthToken(null);
        localStorage.removeItem("coupleToken");
        localStorage.removeItem("user");
        navigate(window.CLOGIN);
      }
    }
  });
};
export const coupleSignup = async (activeStep,setActiveStep,formValues, setErrors,navigate) => {
  if (customValidator.validateCoupleSignup(activeStep,formValues, setErrors)) {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep==3){navigate(window.CTHANKYOU)
      await servicesPage.coupleSignup(formValues).then(function (response) {
        if (response.statuscode == 200) {
          navigate(window.CTHANKYOU)
        } else {
          if (response.errors) {
            setErrors(response.errors);
          } else if (response.statusmessage) {
            setErrors(response.statusmessage);
          }
        }
      });
    }
  }
};
const setLogoutTemp = async (navigate) => {
  apiService.setAuthToken(null);
  localStorage.removeItem("coupleToken");
  localStorage.removeItem("user");
  navigate(window.CLOGIN);
}
const setLoginTemp = async (navigate) => {
  let token = {
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FiaWEuYWJpYS10ZXN0LmNvbS93ZWIvV2ViQnVzaW5lc3NMb2dpbiIsImlhdCI6MTcwNzk3NDI3NiwiZXhwIjoxNzA3OTc3ODc2LCJuYmYiOjE3MDc5NzQyNzYsImp0aSI6ImFGUEZ1d2l2M1lPdmpxODkiLCJzdWIiOiIxIiwicHJ2IjoiY2U0YWQ4MGEwYmUwMzY0YWI5ZDI3YTdkZWE3M2EwODBkZThlNzY1MCJ9.AcDOsDArxxFZtyX7Gfm7HCixiSYd5wUE3AXrBs9gVr8",
      "token_type": "bearer",
      "expires_in": 60000,
      "user": {
          "id": 1,
          "abn": "",
          "name": "Arnold A",
          "address": "Arnold A",
          "suburb": "Arnold A",
          "state": "QLD"
      }
  };
  localStorage.setItem("coupleToken", JSON.stringify(token));
  localStorage.setItem("abiaType", "C");
  let expiresInMS = token.expires_in;
  let currentTime = new Date();
  let expireTime = new Date(currentTime.getTime() + expiresInMS);

  localStorage.setItem("cexpireTime", expireTime);
  localStorage.removeItem("cusername");
  localStorage.removeItem("cpassword");
  localStorage.removeItem("cremember_me");
  apiService.setAuthToken(token);
  navigate(window.CDASHBOARD)
}
export const coupleLogin = async (formValues, setErrors,navigate) => {
  if (customValidator.validateCoupleLogin(formValues, setErrors)) {
    //setLoginTemp(navigate)
    
    await servicesPage.coupleLogin(formValues).then(function (response) {
      if (response.statuscode == 200) {
        const token = response.token;
        localStorage.setItem("coupleToken", JSON.stringify(token));
        localStorage.setItem("abiaType", "C");
        let expiresInMS = token.expires_in;
        let currentTime = new Date();
        let expireTime = new Date(currentTime.getTime() + expiresInMS);

        localStorage.setItem("cexpireTime", expireTime);
        localStorage.removeItem("cusername");
        localStorage.removeItem("cpassword");
        localStorage.removeItem("cremember_me");
        apiService.setAuthToken(token);
        navigate(window.CDASHBOARD)
      } else {
        if (response.errors) {
          setErrors(response.errors);
        } else if (response.statusmessage) {
          setErrors(response.statusmessage);
        }
      }
    });
  }
};