//const baseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : `http://127.0.0.1:8000/web/`;
const baseUrl = "https://abia.abia-test.com/web/";
//const baseUrl = "http://127.0.0.1:8000/web/";

export const CKEDITOR_IMAGE               = `${baseUrl}ckupload`;
export const JODIT_IMAGE                  = `${baseUrl}joditUpload`;
export const STATE_DROPDOWN               = `${baseUrl}WebStateDropdown`;
export const REGION_DROPDOWN              = `${baseUrl}StateVsRegionDropdown`;
export const CATEGORY_DROPDOWN_API        = `${baseUrl}WebVCategoryDropdown`;
export const CATEGORYGROUP_DROPDOWN_API   = `${baseUrl}DCategoryDropdown`;
export const BLOGCATEGORY_DROPDOWN        = `${baseUrl}blogCategoryDropdown`;
export const BLOGSUBCATEGORY_DROPDOWN     = `${baseUrl}blogSubcategoryDropdown`;
export const RSSFEED_DROPDOWN             = `${baseUrl}rssfeedDropdown`;
export const CATSETTINGS_DROPDOWN_API     = `${baseUrl}categorySettingsDropdown`;
export const ALL_STATE_REGIONS            = `${baseUrl}state-regions`;
export const REGIONS_BY_STATE             = `${baseUrl}WebStateVsRegionDropdown`;
export const CONTENT_DROPDOWN             = `${baseUrl}ContentDropdown`;
export const ACCREDITATION_DROPDOWN       = `${baseUrl}AccreditationDropdown`;
export const FINDUS_DROPDOWN              = `${baseUrl}WebFindUsDropdown`;
export const SERVICEYEAR_DROPDOWN         = `${baseUrl}WebServiceperyearDropdown`;
export const FILTER_DROPDOWN_API          = `${baseUrl}filterDropdown`;
export const EVENTS_DROPDOWN              = `${baseUrl}eventsDropdown`;
export const NATIONALEVENTS_DROPDOWN      = `${baseUrl}nationaleventsDropdown`;
export const BLOGVENDORS_DROPDOWN         = `${baseUrl}blogVendorsDropdown`;
export const INCLUSIONS_DROPDOWN          = `${baseUrl}InclusionsDropdown`;
export const VENDOR_DROPDOWN              = `${baseUrl}BusinessDropdown`;

export const STATE_VS_REGION_API = `${baseUrl}WebStateVsRegionDropdown/ACT`;

export const BUSINESS_API = {
      "SEARCH": `${baseUrl}search-business`,
      "STORE": `${baseUrl}WebBusinessStore`,
      "EDIT": `${baseUrl}edit-business`,
      "SHOW": `${baseUrl}WebBusinessVendor/9`,
      "UPDATE": `${baseUrl}WebBusinessStore`,
      "DELETE": `${baseUrl}delete-business`,
      "UPDATES": `${baseUrl}update-businessFields`,
      "LOGIN": `${baseUrl}WebBusinessLogin`,
      "FORGOT": `${baseUrl}WebBusinessForgot`,
      "LOGOUT": `${baseUrl}business-logout`,
      "REFRESH": `${baseUrl}business-refresh`,
      "SETTINGS1": `${baseUrl}WebBusinessSettings/{id}/1`,
      "SETTINGS2": `${baseUrl}WebBusinessSettings/{id}/2`,
      "SETTINGS3": `${baseUrl}WebBusinessSettings/{id}/3`,
      "SETTINGS4": `${baseUrl}WebBusinessSettings/{id}/4`,
      "SETTINGS5": `${baseUrl}WebBusinessSettings/{id}/5`,
};