import * as apiServices from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";
export const MAIN_API       = apiUrls.BUSINESS_API;

export async function stateDropdown(postData) {
  return await apiServices.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}

export async function categoryDropdwon(postData) {
  return await apiServices.apiCall(apiUrls.CATEGORY_DROPDOWN_API, "GET", postData);
}

export async function bookingsPerYearDropdown(postData) {
  return await apiServices.apiCall(
    apiUrls.SERVICEYEAR_DROPDOWN,
    "GET",
    postData
  );
}
export async function findUsDropdown(postData) {
  return await apiServices.apiCall(apiUrls.FINDUS_DROPDOWN, "GET", postData);
}

export async function businessStoreData(postData) {
  return await apiServices.apiCall(MAIN_API['STORE'], "POST", postData);
}
