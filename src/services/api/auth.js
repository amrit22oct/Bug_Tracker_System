import api from "./api";
import Cookies from "js-cookie";

const appPrefix = "bt_";

const authService = {
  login: async ({ loginId, password }) => {
    try {
      const response = await api.post("/auth/login", { loginId, password });
      const { user, token } = response.data.data;

      Cookies.set(`${appPrefix}userId`, user._id, { expires: 1 });
      Cookies.set(`${appPrefix}username`, user.username, { expires: 1 });
      Cookies.set(`${appPrefix}accessToken`, token, { expires: 1 });
      Cookies.set(`${appPrefix}role`, user.role || "Developer", { expires: 1 });

      return { user, token };
    } catch (error) {
      // only throw, do not alert here
      throw error;
    }
  },

  logout: () => {
    Cookies.remove(`${appPrefix}userId`);
    Cookies.remove(`${appPrefix}username`);
    Cookies.remove(`${appPrefix}accessToken`);
    Cookies.remove(`${appPrefix}role`);
    localStorage.removeItem("isLoggedIn");
  },

  getCurrentUser: () => ({
    userId: Cookies.get(`${appPrefix}userId`),
    username: Cookies.get(`${appPrefix}username`),
    role: Cookies.get(`${appPrefix}role`) || "Developer",
  }),
};

export default authService;
