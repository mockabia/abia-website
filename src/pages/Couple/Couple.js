import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/coupleService";
import * as customValidator from "../Plugins/coupleValidator";
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
    ["cusername"]: localStorage.cusername,
    ["cpassword"]: localStorage.cpassword,
    ["cremember_me"]: localStorage.cremember_me,
  });
};
export const setLogin = async (token,navigate) => {
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
};
export const logout = async (setLoginStatus,navigate) => {
  await servicesPage.logout().then(function (response) {
    if (response) {
      if (response.statuscode == 200) {
        apiService.setAuthToken(null);
        localStorage.removeItem("coupleToken");
        localStorage.removeItem("user");
        setLoginStatus(false)
        navigate(window.HOME);
      }
    }
  });
};
export const coupleSignup = async (activeStep,setActiveStep,formValues, setErrors,navigate) => {
  if (customValidator.validateCoupleSignup(activeStep,formValues, setErrors)) {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep==3){
      await servicesPage.coupleSignup(formValues).then(function (response) {
        if (response.statuscode == 200) {
          const token = response.token;
          setLogin(token,navigate)
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
export const coupleLogin = async (formValues, setErrors,navigate) => {
  if (customValidator.validateCoupleLogin(formValues, setErrors)) {
    await servicesPage.coupleLogin(formValues).then(function (response) {
      if (response.statuscode == 200) {
        const token = response.token;
        setLogin(token,navigate)
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
export const coupleDetails = async (from,setFormValues) => {
  let token       = localStorage.getItem("coupleToken");
  token           = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId      = userSession && userSession.id ? userSession.id : null;
  await servicesPage.coupleDetails(userId).then(function (response) {
    if (response.statuscode == 200) {
      if(from=='contact'){
        setFormValues(values => ({...values,['bride']: response.result.bride,['groom']:response.result.groom,
                  ['phone']:response.result.phone,['email']:response.result.email, }))
      }else if(from=='details'){
        setFormValues(values => ({...values,['date_of_wedding']: response.result.date_of_wedding,
                  ['wedding']:response.result.wedding,['wedding_state']:response.result.wedding_state,
                  ['wedding_location']:response.result.wedding_location,['budget']:response.result.budget,
                  ['guests']:response.result.guests,['bridesmaids']:response.result.bridesmaids,
                  ['groomsmen']:response.result.groomsmen,['travellingguests']:response.result.travellingguests,
                  ['profile_desc']:response.result.profile_desc, }))
      }
    }
  });
};
export const coupleContact = async (formValues, setErrors,navigate) => {
  if (customValidator.validateCoupleContact(formValues, setErrors)) {
    await servicesPage.coupleContact(formValues.id,formValues).then(function (response) {
      if (response.statuscode == 200) {
        
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
export const coupleWeddingDetails = async (formValues, setErrors,navigate) => {
  if (customValidator.validateCoupleWeddingDetails(formValues, setErrors)) {
    await servicesPage.coupleWeddingDetails(formValues.id,formValues).then(function (response) {
      if (response.statuscode == 200) {
        
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
export const coupleSettings = async (formValues, setErrors,navigate) => {
  if (customValidator.validateCoupleSettings(formValues, setErrors)) {
    await servicesPage.coupleSettings(formValues.id,formValues).then(function (response) {
      if (response.statuscode == 200) {
        
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