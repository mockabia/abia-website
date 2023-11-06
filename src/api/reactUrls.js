let businessUrls          = process.env.REACT_BUSINESS_URL ? process.env.REACT_BUSINESS_URL : `business`;
businessUrls              = '/'+ businessUrls;

export const BUSINESS_MENU = {
    "LOGIN"         :  { text: "Login", path: businessUrls + "/login",menu:false },
    "USER_STATE"    :  { text: "User state", path: businessUrls + "/user-state",menu:false },
    "DASHBOARD"     :  { text: "Home", path: businessUrls + "/home" },
    "PROFILE"       :  { text: "My Profile", path: businessUrls + "/my-profile" },
    "SETTINGS"      :  { text: "Settings", path: businessUrls + "/settings" },
};
/* export const businessMenus = [
    {
        "LOGIN" :  { text: "LOGIN", path: "/LOGIN" },
        "USER_STATE" :  { text: "USER_STATE", path: "/USER_STATE" },
        "DASHBOARD" :  { text: "DASHBOARD", path: "/DASHBOARD" },
        "SETTINGS" :  { text: "SETTINGS", path: "/SETTINGS" },
    },
    { text: "Home", path: "/home" },
    { text: "Get Reviews", path: "/get-reviews" },
    { text: "Manage Reviews", path: "/manage-review" },
    {
        text: "Showcase",
        secondaryMenu: [
          { text: "Review widget", path: "/review-widget" },
          { text: "Award badges", path: "/award-badges" },
        ],
      },
    { text: "Promotions", path: "/promotions" },
    { text: "Shop", path: "/shop" },
    { text: "Enquiries", path: "/enquiries" },
    { text: "My Profile", path: "/my-profile" },
    { text: "Settings", path: "/settings" }, 
  ];
export const BUSINESS_MENU= {
    LOGIN       : businessUrls + "/login",
    USER_STATE  : businessUrls + "/user-state",
    DASHBOARD   : businessUrls + "/home",
    SETTINGS    : businessUrls + "/settings",
    PROFILE     : businessUrls + "/my-profile",
}*/