import axios from "axios";

import { getItem } from "@/lib/localStorage";
import Cookies from "js-cookie";

const token = getItem("customerAuthToken");

console.log("instance token", token);

console.log("instance cookie", Cookies.get("customerAuthToken"));

// const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

const superAxios = axios.create({
  baseURL:
    "https://cbee-2409-40c1-b-cea6-488f-2463-b673-5645.ngrok-free.app/api/",
  // baseURL: "https://honestly-teaching-toucan.ngrok-free.app/web/v1/api/",

  // baseURL: "https://dummyjson.com",
  // headers: {
  //   // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //   Authorization:  `Bearer ${token}`,
  //   // "Content-Type": "multipart/form-data",
  // },
  // headers: authHeaders,
  headers: {
    // ...authHeaders,
    "ngrok-skip-browser-warning": "true",
  },
});

// api.interceptors.request.use(
//   async (config) => {
//     const localeLanguage = await getCookie("NEXT_LOCALE");
//     if (config && config.headers) {
//       {
//         config.headers["languagecode"] = localeLanguage;
//       }
//     }
//     // Add languageStrictMode=true to the params
//     if (config && config.params) {
//       // config.params["languageStrictMode"] = true;
//     } else {
//       // config.params = { languageStrictMode: true };
//     }
//     const session = await getSession();
//     if (session) {
//       config.headers.Authorization = `Bearer ${session.user.accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Interceptor to handle 401 Unauthorized responses
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (typeof window !== "undefined") {
//       if (
//         window.location.pathname !== "/login" &&
//         window.location.pathname !== "/forget-password" &&
//         window.location.pathname !== "/reset-password" &&
//         error.response.status === 401
//       ) {
//         Cookies.remove("access_token");
//         window.location.href = "/";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default superAxios;
