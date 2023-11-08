import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/vendor/businessServices";
import * as customValidator from "../Plugins/customValidator";

export const fetchbusiness = async (setInputs) => {
  let token = localStorage.getItem("vendorToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;

  await servicesPage.editData(userId).then(function (response) {
    if (response.statuscode == 200) {
      setInputs(response.result);
    }
  });
};

export const updateBusiness = async (settings, inputs, setInputsErrors) => {
  let token = localStorage.getItem("vendorToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;

  await servicesPage.update_settings(userId, settings, inputs).then(function (response) {
      if (response.statuscode == 200) {
        console.log("Success:", response);
      } else {
        if (response.errors) {
          setInputsErrors(response.errors);
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
