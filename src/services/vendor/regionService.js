import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";

export async function listData(postData) {
  return await apiService.apiCall(apiUrls.REGION_FETCH_API, "GET", postData);
}
