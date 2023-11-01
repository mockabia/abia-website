import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";

export async function listData(postData) {
  return await apiService.apiCall(apiUrls.REGION_FETCH_API, "GET", postData);
}

export async function businessData(postData) {
  return await apiService.apiCall(apiUrls.BUSINESS_VENDOR, "GET", postData);
}

export async function settingStoreData(postData) {
  return await apiService.apiCall(apiUrls.BUSINESS_SETTINGS1, "POST", postData);
}
