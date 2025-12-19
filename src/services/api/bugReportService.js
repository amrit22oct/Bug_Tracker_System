import api from "./api";

const bugReportService = {
  // ✅ Use the report-bug endpoint
  getAllReports: async () => {
    const response = await api.get("/admin/report-bug/get-all");
    return response.data; // { success, count, data: [...] }
  },

  getReportById: async (reportId) => {
    const response = await api.get(`/admin/report-bug/${reportId}`);
    return response.data;
  },
};

export default bugReportService;
