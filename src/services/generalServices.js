import * as apiService from "../api/apiServices";
import * as apiUrls from "../api/apiUrls";
import category_stateDropdown from "./json/category_stateDropdown.json";
import directoryList from "./json/directoryList.json";


export const MAIN_API = apiUrls.COUPLE_API;

export async function marketCategory(postData) {
    // return vendorList;
    return await apiService.apiCall(apiUrls.MARKETING_CATEGORY, "GET", postData);
}
export async function stateDropdown(postData) {
    return await apiService.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}
export async function fetchDirectoryDropdowns(postData) {
     return category_stateDropdown;
    //return await apiService.apiCall(MAIN_API["DIRECTORY_DROPDOWN"], "GET", postData);
}
export async function fetchVendorCategory(postData) {
     return category_stateDropdown;
    //return await apiService.apiCall(MAIN_API["DIRECTORY_DROPDOWN"], "GET", postData);
}
export async function fetchDirectoryList(postData) {
     return directoryList;
    //return await apiService.apiCall(MAIN_API["DIRECTORY_LIST"], "GET", postData);
}
export async function saveFavourite(id,postData) {
    return await apiService.apiCall(MAIN_API["SAVE_FAVOURITE"] + "/" + id ,"POST",postData)
}
export async function saveEnquiry(id,postData) {
    return await apiService.apiCall(MAIN_API["SAVE_ENQUIRY"] + "/" + id ,"POST",postData)
}