
import * as servicesPage from "../services/contentServices";
/* public routes */


export const fetchContentRoutes = async (setRoutesFromApi) => {
    await servicesPage.fetchContentRoutes().then(function (response) {
        if (response.statuscode == 200) {
            setRoutesFromApi(response.result);
        }
        fetchBlogRoutes(setRoutesFromApi);
    });
};
export const fetchBlogRoutes = async (setRoutesFromApi) => {
    await servicesPage.fetchBlogRoutes().then(function (response) {
        if (response.statuscode == 200) {
            setRoutesFromApi((oldArray) => [...oldArray, response.result]);
        }
    });
};

/* business routes */
export const fetchBusinessRoutes = async (setBusinessMenu, setShowLoader) => {
    await servicesPage.fetchBusinessRoutes().then(function (response) {
        if (response.statuscode == 200) {
            setBusinessMenu(response.result);
            const loginMenu = response.result.filter(menus => {
                return menus.id == '1';
            });
            const dashboardMenu = response.result.filter(menus => {
                return menus.id == '4';
            });
            let signup = loginMenu[0].Sub_content.filter((subs) => {
                return subs.id == '1';
            });
            window.VSIGNUP = process.env.REACT_APP_BUSINESS_URL + '/' + signup[0].url;

            let login = loginMenu[0].Sub_content.filter((subs) => {
                return subs.id == '2';
            });
            window.VLOGIN = process.env.REACT_APP_BUSINESS_URL + '/' + login[0].url;

            let loginState = loginMenu[0].Sub_content.filter((subs) => {
                return subs.id == '7';
            });
            window.VLOGIN_STATE = process.env.REACT_APP_BUSINESS_URL + '/' + loginState[0].url;

            window.VDASHBOARD = process.env.REACT_APP_BUSINESS_URL + '/' + dashboardMenu[0].url;

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
            const loginMenu = response.result.filter(menus => {
                return menus.id == '1';
            });
            const dashboardMenu = response.result.filter(menus => {
                return menus.id == '4';
            });
            let signup = loginMenu[0].Sub_content.filter((subs) => {
                return subs.id == '1';
            });
            window.CSIGNUP = process.env.REACT_APP_COUPLE_URL + '/' + signup[0].url;

            let login = loginMenu[0].Sub_content.filter((subs) => {
                return subs.id == '2';
            });
            window.CLOGIN = process.env.REACT_APP_COUPLE_URL + '/' + login[0].url;

            window.CDASHBOARD = process.env.REACT_APP_COUPLE_URL + '/' + dashboardMenu[0].url;

            setShowLoader(false);
        }
    });
};