import axios from "axios";
import * as apiService from "../api/apiServices";
import * as apiUrls from "../api/apiUrls";
import categories from "./json/couples-categories-edit.json";
import enquiries from "./json/enquiry_list.json";
import vendorList from "./json/vendor_categoryList.json";

export const MAIN_API = apiUrls.COUPLE_API;
export const CONTENTS_API = apiUrls.CONTENT_API;

export async function coupleLogin(postData) {
  return await apiService.apiCall(MAIN_API["LOGIN"], "POST", postData);
}
export async function coupleSignup(postData) {
  return await apiService.apiCall(MAIN_API["SIGNUP"], "POST", postData);
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
export async function coupleDetails(id) {
  return await apiService.apiCall(MAIN_API["FETCH"] + "/" + id, "GET");
}
export async function coupleContact(id, postData) {
  return await apiService.apiCall(
    MAIN_API["CONTACT"] + "/" + id + "/4/1",
    "POST",
    postData
  );
}
export async function coupleWeddingDetails(id, postData) {
  return await apiService.apiCall(
    MAIN_API["WEDDING_DETAILS"] + "/" + id + "/5/1",
    "POST",
    postData
  );
}
export async function coupleSettings(id, postData) {
  return await apiService.apiCall(
    MAIN_API["SETTINGS"] + "/" + id + "/6/1",
    "POST",
    postData
  );
}
export async function coupleCategories(id) {
  return categories;
  //return await apiService.apiCall(MAIN_API["CATEGORIES"]+'/'+id, "GET");
}
export async function updateBudget(id, postData) {
  return await apiService.apiCall(
    MAIN_API["UPDATE_BUDGET"] + "/" + id + "/1/1",
    "POST",
    postData
  );
}
export async function addCategories(id, postData) {
  return await apiService.apiCall(
    MAIN_API["ADD_CATEGORIES"] + "/" + id + "/2/1",
    "POST",
    postData
  );
}
export async function updateBudgetCategory(id, postData) {
  return await apiService.apiCall(
    MAIN_API["UPDATE_CATEGORIES"] + "/" + id + "/3/1",
    "POST",
    postData
  );
}

export async function coupleEnquiries(id) {
  return enquiries;
  //return await apiService.apiCall(MAIN_API["ENQUIRIES"]+'/'+id, "GET");
}

export async function stateDropdown(postData) {
  return await apiService.apiCall(apiUrls.STATE_DROPDOWN, "GET", postData);
}

export async function marketCategory(postData) {
  // return vendorList;
  return await apiService.apiCall(apiUrls.MARKETING_CATEGORY, "GET", postData);
}

// STATE + REGION
export async function stateRegionDropdwon(state) {
  return await apiService.apiCall(
    apiUrls.REGIONS_BY_STATE + "/" + state,
    "GET"
  );
}

export async function fetchBridePage(url) {
  return await apiService.apiCall(
    CONTENTS_API["LOGIN_MENU_DETAILS"] + "/wedding/" + url,
    "GET"
  );
}

// marketCategory from json
export async function marketCategoryjson() {
  return vendorList;
  // return await apiService.apiCall(apiUrls.MARKETING_CATEGORY, "GET", postData);
}

export async function updateBookedStatus(categoryId, businessId) {
  try {
    // Fetch the category in the vendorList
    const response = await axios.get("/vendorList"); // Assuming your endpoint is /vendorList
    // Find the category in the fetched data
    const category = response.data.result.find((cat) => cat.id === categoryId);
    // Find the business within the category
    const business = category.businesses.find((bus) => bus.id === businessId);
    // Update the booked status to 1
    if (business) {
      business.booked = "1";
    }
    // Send a POST request to update the data
    await axios.post("/updateVendorList", response.data); // Assuming your endpoint is /updateVendorList
    console.log("Booked status updated successfully.");
  } catch (error) {
    console.error("Error updating booked status:", error.message);
  }
}

// export async function coupleLogin(postData) {
//   return await apiService.apiCall(MAIN_API["LOGIN"], "POST", postData);
// }
