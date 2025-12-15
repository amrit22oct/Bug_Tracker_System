import api from "./api";

const authService = {
  getLogin: (data) => api.post("/auth/login", data),
};

export default authService;
