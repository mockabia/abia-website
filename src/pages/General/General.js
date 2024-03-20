import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/generalServices";
import * as customValidator from "../Plugins/publicValidator";
import * as customJS from "../../plugins/custom/custom";
export { customJS };

function urlFoundCategoryDirectory(url, serviceOptions) {
  let categoryFound = serviceOptions.filter(function (el) {
    console.log(el.value + "==" + url);
    return el.value === url;
  });
  return categoryFound;
}
function urlFoundLocationDirectory(url, serviceOptions) {
  let locationFound = serviceOptions.filter(function (el) {
    console.log(el.regionsUrl + "==" + url);
    return el.regionsUrl === url;
  });
  return locationFound;
}
function checkDirectoryUrl(
  pathname,
  serviceOptions,
  formattedLocations,
  setFormvalues
) {
  let urlArray = pathname.split("/");
  urlArray = urlArray.filter(function (el) {
    return el != "";
  });
  if (urlArray.length == 3) {
    setFormvalues((values) => ({
      ...values,
      ["category"]: urlArray[0],
      ["state"]: urlArray[1],
      ["locations"]: urlArray[2],
    }));
  } else {
    if (urlArray.length == 2) {
      let url1 = urlArray[0];
      let url2 = urlArray[1];
      //let foundCategory   = urlFoundCategoryDirectory(url1,serviceOptions)
      let foundLocations = urlFoundLocationDirectory(url2, formattedLocations);
      if (foundLocations.length > 0) {
        setFormvalues((values) => ({
          ...values,
          ["locations"]: url2,
          ["state"]: url1,
          ["category"]: "",
        }));
      } else {
        setFormvalues((values) => ({
          ...values,
          ["state"]: url2,
          ["category"]: url1,
          ["locations"]: "",
        }));
      }
    } else {
      let url1 = urlArray[0];
      let foundCategory = urlFoundCategoryDirectory(url1, serviceOptions);
      if (foundCategory.length > 0) {
        setFormvalues((values) => ({
          ...values,
          ["category"]: url1,
          ["state"]: "",
          ["locations"]: "",
        }));
      } else {
        setFormvalues((values) => ({
          ...values,
          ["state"]: url1,
          ["category"]: "",
          ["locations"]: "",
        }));
      }
    }
  }
  setFormvalues((values) => ({ ...values, ["sort"]: "N" }));
}
export const fetchState = async (setStateOptions) => {
  await servicesPage.stateDropdown().then(function (response) {
    if (response.statuscode === 200) {
      setStateOptions(response.result);
    }
  });
};
export const fetchDirectoryDropdowns = async (
  setServicesOptions,
  setLocationOptions,
  setStateOptions,
  pathname,
  setFormvalues
) => {
  await servicesPage.fetchDirectoryDropdowns().then(function (response) {
    if (response.statuscode === 200) {
      let serviceOptions = response.result.services;
      setServicesOptions(serviceOptions);
      const formattedLocations = response.result.states.flatMap((location) =>
        location.regions.map((regions) => ({
          id: location.id,
          state: location.label,
          url: location.url,
          regions: regions.label,
          regionsUrl: regions.url,
        }))
      );
      const formattedStates = response.result.states.map((state) => ({
        id: state.id,
        state: state.state,
        url: state.url,
      }));
      setLocationOptions(formattedLocations);
      setStateOptions(formattedStates);
      checkDirectoryUrl(
        pathname,
        serviceOptions,
        formattedLocations,
        setFormvalues
      );
    }
  });
};
export const fetchVendorCategory = async (vid, setServicesOptions) => {
  await servicesPage.fetchVendorCategory(vid).then(function (response) {
    if (response.statuscode === 200) {
      setServicesOptions(response.result);
    }
  });
};

export const handleChange = (e, setInputs, setInputsErrors) => {
  const name = e.target.name;
  const value = e.target.value;
  setInputs((values) => ({ ...values, [name]: value }));
  setInputsErrors({});
};
export const fetchDirectoryList = async (formValues, setData) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : 0;
  await servicesPage
    .fetchDirectoryList(userId, formValues)
    .then(function (response) {
      if (response.statuscode === 200) {
        setData(response.result);
      }
    });
};
export const saveFavourite = async (formValues, setErrors, setOpen) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : 0;
  if (customValidator.validateSaveFavourite(formValues, setErrors)) {
    await servicesPage
      .saveFavourite(userId, formValues)
      .then(function (response) {
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
export const saveEnquiry = async (formValues, setErrors, setOpen) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : 0;
  let validate =
    userId > 0
      ? customValidator.validateCoupleSaveEnquiry(formValues, setErrors)
      : customValidator.validateSaveEnquiry(formValues, setErrors);
  if (validate) {
    await servicesPage
      .saveEnquiry(userId, formValues)
      .then(function (response) {
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
export const fetchPayment = async (setPaysettings) => {
  let token = localStorage.getItem("vendorToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : 0;
  await servicesPage.paySettings(userId).then(function (response) {
    if (response.statuscode === 200) {
      setPaysettings(response.result);
    }
  });
};
export const fetchBusinessFromDecodeId = async (decodeId,setFormvalues) => {
  /* setFormvalues((values) => ({ ...values,['ftype']: "1",['stype']: "1", ['vid']: "101", ['holdername']: "test ", ['email']: "test@test.com", 
    ['contact_person']: "test contact" ,['phone']: "634634636",
    ['state']: "QLD"})); */
  await servicesPage.businessFromDecodeId(decodeId).then(function (response) {
    if (response.statuscode === 200) {
      setFormvalues((values) => ({ ...values, ['ftype']: response.result.ftype,['stype']: response.result.stype, ['vid']: response.result.vid, ['holdername']: response.result.name, ['email']: response.result.email, 
    ['contact_person']: response.result.contact_person ,['phone']: response.result.phone,
    ['state']: response.result.state }));
    }
  });
};

export const businessProfile = async (setVendorData) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.businessProfileView(userId).then(function (response) {
    if (response.statuscode == 200) {
      console.log("Business data;", response.result)
      setVendorData(response.result);
    } else {
      setVendorData([]);
    }
  });
};
