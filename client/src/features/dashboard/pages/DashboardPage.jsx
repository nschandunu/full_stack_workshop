import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import RecentProjects from "../components/RecentProjects";
import useDashboard from "../hooks/useDashboard";
import MyTasks from "../components/MyTasks";
import UpcomingDeadlines from "../components/UpcomingDeadlines";
import ActivityFeed from "../components/ActivityFeed";
import ProjectProgress from "../components/ProjectProgress";
import QuickActions from "../components/QuickActions";
import Notifications from "../components/Notifications";
import DashboardSearch from "../components/DashboardSearch";
import DashboardSkeleton from "../components/DashboardSkeleton";

const DashboardPage = () => {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
  return <DashboardSkeleton />;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
  <main className="dashboard-page">
    <DashboardSearch />
    <DashboardHeader />
    <DashboardStats stats={data.stats} />
    <QuickActions />

    <RecentProjects />
    <MyTasks />
    <UpcomingDeadlines />
    <ActivityFeed />
    <Notifications />
    <ProjectProgress />
  </main>
  );
};

export default DashboardPage;