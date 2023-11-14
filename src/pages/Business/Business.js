import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/vendor/businessServices";
import * as customValidator from "../Plugins/customValidator";

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

export const updateBusiness = async (settings, formValues, setInputsErrors) => {
  await servicesPage
    .update_settings(settings, formValues)
    .then(function (response) {
      if (response.statuscode == 200) {
        console.log("Success:", response);
      } else {
        if (response.errors) {
          setInputsErrors(response.errors);
          // console.log("Business Errors:", response.errors)
        } else if (response.statusmessage) {
          setInputsErrors(response.statusmessage);
        }
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

export const fetchRegion = async (setPrimaryLocation) => {
  await servicesPage.stateRegionDropdwon().then(function (response) {
    if (response.statuscode === 200) {
      setPrimaryLocation(response.result);
      console.log("Primary location:", response.result)
    }
  });
};