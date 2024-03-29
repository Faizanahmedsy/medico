import axios from "axios";

import { getItem } from "@/lib/localStorage";
import Cookies from "js-cookie";

const token = getItem("medico_access_token");

const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

// back-end deployed on http://16.16.213.22:8080/swagger/index.html
const superAxios = axios.create({
  baseURL: "https://crmwe5yxfs.ap-south-1.awsapprunner.com/api/",
  headers: {
    ...authHeaders,
    "ngrok-skip-browser-warning": "true",
  },
});

export default superAxios;
