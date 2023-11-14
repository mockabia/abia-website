let businessUrls = process.env.REACT_BUSINESS_URL
  ? process.env.REACT_BUSINESS_URL
  : `business`;
businessUrls = "/" + businessUrls;

export const BUSINESS_MENU = {
  LOGIN: { text: "Login", path: businessUrls + "/login", menu: false },
  USER_STATE: {
    text: "User state",
    path: businessUrls + "/user-state",
    menu: false,
  },
  DASHBOARD: { text: "Home", path: businessUrls + "/home" },
  GET_REVIEWS: { text: "Get Reviews", path: businessUrls + "/get-reviews" },

  MANAGE_REVIEWS: {
    text: "Manage Reviews",
    path: businessUrls + "/manage-review",
  },
  SHOWCASE: {
    text: "Showcase",
    path: businessUrls + "/showcase",
  },

  PROMOTIONS: { text: "Promotions", path: businessUrls + "/promotions" },
  SHOP: { text: "Shop", path: businessUrls + "/shop" },
  ENQUIRIES: { text: "Enquiries", path: businessUrls + "/enquiries" },
  PROFILE: { text: "My Profile", path: businessUrls + "/my-profile" },
  SETTINGS: { text: "Settings", path: businessUrls + "/settings" },
};

// "SHOWCASE": {
//     text: "Showcase",
//     secondaryMenu: [
//       { text: "Review widget", path: "/review-widget" },
//       { text: "Award badges", path: "/award-badges" },
//     ],
//     },

// const showcaseSubmenu = [
//   { text: "Review Widget", path: businessUrls + "/showcase/review-widget" },
//   { text: "Award Badges", path: businessUrls + "/showcase/award-badges" },
// ];
// BUSINESS_MENU["SHOWCASE"] = {
//   text: "Showcase",
//   path: businessUrls + "/showcase",
//   submenu: showcaseSubmenu,
// };

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
