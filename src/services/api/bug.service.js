import api from "./api";

const bugService = {
  /* ================= CREATE BUG ================= */
  createBug: async (bugData) => {
    const response = await api.post(
      "/admin/bug/create-bug", // ✅ correct
      bugData
    );
    return response.data;
  },

  /* ================= GET ALL BUGS ================= */
  getAllBugs: async () => {
    const response = await api.get("/admin/bug/get-all-bugs");
    return response.data;
  },

  /* ================= GET BUG BY ID ================= */
  getBugById: async (bugId) => {
    const response = await api.get(`/admin/bug/get-bug/${bugId}`);
    return response.data;
  },

  /* ================= GET BUG BY PROJECT ID =============*/


  /* ================= UPDATE BUG ================= */
  updateBug: async (bugId, updateData) => {
    const response = await api.put(
      `/admin/bugs/${bugId}`,
      updateData
    );
    return response.data;
  },

  /* ================= DELETE BUG ================= */
  deleteBug: async (bugId) => {
    const response = await api.delete(`/admin/bugs/${bugId}`);
    return response.data;
  },

  /* ================= ASSIGN BUG ================= */
  assignBug: async (bugId, userId) => {
    const response = await api.patch(
      `/admin/bugs/${bugId}/assign`,
      { userId }
    );
    return response.data;
  },

  /* ================= UPDATE BUG STATUS ================= */
  updateBugStatus: async (bugId, status) => {
    const response = await api.patch(
      `/admin/bugs/${bugId}/status`,
      { status }
    );
    return response.data;
  },

  /* ================= LINK RELATED BUGS ================= */
  linkRelatedBugs: async (bugId, relatedBugId) => {
    const response = await api.patch(
      `/admin/bugs/${bugId}/link`,
      { relatedBugId }
    );
    return response.data;
  },

  /* ================= CREATE SUB BUG ================= */
  createSubBug: async (parentBugId, subBugData) => {
    const response = await api.post(
      `/admin/bugs/${parentBugId}/sub-bug`,
      subBugData
    );
    return response.data;
  },

  /* ================= ADD BUG HISTORY ================= */
  addBugHistory: async (bugId, historyData) => {
    const response = await api.post(
      `/admin/bugs/${bugId}/history`,
      historyData
    );
    return response.data;
  },

  /* ================= GET BUG STATS ================= */
  getBugStats: async (projectId) => {
    const response = await api.get(
      `/admin/bugs/stats`,
      { params: { projectId } }
    );
    return response.data;
  },
};

export default bugService;
