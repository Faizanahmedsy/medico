import axios from "axios";

import { getItem } from "@/lib/localStorage";
import Cookies from "js-cookie";

const token = getItem("medico_access_token");

const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

const superAxios = axios.create({
  baseURL:
    "https://e229-2409-4080-9487-a722-8088-ba8b-62bc-7344.ngrok-free.app/api/",
  headers: {
    ...authHeaders,
    "ngrok-skip-browser-warning": "true",
  },
});

export default superAxios;
