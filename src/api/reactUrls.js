let businessUrls = process.env.REACT_APP_BUSINESS_URL
  ? process.env.REACT_APP_BUSINESS_URL
  : `business`;
businessUrls = "/" + businessUrls;

export const BUSINESS_MENU = {
  LOGIN: { text: "Login", path: businessUrls + "/login", menu: false },
};