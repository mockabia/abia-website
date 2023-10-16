import * as apiServices from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";

export async function stateDropdown(postData) {
  return await apiServices.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}

export async function categoryDropdwon(postData) {
  return await apiServices.apiCall(apiUrls.CATEGORY_DROPDOWN, "GET", postData);
}

export async function bookingsPerYearDropdown(postData) {
  return await apiServices.apiCall(
    apiUrls.BOOKINGSPERYEAR_DROPDOWN,
    "GET",
    postData
  );
}
export async function findUsDropdown(postData) {
  return await apiServices.apiCall(apiUrls.FINDUS_DROPDOWN, "GET", postData);
}

export async function businessStoreData(postData) {
  return await apiServices.apiCall(apiUrls.BUSINESS_STORE, "POST", postData);
}
