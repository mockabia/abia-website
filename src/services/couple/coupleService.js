import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";

export const MAIN_API = apiUrls.COUPLE_API;

export async function login(postData) {
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

export async function forgot(postData) {
  return await apiService.apiCall(MAIN_API["FORGOT"], "POST", postData);
}

export async function stateDropdown(postData) {
  return await apiService.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}

export async function marketCategory(postData) {
  return await apiService.apiCall(apiUrls.MARKETING_CATEGORY, "GET", postData);
}

// STATE + REGION
export async function stateRegionDropdwon(state) {
  return await apiService.apiCall(apiUrls.REGIONS_BY_STATE  +'/'+ state, "GET");
}



// marketCategory;