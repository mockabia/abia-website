import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/coupleService";
import * as customValidator from "../Plugins/coupleValidator";
import * as customJS from "../../plugins/custom/custom";
export { customJS };

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
export const setLogin = async (token, navigate) => {
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
  navigate(window.CDASHBOARD);
};
export const logout = async (setLoginStatus, navigate) => {
  await servicesPage.logout().then(function (response) {
    if (response) {
      if (response.statuscode == 200) {
        apiService.setAuthToken(null);
        localStorage.removeItem("coupleToken");
        localStorage.removeItem("user");
        setLoginStatus(false);
        navigate(window.HOME);
      }
    }
  });
};
export const coupleSignup = async (
  activeStep,
  setActiveStep,
  formValues,
  setErrors,
  navigate
) => {
  if (customValidator.validateCoupleSignup(activeStep, formValues, setErrors)) {
    if (activeStep == 3) {
      await servicesPage.coupleSignup(formValues).then(function (response) {
        if (response.statuscode == 200) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          //const token = response.token;
          //setLogin(token, navigate);
        } else {
          if (response.errors) {
            setErrors(response.errors);
          } else if (response.statusmessage) {
            setErrors(response.statusmessage);
          }
        }
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }
};
export const coupleLogin = async (formValues, setErrors, navigate) => {
  if (customValidator.validateCoupleLogin(formValues, setErrors)) {
    await servicesPage.coupleLogin(formValues).then(function (response) {
      if (response.statuscode == 200) {
        const token = response.token;
        setLogin(token, navigate);
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
export const coupleForgot = async (formValues, setErrors, setOpen) => {
  if (customValidator.validateCoupleForgot(formValues, setErrors)) {
    await servicesPage.coupleForgot(formValues).then(function (response) {
      if (response.statuscode == 200) {
        setOpen(false);
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

export const coupleDetails = async (from, setFormValues) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.coupleDetails(userId).then(function (response) {
    if (response.statuscode == 200) {
      if (from == "contact") {
        setFormValues((values) => ({
          ...values,
          ["bride"]: response.result.bride,
          ["groom"]: response.result.groom,
          ["phone"]: response.result.phone,
          ["email"]: response.result.email,
        }));
      } else if (from == "details") {
        setFormValues((values) => ({
          ...values,
          ["date_of_wedding"]: response.result.date_of_wedding,
          ["wedding"]: response.result.wedding,
          ["wedding_state"]: response.result.wedding_state,
          ["wedding_location"]: response.result.wedding_location,
          ["budget"]: response.result.budget,
          ["guests"]: response.result.guests,
          ["bridesmaids"]: response.result.bridesmaids,
          ["groomsmen"]: response.result.groomsmen,
          ["travellingguests"]: response.result.travellingguests,
          ["profile_desc"]: response.result.profile_desc,
        }));
      }
    }
  });
};
export const coupleContact = async (formValues, setErrors, navigate) => {
  if (customValidator.validateCoupleContact(formValues, setErrors)) {
    let token = localStorage.getItem("coupleToken");
    token = JSON.parse(token);
    let userSession = token && token.user ? token.user : null;
    let userId = userSession && userSession.id ? userSession.id : null;
    await servicesPage
      .coupleContact(userId, formValues)
      .then(function (response) {
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
export const coupleWeddingDetails = async (formValues, setErrors, navigate) => {
  if (customValidator.validateCoupleWeddingDetails(formValues, setErrors)) {
    let token = localStorage.getItem("coupleToken");
    token = JSON.parse(token);
    let userSession = token && token.user ? token.user : null;
    let userId = userSession && userSession.id ? userSession.id : null;
    await servicesPage
      .coupleWeddingDetails(userId, formValues)
      .then(function (response) {
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
export const coupleSettings = async (formValues, setErrors, navigate) => {
  if (customValidator.validateCoupleSettings(formValues, setErrors)) {
    let token = localStorage.getItem("coupleToken");
    token = JSON.parse(token);
    let userSession = token && token.user ? token.user : null;
    let userId = userSession && userSession.id ? userSession.id : null;
    await servicesPage.coupleSettings(userId, formValues).then(function (response) {
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
export const coupleCategories = async (setBudget, setData, setUnpaidList) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.coupleCategories(userId).then(function (response) {
    if (response.statuscode == 200) {
      setData([]);
      setBudget(response.result.budget);
      setData(response.result);
      setUnpaidList(response.result.unpaid);
    } else {
      setData([]);
    }
  });
};
export const updateBudget = async (budget, setData, setBudget,showHideBudgetField) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  let requestData = {};
  requestData["budget"] = budget;
  await servicesPage.updateBudget(userId, requestData).then(function (response) {
      if (response.statuscode == 200) {
        setData(values => ({...values, ['budget']: response.result.budget,}))
        setBudget(Number(response.result.budget))
        showHideBudgetField()
      }
    });
};
export const addCategories = async (formValues,setErrors,setData,setBudget,setUnpaidList,handleAddClose) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.addCategories(userId, formValues).then(function (response) {
      if (response.statuscode == 200) {
        setData([]);
        setBudget(response.result.budget);
        setData(response.result);
        setUnpaidList(response.result.unpaid);
        handleAddClose();
      } else {
        if (response.errors) {
          setErrors(response.errors);
        } else if (response.statusmessage) {
          setErrors(response.statusmessage);
        }
      }
    });
};
export const updateBudgetCategory = async (formValues,setErrors,setData,setBudget,setUnpaidList,closeBudget) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.updateBudgetCategory(userId, formValues).then(function (response) {
      if (response.statuscode == 200) {
        setData([]);
        setBudget(response.result.budget);
        setData(response.result);
        setUnpaidList(response.result.unpaid);
        closeBudget();
      } else {
        if (response.errors) {
          setErrors(response.errors);
        } else if (response.statusmessage) {
          setErrors(response.statusmessage);
        }
      }
    });
};
export const coupleEnquiries = async (setData) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.coupleEnquiries(userId).then(function (response) {
    if (response.statuscode == 200) {
      setData(response.result);
    } else {
      setData([]);
    }
  });
};

export const fetchMarketCategory = async (setCategoryList) => {
  await servicesPage.marketCategoryjson().then(function (response) {
    if (response.statuscode == 200) {
      setCategoryList(response.result);
    }
  });
};
export const coupleBooking = async (setData, setCategoryList) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.coupleBooking(userId).then(function (response) {
    if (response.statuscode == 200) {
      setData(response.result.booking);
      setCategoryList(response.result.services);
    } else {
      setData([]);
    }
  });
};
export const autoCompleteVendorOnCategory = async (catId, setAutocompleteVendors,setVendorModal) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage
    .autoCompleteVendorOnCategory(userId, catId)
    .then(function (response) {
      if (response.statuscode == 200) {
        setAutocompleteVendors(response.result);
        setVendorModal(true);
      } else {
        setAutocompleteVendors([]);
      }
    });
};
export const addBooking = async (formValues,setErrors,setData,setOpen) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.addBooking(userId, formValues).then(function (response) {
      if (response.statuscode == 200) {
        setData([]);
        setData(response.result);
        setOpen(false);
      } else {
        if (response.errors) {
          setErrors(response.errors);
        } else if (response.statusmessage) {
          setErrors(response.statusmessage);
        }
      }
    });
};
export const coupleReview = async (activeStep,setActiveStep,formValues,setErrors,navigate) => {
  if (customValidator.validateCoupleReviews(activeStep, formValues, setErrors)) {
    if (activeStep == 4) {
      /* await servicesPage.coupleReview(formValues).then(function (response) {
        if (response.statuscode == 200) {
        } else {
          if (response.errors) {
            setErrors(response.errors);
          } else if (response.statusmessage) {
            setErrors(response.statusmessage);
          }
        }
      }); */
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }
};
export const fetchBride = async (decodeId,setFormValues,setServices) => {
  await servicesPage.vendor_services(decodeId).then(function (response) {
    if (response.statuscode === 200) {
      setFormValues((values) => ({
          ...values,
          ["bride"]: response.result.bride,
          ["email"]: response.result.email,
          ["date_of_wedding"]: response.result.date_of_wedding
        }));
        setServices(response.result.setServices);
    }
  });
};
export const fetchVServices = async (vid,setServices) => {alert(vid)
  await servicesPage.vendor_services(vid).then(function (response) {
    if (response.statuscode === 200) {
      setServices(response.result);
    }
  });
};
export const autoCompleteVendor = async (setVendorList) => {
  await servicesPage.autoCompleteVendor().then(function (response) {
    if (response.statuscode === 200) {
      const vendors = response.result.map((vendor) => ({
        value: vendor.id,
        label: vendor.name,
        phone: vendor.phone,
        email: vendor.email,
      }));
      setVendorList(vendors);
    }
  });
};
