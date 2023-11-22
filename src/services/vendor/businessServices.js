import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";

export const IMAGE_FOLDER = "";
export const PREFIX = "abia_business-";
export const MAIN_API = apiUrls.BUSINESS_API;

export async function storeData(postData) {
  return await apiService.apiCall(MAIN_API["STORE"], "POST", postData);
}
export async function editData(id) {
  return await apiService.apiCall(MAIN_API["EDIT"] + "/" + id, "GET");
}
export async function showData(id) {
  return await apiService.apiCall(MAIN_API["SHOW"] + "/" + id, "GET");
}
export async function updateData(id, postData) {
  return await apiService.apiCall(MAIN_API['UPDATE'] + "/" + id,"POST",postData);
}

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

export async function update_settings(settings, postData) {
  return await apiService.apiCall( MAIN_API["SETTINGS"] + "/" + settings,"POST",postData);
}

export async function manage_wedding(options, postData) {
  return await apiService.apiCall( MAIN_API["MANAGE_WEDDING"] + "/"+"0"+"/" + options,"POST",postData);
}


export async function stateDropdown(postData) {
  return await apiService.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}

export async function categoryDropdown(postData) {
  return await apiService.apiCall(apiUrls.CATEGORY_DROPDOWN_API, "GET", postData);
}

export async function addCategoryDropdown(ids) {
  return await apiService.apiCall(apiUrls.ADDITIONAL_CATEGORY_DROPDOWN  +'/'+ ids, "GET");
}


export async function stateRegionDropdwon(state) {
  return await apiService.apiCall(apiUrls.REGIONS_BY_STATE  +'/'+ state, "GET");
}
