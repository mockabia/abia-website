import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";

export async function stateDropdown(postData) {
  return await apiService.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}
