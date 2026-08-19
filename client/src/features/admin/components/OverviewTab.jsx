export default function OverviewTab({ stats, profile }) {
  const cards = [
    {
      label: "Total users",
      value: stats.totalUsers,
      tone: "neutral",
    },
    {
      label: "Total projects",
      value: stats.totalProjects,
      tone: "accent",
    },
    {
      label: "Total tasks",
      value: stats.totalTasks,
      tone: "neutral",
    },
    {
      label: "Active vs inactive",
      value: `${stats.activeUsers} / ${stats.inactiveUsers}`,
      tone: "soft",
    },
  ];

  return (
    <div className="tab-panel overview-panel">
      <div className="stat-grid">
        {cards.map((card) => (
          <article key={card.label} className={`stat-card tone-${card.tone}`}>
            <p className="stat-label">{card.label}</p>
            <p className="stat-value">{card.value}</p>
          </article>
        ))}
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <p className="section-label">Admin snapshot</p>
          <h3>{profile.name}</h3>
          <ul>
            <li>{profile.jobTitle}</li>
            <li>{profile.department}</li>
            <li>{profile.timezone}</li>
          </ul>
        </article>

        <article className="summary-card">
          <p className="section-label">Operational health</p>
          <div className="health-row">
            <span>Platform uptime</span>
            <strong>99.98%</strong>
          </div>
          <div className="health-row">
            <span>Open escalations</span>
            <strong>03</strong>
          </div>
          <div className="health-row">
            <span>Pending reviews</span>
            <strong>12</strong>
          </div>
        </article>
      </div>
    </div>
  );
}
