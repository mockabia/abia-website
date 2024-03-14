import * as apiService from "../api/apiServices";
import * as apiUrls from "../api/apiUrls";
import categories from "./json/couples-categories-edit.json";
import enquiries from "./json/enquiry_list.json";
import vendorList from "./json/vendor_categoryList.json";
import booking from "./json/booking_list.json";
import autoComplete from "./json/autoComplete_list.json";

export const MAIN_API = apiUrls.COUPLE_API;
export const CONTENTS_API = apiUrls.CONTENT_API;

export async function coupleLogin(postData) {
  return await apiService.apiCall(MAIN_API["LOGIN"], "POST", postData);
}
export async function coupleSignup(postData) {
  return await apiService.apiCall(MAIN_API["SIGNUP"], "POST", postData);
}
export async function logout() {
  return await apiService.apiCall(MAIN_API["LOGOUT"], "POST");
}
export async function refresh() {
  return await apiService.apiCall(MAIN_API["REFRESH"], "POST");
}

export async function coupleForgot(postData) {
  return await apiService.apiCall(MAIN_API["FORGOT"], "POST", postData);
}
export async function coupleDetails(id) {
  return await apiService.apiCall(MAIN_API["FETCH"] + "/" + id, "GET");
}
export async function coupleContact(id, postData) {
  return await apiService.apiCall(
    MAIN_API["CONTACT"] + "/" + id + "/4/1",
    "POST",
    postData
  );
}
export async function coupleWeddingDetails(id, postData) {
  return await apiService.apiCall(
    MAIN_API["WEDDING_DETAILS"] + "/" + id + "/5/1",
    "POST",
    postData
  );
}
export async function coupleSettings(id, postData) {
  return await apiService.apiCall(
    MAIN_API["SETTINGS"] + "/" + id + "/6/1",
    "POST",
    postData
  );
}
export async function coupleCategories(id) {
  return await apiService.apiCall(MAIN_API["VIEW_CATEGORIES"]+'/'+id, "GET");
}
export async function updateBudget(id, postData) {
  return await apiService.apiCall(MAIN_API["UPDATE_BUDGET"] + "/" + id + "/1","POST",postData);
}
export async function addCategories(id, postData) {
  return await apiService.apiCall(MAIN_API["ADD_CATEGORY"] + "/" + id + "/1","POST",postData);
}
export async function updateBudgetCategory(id, postData) {
  return await apiService.apiCall(MAIN_API["UPDATE_CATEGORY"] + "/" + id + "/3/1","POST",postData);
}


export async function addBooking(id, postData) {
  return await apiService.apiCall(MAIN_API["ADD_BOOKING"] + "/" + id,"POST",postData);
}
export async function coupleEnquiries(id) {
  return enquiries;
  //return await apiService.apiCall(MAIN_API["ENQUIRIES"]+'/'+id, "GET");
}
export async function coupleBooking(id) {
  return booking;
  //return await apiService.apiCall(MAIN_API["BOOKINGS"]+'/'+id, "GET");
}
export async function autoCompleteVendorOnCategory(id, catId) {
  return autoComplete;
  //return await apiService.apiCall(MAIN_API["AUTOCOMPLETE_VENDOR_CATEGORY"]+'/'+id+'/'+catId, "GET");
}

export async function stateDropdown(postData) {
  return await apiService.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}

export async function marketCategory(postData) {
  // return vendorList;
  return await apiService.apiCall(apiUrls.MARKETING_CATEGORY, "GET", postData);
}

// STATE + REGION
export async function stateRegionDropdwon(state) {
  return await apiService.apiCall(
    apiUrls.REGIONS_BY_STATE + "/" + state,
    "GET"
  );
}

export async function fetchBridePage(url) {
  return await apiService.apiCall(
    CONTENTS_API["LOGIN_MENU_DETAILS"] + "/wedding/" + url,
    "GET"
  );
}

// marketCategory from json
export async function marketCategoryjson() {
  return vendorList;
  // return await apiService.apiCall(apiUrls.MARKETING_CATEGORY, "GET", postData);
}

// categoryBusinessList;

// export async function coupleLogin(postData) {
//   return await apiService.apiCall(MAIN_API["LOGIN"], "POST", postData);
// }
