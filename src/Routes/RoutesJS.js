import * as servicesPage from "../services/contentServices";
/* public routes */

export const fetchContentRoutes = async (setPublicMenu, setBlogMenu) => {
  await servicesPage.fetchContentRoutes().then(function (response) {
    if (response.statuscode == 200) {
      setPublicMenu(response.result);
    }
    fetchBlogRoutes(setBlogMenu);
  });
};
export const fetchBlogRoutes = async (setBlogMenu) => {
  await servicesPage.fetchBlogRoutes().then(function (response) {
    if (response.statuscode == 200) {
      //setRoutesFromApi((oldArray) => [...oldArray, response.result]);
      setBlogMenu(response.result);
    }
  });
};

/* business routes */
export const fetchBusinessRoutes = async (setBusinessMenu, setShowLoader) => {
  await servicesPage.fetchBusinessRoutes().then(function (response) {
    if (response.statuscode == 200) {
      //alert();console.log(response.result)
      setBusinessMenu(response.result);
      console.log("Business menus :", response.result);
      const loginMenu = response.result.filter((menus) => {
        return menus.id == "1";
      });
      const dashboardMenu = response.result.filter((menus) => {
        return menus.id == "4";
      });
      const associateMenu = response.result.filter((menus) => {
        return menus.id == "3";
      });
      let signup = loginMenu[0].Sub_content.filter((subs) => {
        return subs.id == "1";
      });
      window.VSIGNUP = process.env.REACT_APP_BUSINESS_URL + "/" + signup[0].url;

      let login = loginMenu[0].Sub_content.filter((subs) => {
        return subs.id == "2";
      });
      window.VLOGIN = process.env.REACT_APP_BUSINESS_URL + "/" + login[0].url;

      let loginState = loginMenu[0].Sub_content.filter((subs) => {
        return subs.id == "7";
      });
      window.VLOGIN_STATE =
        process.env.REACT_APP_BUSINESS_URL + "/" + loginState[0].url;

      window.VDASHBOARD =
        process.env.REACT_APP_BUSINESS_URL + "/" + dashboardMenu[0].url;

      let pastWedding = associateMenu[0].Sub_content.filter((subs) => {
        return subs.id == "5";
      });
      let futureWedding = associateMenu[0].Sub_content.filter((subs) => {
        return subs.id == "6";
      });
      let upgradeNow = associateMenu[0].Sub_content.filter((subs) => {
        return subs.id == "10";
      });
      let payment = associateMenu[0].Sub_content.filter((subs) => {
        return subs.id == "11";
      });

      window.VPAST =
        process.env.REACT_APP_BUSINESS_URL + "/" + pastWedding[0].url;
      window.VFUTURE =
        process.env.REACT_APP_BUSINESS_URL + "/" + futureWedding[0].url;
      window.UPGRADE =
        process.env.REACT_APP_BUSINESS_URL + "/" + upgradeNow[0].url;

      window.PAY = process.env.REACT_APP_BUSINESS_URL + "/" + payment[0].url;
      setShowLoader(false);
    }
  });
};

export function hasVendorJWT() {
  let flag = false;
  //check user has JWT token
  localStorage.getItem("vendorToken") ? (flag = true) : (flag = false);
  return flag;
}
export function hasCoupleJWT() {
  let flag = false;
  //check user has JWT token
  localStorage.getItem("coupleToken") ? (flag = true) : (flag = false);
  return flag;
}

/* couple routes */
export const fetchCoupleRoutes = async (setCoupleMenu, setShowLoader) => {
  await servicesPage.fetchCoupleRoutes().then(function (response) {
    if (response.statuscode == 200) {
      setCoupleMenu(response.result);
      const loginMenu = response.result.filter((menus) => {
        return menus.id == "1";
      });
      const dashboardMenu = response.result.filter((menus) => {
        return menus.id == "4";
      });
      let signup = loginMenu[0].Sub_content.filter((subs) => {
        return subs.id == "1";
      });
      let login = loginMenu[0].Sub_content.filter((subs) => {
        return subs.id == "2";
      });
      
      const associateMenu = response.result.filter((menus) => {
        return menus.id == "3";
      });
      let thankyou = associateMenu[0].Sub_content.filter((subs) => {
        return subs.id == "5";
      });
      
      window.CSIGNUP = process.env.REACT_APP_COUPLE_URL + "/" + signup[0].url;
      window.CLOGIN = process.env.REACT_APP_COUPLE_URL + "/" + login[0].url;
      window.CDASHBOARD =
        process.env.REACT_APP_COUPLE_URL + "/" + dashboardMenu[0].url;
      window.CTHANKYOU =
        process.env.REACT_APP_COUPLE_URL + "/" + thankyou[0].url;

      setShowLoader(false);
    }
  });
};
