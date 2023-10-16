import * as apiServices from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";

export async function login(postData) {
  return await apiServices.apiCall(apiUrls.BUSINESS_LOGIN, "POST", postData);
}

export async function businessForgot(postData) {
  return await apiServices.apiCall(apiUrls.BUSINESS_FORGOT, "POST", postData);
}

// export async function login(postData) {
//   return await apiService.apiCall(MAIN_API["LOGIN"], "POST", postData);
// }
