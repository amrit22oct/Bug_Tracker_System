import api from "./api";

const projectService = {
  /* ================= CREATE PROJECT ================= */
  createProject: async (projectData) => {
    const response = await api.post("/admin/projects", projectData);
    return response.data;
  },

  /* ================= GET ALL PROJECTS ================= */
  getAllProjects: async () => {
    const response = await api.get("/admin/project/get-all-projects");
    return response.data;
  },

  /* ================= GET PROJECT BY ID ================= */
  getProjectById: async (projectId) => {
    const response = await api.get(
      `/admin/project/get-project/${projectId}`
    );
    return response.data;
  },

  /* ================= UPDATE PROJECT ================= */
  updateProject: async (projectId, updateData) => {
    const response = await api.put(
      `/admin/projects/${projectId}`,
      updateData
    );
    return response.data;
  },

  /* ================= DELETE PROJECT ================= */
  deleteProject: async (projectId) => {
    const response = await api.delete(
      `/admin/projects/${projectId}`
    );
    return response.data;
  },

  /* ================= GET PROJECT BUG STATS ================= */
  getProjectBugStats: async (projectId) => {
    const response = await api.get(
      `/admin/bugs/stats`,
      { params: { projectId } }
    );
    return response.data;
  },
};

export default projectService;
