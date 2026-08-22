const DashboardSkeleton = () => {
  return (
    <main className="dashboard-page">
      <div className="skeleton skeleton-header" />

      <div className="dashboard-stats">
        {[1, 2, 3, 4].map((item) => (
          <div className="stat-card skeleton-card" key={item}>
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-value" />
          </div>
        ))}
      </div>

      <div className="skeleton skeleton-table" />
    </main>
  );
};

export default DashboardSkeleton;