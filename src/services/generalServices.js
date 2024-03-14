import * as apiService from "../api/apiServices";
import * as apiUrls from "../api/apiUrls";
import category_stateDropdown from "./json/category_stateDropdown.json";
import vendor_category from "./json/vendor_category.json";
import directoryList from "./json/directoryList.json";


export const MAIN_API = apiUrls.PUBLIC_API;

export async function marketCategory(postData) {
    // return vendorList;
    return await apiService.apiCall(apiUrls.MARKETING_CATEGORY, "GET", postData);
}
export async function stateDropdown(postData) {
    return await apiService.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}
export async function fetchDirectoryDropdowns(postData) {
     return await apiService.apiCall(MAIN_API["DIRECTORY_DROPDOWN"], "GET", postData);
}
export async function fetchVendorCategory(postData) {
     return vendor_category;
    //return await apiService.apiCall(MAIN_API["VENDOR_CATEGORY_DROPDOWN"], "GET", postData);
}
export async function fetchDirectoryList(id,postData) {
    return await apiService.apiCall(MAIN_API["DIRECTORY_LIST"] + "/" + id , "POST", postData);
}
export async function saveFavourite(id,postData) {
    return await apiService.apiCall(MAIN_API["SAVE_FAVOURITE"] + "/" + id ,"POST",postData)
}
export async function saveEnquiry(id,postData) {
    return await apiService.apiCall(MAIN_API["SAVE_ENQUIRY"] + "/" + id ,"POST",postData)
}