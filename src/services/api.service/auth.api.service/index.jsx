import { loginApi, registerApi, logoutApi } from "@/api/auth.api";

class AuthService {
  // LOGIN
  async login(credentials) {
    try {
      const user = await loginApi(credentials);
      return user;
    } catch (err) {
      throw err.response?.data || { message: "Login failed" };
    }
  }

  // REGISTER
  async register(data) {
    try {
      const response = await registerApi(data);
      return response;
    } catch (err) {
      throw err.response?.data || { message: "Registration failed" };
    }
  }

  // LOGOUT
  logout() {
    logoutApi();
  }

  // IS AUTHENTICATED
  isAuthenticated() {
    return Boolean(localStorage.getItem("token"));
  }

  // GET TOKEN
  getToken() {
    return localStorage.getItem("token");
  }

  // REMOVE TOKEN
  clearToken() {
    localStorage.removeItem("token");
  }
}


export default new AuthService();
