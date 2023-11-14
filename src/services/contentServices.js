import * as apiService from "../api/apiServices";
import * as apiUrls from "../api/apiUrls";

export const MAIN_API   = apiUrls.CONTENT_API;
export const ROUTES_API = apiUrls.ROUTES_API;


export async function fetchHeaderMenus() {
  return await apiService.apiCall(MAIN_API["HEADER_MENUS"], "GET");
}
export async function fetchContentDetails(url) {
  return await apiService.apiCall(MAIN_API["CONTENT_DETAILS"] + "/" + url, "GET");
}
export async function fetchFooterMenus() {
  return await apiService.apiCall(MAIN_API["FOOTER_MENUS"], "GET");
}
export async function fetchContentRoutes() {
  return await apiService.apiCall(ROUTES_API["CONTENT_SUBCONTENT_ROUTES"], "GET");
}
export async function fetchPreContentRoutes() {
  return await apiService.apiCall(ROUTES_API["PRE_CONTENT_ROUTES"], "GET");
}
export async function fetchSupplierContentRoutes() {
  return await apiService.apiCall(ROUTES_API["SUPPLIER_CONTENT_ROUTES"], "GET");
}
export async function fetchBrideContentRoutes() {
  return await apiService.apiCall(ROUTES_API["BRIDE_CONTENT_ROUTES"], "GET");
}
export async function fetchBlogCatsRoutes() {
  return await apiService.apiCall(ROUTES_API["BLOGCAT_BLOGSUBCAT_ROUTES"], "GET");
}
export async function fetchBlogRoutes() {
  return await apiService.apiCall(ROUTES_API["BLOG_ROUTES"], "GET");
}