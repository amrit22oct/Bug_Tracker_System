import axios from "axios";
import Cookies from "js-cookie";
import CookieStorage from "../storage/CookiesStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("vcsg_accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      alert("Your session has expired. Please log in again.");
      CookieStorage.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
