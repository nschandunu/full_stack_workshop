import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import CreateTaskModal from "../../tasks/CreateTaskModal";
import { getColumns, createTask } from "../../../lib/dataStore";

const DashboardPage = () => {
  const { data, isLoading, error } = useDashboard();
  const [columns, setColumns] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getColumns().then(setColumns).catch(() => {});
  }, []);

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setToastMessage(`Task "${taskData.title}" created successfully!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <main className="dashboard-page">
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#111827",
            color: "#ffffff",
            padding: "12px 20px",
            border: "2px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            fontWeight: "700",
            fontSize: "14px",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span>✓ {toastMessage}</span>
          <button
            type="button"
            onClick={() => navigate("/tasks")}
            style={{
              backgroundColor: "#f5b700",
              color: "#000000",
              border: "1px solid #000000",
              padding: "4px 10px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            View Tasks →
          </button>
        </div>
      )}

      <DashboardSearch />
      <DashboardHeader
        onNewTask={() => setIsCreateOpen(true)}
        onNewProject={() => navigate("/features/projects/overview")}
      />
      <DashboardStats stats={data.stats} />
      <QuickActions onNewTask={() => setIsCreateOpen(true)} />

      <RecentProjects />
      <MyTasks />
      <UpcomingDeadlines />
      <ActivityFeed />
      <Notifications />
      <ProjectProgress />

      <CreateTaskModal
        isOpen={isCreateOpen}
        columns={columns}
        initialColumnId={columns[0]?.id || "col-todo"}
        onClose={() => setIsCreateOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </main>
  );
};

export default DashboardPage;