import api from "./api";

const teamService = {
  /* ================= CREATE TEAM ================= */
  createTeam: async (teamData) => {
    const response = await api.post(
      "/admin/team/create-team",
      teamData
    );
    return response.data;
  },

  /* ================= GET ALL TEAMS ================= */
  getAllTeams: async () => {
    const response = await api.get(
      "/admin/team/get-all-team"
    );
    return response.data;
  },

  /* ================= GET TEAM BY ID ================= */
  getTeamById: async (teamId) => {
    const response = await api.get(
      `/admin/team/get-team/${teamId}`
    );
    return response.data;
  },

  /* ================= ASSIGN PROJECT TO TEAM ================= */
  assignProjectToTeam: async (teamId, projectId) => {
    const response = await api.put(
      `/admin/team/assign-project/${teamId}`,
      { projectId }
    );
    return response.data;
  },
};

export default teamService;
