const baseUrl = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : `https://abia.abia-test.com/web/`;
// const baseUrl = "https://abia.abia-test.com/web/";
//const baseUrl = "http://127.0.0.1:8000/web/";

export const CKEDITOR_IMAGE = `${baseUrl}ckupload`;
export const JODIT_IMAGE = `${baseUrl}joditUpload`;
export const STATE_DROPDOWN = `${baseUrl}WebStateDropdown`;
export const REGION_DROPDOWN = `${baseUrl}StateVsRegionDropdown`;
export const CATEGORY_DROPDOWN_API = `${baseUrl}WebVCategoryDropdown`;
export const CATEGORYGROUP_DROPDOWN_API = `${baseUrl}DCategoryDropdown`;
export const BLOGCATEGORY_DROPDOWN = `${baseUrl}blogCategoryDropdown`;
export const BLOGSUBCATEGORY_DROPDOWN = `${baseUrl}blogSubcategoryDropdown`;
export const RSSFEED_DROPDOWN = `${baseUrl}rssfeedDropdown`;
export const CATSETTINGS_DROPDOWN_API = `${baseUrl}categorySettingsDropdown`;
export const ALL_STATE_REGIONS = `${baseUrl}state-regions`;
export const REGIONS_BY_STATE = `${baseUrl}WebStateVsRegionDropdown`;
export const CONTENT_DROPDOWN = `${baseUrl}ContentDropdown`;
export const ACCREDITATION_DROPDOWN = `${baseUrl}AccreditationDropdown`;
export const FINDUS_DROPDOWN = `${baseUrl}WebFindUsDropdown`;
export const SERVICEYEAR_DROPDOWN = `${baseUrl}WebServiceperyearDropdown`;
export const FILTER_DROPDOWN_API = `${baseUrl}filterDropdown`;
export const EVENTS_DROPDOWN = `${baseUrl}eventsDropdown`;
export const NATIONALEVENTS_DROPDOWN = `${baseUrl}nationaleventsDropdown`;
export const BLOGVENDORS_DROPDOWN = `${baseUrl}blogVendorsDropdown`;
export const INCLUSIONS_DROPDOWN = `${baseUrl}InclusionsDropdown`;
export const VENDOR_DROPDOWN = `https://abia.abia-test.com/api/BusinessDropdown`;
export const STATE_VS_REGION_API = `${baseUrl}WebStateVsRegionDropdown`;
export const ADDITIONAL_CATEGORY_DROPDOWN = `${baseUrl}WebAdditionalVCategoryDropdown`;
export const MARKETING_CATEGORY = `${baseUrl}MarketingCategoryDropdown`;

export const CONTENT_API = {
  HEADER_MENUS: `${baseUrl}WebCommonHeaderMenu`,
  FOOTER_MENUS: `${baseUrl}WebCommonFooterMenu`,
  CONTENT_DETAILS: `${baseUrl}Page_ContentDetails`,
  BLOG: `${baseUrl}page_BlogsubcategorVsBlog`,
  BLOG_DETAIL: `${baseUrl}View_BlogRecord`,
  LOGIN_MENU_DETAILS: `${baseUrl}Page_LoginMenuDetails`,
};
export const ROUTES_API = {
  PUBLIC_ROUTES: `${baseUrl}PublicGeneralForRoutes`,
  BLOG_ROUTES: `${baseUrl}BlogVsCatVsSubForRoutes`,
  BUSINESS_ROUTES: `${baseUrl}VendorDashboardMenu`,
  COUPLE_ROUTES: `${baseUrl}BrideDashboardMenu`,
};

export const BUSINESS_API = {
  SEARCH: `${baseUrl}search-business`,
  STORE: `${baseUrl}WebBusinessStore`,
  EDIT: `${baseUrl}WebBusinessVendor`,
  SHOW: `${baseUrl}WebBusinessVendor`,
  UPDATE: `${baseUrl}WebBusinessStore`,
  DELETE: `${baseUrl}delete-business`,
  UPDATES: `${baseUrl}update-businessFields`,
  LOGIN: `${baseUrl}WebBusinessLogin`,
  LOGIN_STATE: `${baseUrl}WebBusinessStateLogin`,
  FORGOT: `${baseUrl}WebBusinessForgot`,
  LOGOUT: `${baseUrl}WebBusinessLogout`,
  REFRESH: `${baseUrl}business-refresh`,
  SETTINGS: `${baseUrl}WebBusinessSettings`,
  SETTINGS1: `${baseUrl}WebBusinessSettings/{id}/1`,
  SETTINGS2: `${baseUrl}WebBusinessSettings/{id}/2`,
  SETTINGS3: `${baseUrl}WebBusinessSettings/{id}/3`,
  SETTINGS4: `${baseUrl}WebBusinessSettings/{id}/4`,
  SETTINGS5: `${baseUrl}WebBusinessSettings/{id}/5`,
  SETTING6: `${baseUrl}WebBusinessSettings/{id}/6`,  // subscription
  MANAGE_WEDDING: `${baseUrl}WebManageWedding`,
  BUSINESSDESC: `${baseUrl}ManageprofileSettings`, // update
  BUSINESSDESCVIEW: `${baseUrl}Webview_VendorDescription`,
  VIEWPROFILESETTINGS: `${baseUrl}Webview_ProfileSettings`,
  VIEW_GALLERY: `${baseUrl}WebView_vendorPhotoGallery`, // to web  - Edit
  DELETE_GALLERY: `${baseUrl}Webdelete_vendorPhotoGallery`, //delete
  DELETE_VIDEO: `${baseUrl}Webdelete_vendorVideoGallery`,
  VIEW_VIDEO: `${baseUrl}WebView_vendorVideoGallery`,
  DELETE_PACKAGE: `${baseUrl}WebdeletePackage`,
  DELETE_QA: `${baseUrl}Webdelete_QuestionAnsRecord`,
  VIEW_QA: `${baseUrl}WebView_QuestionAnsRecord`,
  BUSINESSSERVICES_DROPDOWN: `${baseUrl}WebBusinessServicesDropdown`,
};

export const COUPLE_API = {
  SIGNUP: `${baseUrl}WebManageWedding/0/3/1`,
  LOGIN: `${baseUrl}WebWeddingLogin`,
  FORGOT: `${baseUrl}WebCoupleForgot`,
  LOGOUT: `${baseUrl}WebWeddingLogout`,
  REFRESH: `${baseUrl}couple-refresh`,
  FETCH: `${baseUrl}WebWeddingBridal`,
  CONTACT: `${baseUrl}WebManageWedding`,
  WEDDING_DETAILS: `${baseUrl}WebManageWedding`,
  SETTINGS: `${baseUrl}WebManageWedding`,

  VIEW_CATEGORIES : `${baseUrl}view_Selcategories`,
  UPDATE_BUDGET   : `${baseUrl}Webaddupd_mybudget`,
  ADD_CATEGORY    : `${baseUrl}Webadd_coupleCategories`,
  UPDATE_CATEGORY : `${baseUrl}Webupdate_CategoryBudget`,

  ENQUIRIES: `${baseUrl}ManageEnquiries`,
  BOOKINGS: `${baseUrl}ManageBookings`,
  AUTOCOMPLETE_VENDOR_CATEGORY: `${baseUrl}autocompleteVendorCategory`,
  ADD_BOOKING: `${baseUrl}add_booking`,
};
export const PUBLIC_API = {
  DIRECTORY_DROPDOWN      : `${baseUrl}DirectorySearchDropdown`,
  VENDOR_CATEGORY_DROPDOWN: `${baseUrl}Services_State`,
  DIRECTORY_LIST          : `${baseUrl}DirectoryList`,
  SAVE_FAVOURITE          : `${baseUrl}saveFavourite`,
  SAVE_ENQUIRY            : `${baseUrl}saveEnquiry`,
};
export const STRIPE_API = {
  ADD_AMOUNT: `${baseUrl}Stripe_adminPayment`,
};
