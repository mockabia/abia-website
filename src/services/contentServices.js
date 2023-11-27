import * as apiService from "../api/apiServices";
import * as apiUrls from "../api/apiUrls";

export const MAIN_API   = apiUrls.CONTENT_API;
export const ROUTES_API = apiUrls.ROUTES_API;


export async function fetchContentRoutes() {
  return await apiService.apiCall(ROUTES_API["PUBLIC_ROUTES"], "GET");
}
export async function fetchBlogRoutes() {
  return await apiService.apiCall(ROUTES_API["BLOG_ROUTES"], "GET");
}
export async function fetchBusinessRoutes() {
  return await apiService.apiCall(ROUTES_API["BUSINESS_ROUTES"], "GET");
}
export async function fetchCoupleRoutes() {
  return await apiService.apiCall(ROUTES_API["COUPLE_ROUTES"], "GET");
}


export async function fetchHeaderMenus() {
  return await apiService.apiCall(MAIN_API["HEADER_MENUS"], "GET");
}
export async function fetchFooterMenus() {
  return await apiService.apiCall(MAIN_API["FOOTER_MENUS"], "GET");
}
export async function fetchContentDetails(url) {
  return await apiService.apiCall(MAIN_API["CONTENT_DETAILS"] + "/" + url, "GET");
}
export async function fetchBlogs(url) {
  return await apiService.apiCall(MAIN_API["BLOG"] + "/" + url, "GET");
}
export async function fetchBlogDetail(url) {
  return await apiService.apiCall(MAIN_API["BLOG_DETAIL"] + "/" + url, "GET");
}