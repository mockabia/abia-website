import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/couple/coupleService";
import * as customValidator from "../Plugins/customValidator";
import * as customJS from "../../plugins/custom/custom";
export {customJS};

export const logout = async (navigate) => {
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
export const coupleSignup = async (formValues, setErrors,navigate) => {navigate(window.CTHANKYOU)
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
};