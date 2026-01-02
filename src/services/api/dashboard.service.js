import api from "./api";

const dashboardService = {
   /* ================ Get Admin Dashboard Detais =================*/
   getAdminDashboard: async () => {
      const response = await api.get("/admin/dashboard/get-dashboard-details")

      return response.data;
   }
}
export default dashboardService;