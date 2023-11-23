import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";

export const MAIN_API = apiUrls.COUPLE_API;

export async function login(postData) {
  return await apiService.apiCall(MAIN_API["LOGIN"], "POST", postData);
}
export async function loginStates(postData) {
  return await apiService.apiCall(MAIN_API["LOGIN_STATE"], "POST", postData);
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
