import api from "../base.api";

// LOGIN
export const loginApi = async (credentials) => {
  const res = await api.post("/auth/login", credentials);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

// REGISTER
export const registerApi = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGOUT
export const logoutApi = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
