import axios from "axios";
import * as loginServices from "../services/vendor/businessServices";
import * as reactUrls from "../api/reactUrls";

//import {store} from '../appState/store';
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};
//export async function apiCall(url, method, data, userId = null) {
export async function apiCall(url, method, data) {
  let vtoken = localStorage.getItem("vendorToken");
  let ctoken = localStorage.getItem("coupleToken");
  let token = null;
  if (vtoken !== undefined && vtoken !== "undefined" && vtoken !== null) {
    token = localStorage.getItem("vendorToken");
  } else if (
    ctoken !== undefined &&
    ctoken !== "undefined" &&
    ctoken !== null
  ) {
    token = localStorage.getItem("coupleToken");
  }
  if (token !== undefined && token !== "undefined") {
    token = JSON.parse(token);
    let userSession = token && token.user ? token.user : null;
    let userId = userSession && userSession.id ? userSession.id : null;
    let abiaType =
      userId && userId != null ? localStorage.getItem("abiaType") : null;
    let accessToken = userSession && token ? token.access_token : null;
    let headers = {
      "Content-Type": "application/json",
      api_key: process.env.REACT_APP_API_KEY,
      authorization: `Bearer ${accessToken}`,
    };
    if (userId && abiaType == "V") {
      let memberType  = userSession.temp_member;
      let memberClass = memberType=='1' ? 'V' : 'N';
      headers = {
        "Content-Type": "application/json",
        api_key: process.env.REACT_APP_API_KEY,
        authorization: `Bearer ${accessToken}`,
        "X-Request-ID": userId,
        "X-Request-Class": memberClass,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        api_key: process.env.REACT_APP_API_KEY,
        authorization: `Bearer ${accessToken}`,
        "X-Request-ID": userId,
        "X-Request-Class": userId!=null ? 'C' : null,
      };
    }
    // console.log(headers);
    try {
      const response = await axios({
        url,
        method,
        params: method === "GET" && data ? data : {},
        data,
        headers,
      });
      return response.data;
    } catch (err) {
      // console.log(err);

      if (err.response.statuscode == 401) {
        if (vtoken !== undefined && vtoken !== "undefined" && vtoken !== null) {
          refreshVendorToken();
        } else if (
          ctoken !== undefined &&
          ctoken !== "undefined" &&
          ctoken !== null
        ) {
          refreshCoupleToken();
        }
      } else if (
        err.response.data.message == "Token has expired" ||
        err.response.data.message ==
          "Token could not be parsed from the request."
      ) {
        if (vtoken !== undefined && vtoken !== "undefined" && vtoken !== null) {
          if (
            localStorage.vusername &&
            localStorage.vusername !== "" &&
            localStorage.vpassword &&
            localStorage.vpassword !== ""
          ) {
            refreshVendorToken();
          } else {
            setAuthToken(null);
            localStorage.removeItem("vendorToken");
            localStorage.removeItem("user");
            window.location = window.HOME;
          }
        } else if (
          ctoken !== undefined &&
          ctoken !== "undefined" &&
          ctoken !== null
        ) {
          if (
            localStorage.cusername &&
            localStorage.cusername !== "" &&
            localStorage.cpassword &&
            localStorage.cpassword !== ""
          ) {
            refreshCoupleToken();
          } else {
            setAuthToken(null);
            localStorage.removeItem("coupleToken");
            localStorage.removeItem("user");
            window.location = window.HOME;
          }
        }
      }
    }
  } else {
    setAuthToken(null);
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vuser");
    window.location = window.HOME;
  }
}

export async function refreshVendorToken() {
  var requestData = {
    username: localStorage.vusername,
    password: localStorage.vpassword,
    remember_me: localStorage.vremember_me,
  };
  await loginServices.login(requestData).then(function (response) {
    if (response.statuscode == 401) {
      setAuthToken(null);
      localStorage.removeItem("vendorToken");
      localStorage.removeItem("vuser");
      window.location = window.HOME;
    } else {
      const token = response.token;
      localStorage.setItem("vendorToken", JSON.stringify(token));
      let expiresInMS = token.expires_in;
      let currentTime = new Date();
      let expireTime = new Date(currentTime.getTime() + expiresInMS);
      localStorage.setItem("vexpireTime", expireTime);
      localStorage.removeItem("vusername");
      localStorage.removeItem("vpassword");
      localStorage.removeItem("vremember_me");
      if (requestData.remember_me && requestData.remember_me !== "") {
        localStorage.vusername = requestData.username;
        localStorage.vpassword = requestData.password;
        localStorage.vremember_me = requestData.remember_me;
      }
      setAuthToken(token);
    }
  });
}
export async function refreshCoupleToken() {
  var requestData = {
    username: localStorage.cusername,
    password: localStorage.cpassword,
    remember_me: localStorage.cremember_me,
  };
  await loginServices.login(requestData).then(function (response) {
    if (response.statuscode == 401) {
      setAuthToken(null);
      localStorage.removeItem("coupleToken");
      localStorage.removeItem("cuser");
      window.location = window.HOME;
    } else {
      const token = response.token;
      localStorage.setItem("coupleToken", JSON.stringify(token));
      let expiresInMS = token.expires_in;
      let currentTime = new Date();
      let expireTime = new Date(currentTime.getTime() + expiresInMS);
      localStorage.setItem("cexpireTime", expireTime);
      localStorage.removeItem("cusername");
      localStorage.removeItem("cpassword");
      localStorage.removeItem("cremember_me");
      if (requestData.remember_me && requestData.remember_me !== "") {
        localStorage.cusername = requestData.username;
        localStorage.cpassword = requestData.password;
        localStorage.cremember_me = requestData.remember_me;
      }
      setAuthToken(token);
    }
  });
}
export async function imageUploadApi(url, method, data, userId = null) {
  const userData = null;
  let userSession = userData ? userData : null;
  // let accessToken = (userSession.user && userSession.user.accessToken) ? userSession.user.accessToken  : null;
  let accessToken = null;
  const headers = userId
    ? {
        "Content-Type": "multipart/form-data",
        api_key: process.env.REACT_APP_API_KEY,
        authorization: `Bearer ${accessToken}`,
        "X-UID-PLAYLIST": userId,
      }
    : {
        "Content-Type": "multipart/form-data",
        api_key: process.env.REACT_APP_API_KEY,
        authorization: `Bearer ${accessToken}`,
      };
  const response = await axios({
    url,
    method,
    data,
    headers,
  });
  return response.data;
}
