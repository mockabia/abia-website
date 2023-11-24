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
  return await apiService.apiCall(ROUTES_API["PUBLIC_ROUTES"], "GET");
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
export async function fetchVendorLoginRoutes() {
  return await apiService.apiCall(ROUTES_API["BUSINESS_LOGIN_ROUTES"], "GET");
}
export async function fetchVendorLoginedRoutes() {
  return await apiService.apiCall(ROUTES_API["BUSINESS_LOGINED_ROUTES"], "GET");
}
export async function fetchVendorDashboardRoutes() {
  return await apiService.apiCall(ROUTES_API["BUSINESS_DASHBOARD_ROUTES"], "GET");
}
export async function fetchCoupleLoginRoutes() {
  return await apiService.apiCall(ROUTES_API["COUPLE_LOGIN_ROUTES"], "GET");
}
export async function fetchCoupleLoginedRoutes() {
  return await apiService.apiCall(ROUTES_API["COUPLE_LOGINED_ROUTES"], "GET");
}
export async function fetchCoupleDashboardRoutes() {
  return await apiService.apiCall(ROUTES_API["COUPLE_DASHBOARD_ROUTES"], "GET");
}