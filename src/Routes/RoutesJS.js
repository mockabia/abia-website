
import * as servicesPage from "../services/contentServices";
/* public routes */


export const fetchContentRoutes = async (setRoutesFromApi) => {
    await servicesPage.fetchContentRoutes().then(function (response) {
        if (response.statuscode == 200) {
            setRoutesFromApi(response.result);
        }
        //fetchPreContentRoutes(setRoutesFromApi);
    });
};
export const fetchPreContentRoutes = async (setRoutesFromApi) => {
    await servicesPage.fetchPreContentRoutes().then(function (response) {
        if (response.statuscode == 200) {
            setRoutesFromApi((oldArray) => [...oldArray, response.result]);
        }
        fetchSupplierContentRoutes(setRoutesFromApi);
    });
};
export const fetchSupplierContentRoutes = async (setRoutesFromApi) => {
    await servicesPage.fetchSupplierContentRoutes().then(function (response) {
        if (response.statuscode == 200) {
            setRoutesFromApi((oldArray) => [...oldArray, response.result]);
        }
        fetchBrideContentRoutes(setRoutesFromApi);
    });
};
export const fetchBrideContentRoutes = async (setRoutesFromApi) => {
    await servicesPage.fetchBrideContentRoutes().then(function (response) {
        if (response.statuscode == 200) {
            setRoutesFromApi((oldArray) => [...oldArray, response.result]);
        }
        fetchBlogCatsRoutes(setRoutesFromApi);
    });
};
export const fetchBlogCatsRoutes = async (setRoutesFromApi) => {
    await servicesPage.fetchBlogCatsRoutes().then(function (response) {
        if (response.statuscode == 200) {
            setRoutesFromApi((oldArray) => [...oldArray, response.result]);
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
/* export const fetchVendorLoginRoutes = async (setLoginMenu) => {
    await servicesPage.fetchVendorLoginRoutes().then(function (response) {
        if (response.statuscode == 200) {
            console.log(response.result[0].Sub_content)
            let login = response.result[0].Sub_content.filter((subs) => {
                return subs.id == '2';
            });
            window.VLOGIN = process.env.REACT_APP_BUSINESS_URL + '/' + login[0].url;
            let loginState = response.result[0].Sub_content.filter((subs) => {
                return subs.id == '7';
            });
            window.VLOGIN_STATE = process.env.REACT_APP_BUSINESS_URL + '/' + loginState[0].url;
            let signup = response.result[0].Sub_content.filter((subs) => {
                return subs.id == '1';
            });
            window.VSIGNUP = process.env.REACT_APP_BUSINESS_URL + '/' + signup[0].url;
            setLoginMenu(response.result[0].Sub_content);
        }
    });
};
export const fetchVendorLoginedRoutes = async (setLoginedMenu,setBusinessMenu, setShowLoader) => {
    await servicesPage.fetchVendorLoginedRoutes().then(function (response) {
        if (response.statuscode == 200) {
            let dashboard = response.result[0].Sub_content.filter((subs) => {
                return subs.id == '3';
            });
            window.VDASHBOARD = process.env.REACT_APP_BUSINESS_URL + '/' + dashboard[0].url;
            setLoginedMenu(response.result[0].Sub_content);
        }
        fetchVendorDashboardRoutes(setBusinessMenu, setShowLoader);
    });
}; */
export const fetchVendorDashboardRoutes = async (setBusinessMenu, setShowLoader) => {
    await servicesPage.fetchVendorDashboardRoutes().then(function (response) {
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
/* export const fetchCoupleLoginRoutes = async (setLoginMenu) => {
    await servicesPage.fetchCoupleLoginRoutes().then(function (response) {
        if (response.statuscode == 200) {
            console.log(response.result[0].Sub_content)
            let login = response.result[0].Sub_content.filter((subs) => {
                return subs.id == '2';
            });
            window.CLOGIN = process.env.REACT_APP_COUPLE_URL + '/' + login[0].url;
            let signup = response.result[0].Sub_content.filter((subs) => {
                return subs.id == '1';
            });
            window.CSIGNUP = process.env.REACT_APP_COUPLE_URL + '/' + signup[0].url;
            setLoginMenu(response.result[0].Sub_content);
        }
    });
};
export const fetchCoupleLoginedRoutes = async (setLoginedMenu,setCoupleMenu, setShowLoader) => {
    await servicesPage.fetchCoupleLoginedRoutes().then(function (response) {
        if (response.statuscode == 200) {
            let dashboard = response.result[0].Sub_content.filter((subs) => {
                return subs.id == '3';
            });
            window.CDASHBOARD = process.env.REACT_APP_COUPLE_URL + '/' + dashboard[0].url;
            setLoginedMenu(response.result[0].Sub_content);
        }
        fetchCoupleDashboardRoutes(setCoupleMenu, setShowLoader);
    });
}; */
export const fetchCoupleDashboardRoutes = async (setCoupleMenu, setShowLoader) => {
    await servicesPage.fetchCoupleDashboardRoutes().then(function (response) {
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