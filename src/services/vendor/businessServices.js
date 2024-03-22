import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";
import subscription from "../json/settings_subscription.json";

export const IMAGE_FOLDER = "";
export const PREFIX       = "abia_business-";
export const MAIN_API     = apiUrls.BUSINESS_API;
export const STRIPE_API   = apiUrls.STRIPE_API;

export async function storeData(postData) {
  return await apiService.apiCall(MAIN_API["STORE"], "POST", postData);
}
export async function editData(id) {
  return await apiService.apiCall(MAIN_API["EDIT"] + "/" + id, "GET");
}

export async function Businessservices(id) {
  return await apiService.apiCall(
    apiUrls.BUSINESS_API["BUSINESSSERVICES_DROPDOWN"] + "/" + id,
    "GET"
  );
}
export async function showData(id) {
  return await apiService.apiCall(MAIN_API["SHOW"] + "/" + id, "GET");
}
export async function updateData(id, postData) {
  return await apiService.apiCall(
    MAIN_API["UPDATE"] + "/" + id,
    "POST",
    postData
  );
}

export async function login(postData) {
  return await apiService.apiCall(MAIN_API["LOGIN"], "POST", postData);
}
export async function loginStates(postData) {
  return await apiService.apiCall(MAIN_API["LOGIN_STATE"], "POST", postData);
}
export async function logout() {
  return await apiService.apiCall(MAIN_API["LOGOUT"], "POST");
}
export async function refresh() {
  return await apiService.apiCall(MAIN_API["REFRESH"], "POST");
}

export async function forgot(postData) {
  return await apiService.apiCall(MAIN_API["FORGOT"], "POST", postData);
}

export async function update_settings(settings, postData) {
  return await apiService.apiCall(
    MAIN_API["SETTINGS"] + "/" + settings,
    "POST",
    postData
  );
}

/* export async function vendorSubscriptionDetail(id) {
  return subscription;
  //return await apiService.apiCall(MAIN_API["ENQUIRIES"]+'/'+id, "GET");
} */

export async function business_signup(postData) {
  return await apiService.apiCall(
    apiUrls.BUSINESS_API["STORE"],
    "POST",
    postData
  );
}

export async function manage_wedding(options, postData) {
  return await apiService.apiCall(
    MAIN_API["MANAGE_WEDDING"] + "/0/" + options + "/1",
    "POST",
    postData
  );
}

export async function stateDropdown(postData) {
  return await apiService.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}

export async function bookingsPerYearDropdown(postData) {
  return await apiService.apiCall(
    apiUrls.SERVICEYEAR_DROPDOWN,
    "GET",
    postData
  );
}

export async function findUsDropdown(postData) {
  return await apiService.apiCall(apiUrls.FINDUS_DROPDOWN, "GET", postData);
}

export async function categoryDropdown(postData) {
  return await apiService.apiCall(
    apiUrls.CATEGORY_DROPDOWN_API,
    "GET",
    postData
  );
}

export async function addCategoryDropdown(ids) {
  return await apiService.apiCall(
    apiUrls.ADDITIONAL_CATEGORY_DROPDOWN + "/" + ids,
    "GET"
  );
}

export async function stateRegionDropdwon(state) {
  return await apiService.apiCall(
    apiUrls.REGIONS_BY_STATE + "/" + state,
    "GET"
  );
}

// Business MyProfile
export async function businessDescriotion1(id, option, postData) {
  return await apiService.apiCall(
    MAIN_API["BUSINESSDESC"] + "/" + id + "/" + option + "/" + 1,
    "POST",
    postData
  );
}

export async function businessDescriotion_2(id, option, postData) {
  return await apiService.imageUploadApi(
    MAIN_API["BUSINESSDESC"] + "/" + id + "/" + option + "/" + 1,
    "POST",
    postData
  );
}

export async function businessViewData(id) {
  return await apiService.apiCall(
    MAIN_API["BUSINESSDESCVIEW"] + "/" + id,
    "GET"
  );
}

export async function businessViewProfileSettings(id) {
  return await apiService.apiCall(
    MAIN_API["VIEWPROFILESETTINGS"] + "/" + id,
    "GET"
  );
}

export async function view_photogallery(id) {
  return await apiService.apiCall(MAIN_API["VIEW_GALLERY"] + "/" + id, "GET");
}

export async function view_videoGallery(id) {
  return await apiService.apiCall(MAIN_API["VIEW_VIDEO"] + "/" + id, "GET");
}

export async function delete_vendorPhotoGallery(id, pid, option) {
  return await apiService.apiCall(
    MAIN_API["DELETE_GALLERY"] + "/" + id + "/" + pid + "/" + option + "/" + 1
  );
}

export async function delete_vendorVideo(id, vgid, option) {
  return await apiService.apiCall(
    MAIN_API["DELETE_VIDEO"] + "/" + id + "/" + vgid + "/" + option + "/" + 1
  );
}

export async function delete_package(id) {
  return await apiService.apiCall(
    MAIN_API["DELETE_PACKAGE"] + "/" + id + "/" + 1
  );
}

export async function delete_qandA(vendorID, qid) {
  return await apiService.apiCall(
    MAIN_API["DELETE_QA"] + "/" + vendorID + "/" + qid + "/" + 1
  );
}
// view q and a
export async function viewQandA(id) {
  return await apiService.apiCall(MAIN_API["VIEW_QA"] + "/" + id, "GET");
}

export async function vendor_services() {
  return await apiService.apiCall(apiUrls.CATEGORY_DROPDOWN_API, "GET");
}

export async function list_vendors() {
  return await apiService.apiCall(apiUrls.VENDOR_DROPDOWN, "GET");
}
export async function cancelSubscription(vid, postData) {
  return await apiService.apiCall(STRIPE_API["CANCEL_SUBSCRIPTION"] + "/" + vid,"POST",postData);
}
export async function paySettings(id) {
    return await apiService.apiCall(apiUrls.PAYSETTINGS, "GET");
}
