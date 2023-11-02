import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";
export const MAIN_API       = apiUrls.BUSINESS_API;

export async function listData(postData) {
  return await apiService.apiCall(apiUrls.REGION_DROPDOWN, "GET", postData);
}

export async function businessData(postData) {
  return await apiService.apiCall(MAIN_API['SHOW'], "GET", postData);
  //return await apiService.apiCall(MAIN_API['SHOW']+ "/" + id, "GET");
}

export async function settingStoreData(postData) {
  return await apiService.apiCall(MAIN_API['SETTINGS1'], "POST", postData);
}
