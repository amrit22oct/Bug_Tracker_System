import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // make sure this is correct
  timeout: 10000,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("bt_accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;

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
    const appPrefix = "bt_";

    if (error.response?.status === 401) {
      // Clear cookies & localStorage
      Cookies.remove(`${appPrefix}userId`);
      Cookies.remove(`${appPrefix}username`);
      Cookies.remove(`${appPrefix}accessToken`);
      Cookies.remove(`${appPrefix}role`);
      localStorage.removeItem("isLoggedIn");

      // Redirect to login, NO toast here
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    }

    // Pass error to component
    return Promise.reject(error);
  }
);

export default api;
