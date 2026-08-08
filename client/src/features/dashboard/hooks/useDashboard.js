import { dashboardData } from "../data/mockDashboardData";

const useDashboard = () => {
  return {
    data: dashboardData,
    isLoading: false,
    error: null,
  };
};

export default useDashboard;