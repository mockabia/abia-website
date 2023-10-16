import axios from "axios";
import * as loginServices from "../services/vendor/loginaPageServices";

//import {store} from '../appState/store';
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

export async function apiCall(url, method, data) {
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId =
    userSession && userSession.admin_id ? userSession.admin_id : null;
  let accessToken = userSession && token ? token.access_token : null;
  const headers = userId
    ? {
        "Content-Type": "application/json",
        api_key: process.env.REACT_APP_API_KEY,
        authorization: `Bearer ${accessToken}`,
        "X-UID-PLAYLIST": userId,
      }
    : {
        "Content-Type": "application/json",
        api_key: process.env.REACT_APP_API_KEY,
        authorization: `Bearer ${accessToken}`,
      };

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
    if (err.response.status == 401) {
      refreshToken();
    }
    console.error("API call error:", err);
    throw err;
  }
}
export async function refreshToken() {
  var requestData = {
    username: localStorage.username,
    password: localStorage.password,
    remember_me: localStorage.remember_me,
  };
  await loginServices.login(requestData).then(function (response) {
    if (response.statuscode == 401) {
      setAuthToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert();
      window.location = process.env.REACT_APP_URL + "/login";
    } else {
      const token = response.token;
      localStorage.setItem("token", JSON.stringify(token));
      let expiresInMS = token.expires_in;
      let currentTime = new Date();
      let expireTime = new Date(currentTime.getTime() + expiresInMS);
      localStorage.setItem("expireTime", expireTime);
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("remember_me");
      if (requestData.remember_me && requestData.remember_me !== "") {
        localStorage.username = requestData.username;
        localStorage.password = requestData.password;
        localStorage.remember_me = requestData.remember_me;
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
