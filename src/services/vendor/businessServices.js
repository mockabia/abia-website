import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";

export const IMAGE_FOLDER = "";
export const PREFIX = "abia_admin-";
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
  return await apiService.apiCall(
    MAIN_API["UPDATE"] + "/" + id,
    "POST",
    postData
  );
}
export async function login(postData) {
  return await apiService.apiCall(MAIN_API["LOGIN"], "POST", postData);
}
export async function loginStates(id) {
  return await apiService.apiCall(MAIN_API["LOGIN_STATE"] + "/" + id, "GET");
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
