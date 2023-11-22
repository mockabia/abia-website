import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/vendor/businessServices";
import * as customValidator from "../Plugins/customValidator";

export const logout = async (navigate) => {
  await servicesPage.logout().then(function (response) {
    if (response) {
      if (response.statuscode == 200) {
        apiService.setAuthToken(null);
        localStorage.removeItem("vendorToken");
        localStorage.removeItem("user");
        navigate(reactUrls.BUSINESS_MENU["LOGIN"].path);
      }
    }
  });
};

export const fetchbusiness = async (setInputs, setDataSet) => {
  let token = localStorage.getItem("vendorToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.editData(userId).then(function (response) {
    if (response.statuscode == 200) {
      setInputs(response.result);

      setDataSet(true);
    }
  });
};


export const handleChange = (e, setInputs, setInputsErrors) => {
  const name = e.target.name;
  const value = e.target.value;
  setInputs((values) => ({ ...values, [name]: value }));
  setInputsErrors({});
};

export const fetchState = async (setStateOptions) => {
  await servicesPage.stateDropdown().then(function (response) {
    if (response.statuscode === 200) {
      setStateOptions(response.result);
    }
  });
};

export const fetchCategory = async (setCategoryOption) => {
  await servicesPage.categoryDropdown().then(function (response) {
    if (response.statuscode === 200) {
      setCategoryOption(response.result);
    }
  });
};
// addtional category
export const fetchAddCategory = async (ids, setAddCategoryOption) => {
  await servicesPage.addCategoryDropdown(ids).then(function (response) {
    if (response.statuscode === 200) {
      setAddCategoryOption(response.result);
    }
  });
};

// state + region
export const fetchRegion = async (selectedStates, setRegions) => {
  await servicesPage
    .stateRegionDropdwon(selectedStates)
    .then(function (response) {
      if (response.statuscode === 200) {
        setRegions(response.result);
      }
    });
};
// BUSINESS SETTINGS
export const updateBusiness = async (settings, formValues, setInputsErrors) => {
  await servicesPage
    .update_settings(settings, formValues)
    .then(function (response) {
      if (response.statuscode == 200) {
      } else {
        if (response.errors) {
          setInputsErrors(response.errors);
        } else if (response.statusmessage) {
          setInputsErrors(response.statusmessage);
        }
      }
    });
};

// GET REVIEWS/MANAGE WEDDING
export const updateManageWedding = async (options, formValues, setInputsErrors) => {
  await servicesPage
    .manage_wedding(options, formValues)
    .then(function (response) {
      if (response.statuscode == 200) {
      } else {
        if (response.errors) {
          setInputsErrors(response.errors);
        } else if (response.statusmessage) {
          setInputsErrors(response.statusmessage);
        }
      }
    });
};