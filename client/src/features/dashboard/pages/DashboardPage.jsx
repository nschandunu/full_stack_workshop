import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import RecentProjects from "../components/RecentProjects";
import useDashboard from "../hooks/useDashboard";
import MyTasks from "../components/MyTasks";
import UpcomingDeadlines from "../components/UpcomingDeadlines";
import ActivityFeed from "../components/ActivityFeed";
import ProjectProgress from "../components/ProjectProgress";

const DashboardPage = () => {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
  <main className="dashboard-page">
    <DashboardHeader />
    <DashboardStats stats={data.stats} />

    <RecentProjects />
    <MyTasks />
    <UpcomingDeadlines />
    <ActivityFeed />
    <ProjectProgress />
  </main>
  );
};

export default DashboardPage;