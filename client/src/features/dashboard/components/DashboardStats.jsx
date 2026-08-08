import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  return (
    <section className="dashboard-stats">
      <StatCard
        label="Total Projects"
        value={stats.totalProjects}
      />

      <StatCard
        label="Active Projects"
        value={stats.activeProjects}
      />

      <StatCard
        label="Completed Projects"
        value={stats.completedProjects}
      />

      <StatCard
        label="Overdue Tasks"
        value={stats.overdueTasks}
      />
    </section>
  );
};

export default DashboardStats;