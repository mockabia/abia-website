import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/generalServices";
import * as customValidator from "../Plugins/publicValidator";
import * as customJS from "../../plugins/custom/custom";
export { customJS };

export const fetchState = async (setStateOptions) => {
  await servicesPage.stateDropdown().then(function (response) {
    if (response.statuscode === 200) {
      setStateOptions(response.result);
    }
  });
};
export const fetchDirectoryDropdowns = async (setServicesOptions,setLocationOptions,setStateOptions) => {
  await servicesPage.fetchDirectoryDropdowns().then(function (response) {
    if (response.statuscode === 200) {
      setServicesOptions(response.result.services);
      const formattedLocations1 = response.result.states.flatMap((location) =>
        location.regions.map((regions) => ({
          id: location.id,
          state: location.state,
          url: location.url,
          regions: regions.region,
          regionsUrl: regions.url,
        }))
      );
      const formattedStates = response.result.states.map((state) => ({
        id: state.id,
        state: state.state,
        url: state.url,
      }));
      setLocationOptions(formattedLocations1);
      setStateOptions(formattedStates);
    }
  });
};
export const fetchVendorCategory = async (vid,setServicesOptions) => {
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
export const fetchDirectoryList = async (formValues,setData) => {
  let token       = localStorage.getItem("coupleToken");
  token           = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId      = userSession && userSession.id ? userSession.id : 0;
  await servicesPage.fetchDirectoryList(userId,formValues).then(function (response) {
    if (response.statuscode === 200) {
      setData(response.result);
    }
  });
};
export const saveFavourite = async (formValues,setErrors,setOpen) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : 0;
  if (customValidator.validateSaveFavourite(formValues, setErrors)) {
    await servicesPage.saveFavourite(userId, formValues).then(function (response) {
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
export const saveEnquiry = async (formValues,setErrors,setOpen) => {
  let token = localStorage.getItem("coupleToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : 0;
  let validate = userId>0 ? customValidator.validateCoupleSaveEnquiry(formValues, setErrors) : customValidator.validateSaveEnquiry(formValues, setErrors);
  if (validate) {
    await servicesPage.saveEnquiry(userId, formValues).then(function (response) {
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




