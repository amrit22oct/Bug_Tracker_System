import api from "./api";

const bugReportService = {

  createBugReport: async (bugReportData) => {
    const response = await api.post("/admin/report-bug/create-bug-report", bugReportData);
  },
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
