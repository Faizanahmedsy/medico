import axios from "axios";

import { getItem } from "@/lib/localStorage";
import Cookies from "js-cookie";

const token = getItem("medico_access_token");

// console.log("instance token", token);

// console.log("instance cookie", Cookies.get("pharmaAuth"));

const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

const superAxios = axios.create({
  baseURL:
    "https://7b94-2409-40c1-57-7e83-170-b244-17e2-4ab9.ngrok-free.app/api/",
  headers: {
    ...authHeaders,
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
