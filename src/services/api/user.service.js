import api from "./api";

const userService = {
  /* ================= GET ALL USERS ================= */
  getAllUsers: async () => {
    const response = await api.get(
      "/admin/user/get-all-users"
    );
    return response.data;
  },

  /* ================= GET USER BY ID ================= */
  getUserById: async (userId) => {
    const response = await api.get(
      `/admin/user/get-user/${userId}`
    );
    return response.data;
  },

  /* ================= GET USERS BY ROLE ================= */
  getUsersByRole: async (role) => {
    const response = await api.get(
      `/admin/user/get-user-by-role/${role}`
    );
    return response.data;
  },

  /* ================= GET USER PROJECTS ================= */
  getUserProjects: async (userId) => {
    const response = await api.get(
      `/admin/user/get-user-project/${userId}`
    );
    return response.data;
  },

  /* ================= GET USER TEAMS ================= */
  getUserTeams: async (userId) => {
    const response = await api.get(
      `/admin/user/get-user-team/${userId}`
    );
    return response.data;
  },

  /* ================= GET USER BUGS ================= */
  getUserBugs: async (userId) => {
    const response = await api.get(
      `/admin/user/get-user-bug/${userId}`
    );
    return response.data;
  },
};

export default userService;
