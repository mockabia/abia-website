import * as apiService from "../api/apiServices";
import * as apiUrls from "../api/apiUrls";

export const MAIN_API = apiUrls.CONTENT_API;

export async function fetchMenu() {
  return await apiService.apiCall(MAIN_API["HEADER_MENUS"], "GET");
}
export async function fetchContentDetails(url) {
  return await apiService.apiCall(MAIN_API["CONTENT_DETAILS"] + "/" + url, "GET");
}
export async function fetchFooterMenus() {
  return await apiService.apiCall(MAIN_API["FOOTER_MENUS"], "GET");
}