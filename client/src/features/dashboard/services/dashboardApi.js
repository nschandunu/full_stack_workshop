import { dashboardData } from "../data/mockDashboardData";

const dashboardApi = {
  async getDashboard() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return dashboardData;
  },
};

export default dashboardApi;