import { useEffect, useState } from "react";
import dashboardApi from "../services/dashboardApi";

const useDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true);

        const result = await dashboardApi.getDashboard();

        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
};

export default useDashboard;