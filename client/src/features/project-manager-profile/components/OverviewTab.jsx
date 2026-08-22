export default function OverviewTab({ stats }) {
  const cards = [
    { label: "Projects managed", value: stats.projectsManaged },
    { label: "Active tasks", value: stats.activeTasks },
    { label: "Team members", value: stats.teamMembers },
    { label: "Tasks overdue", value: stats.tasksOverdue },
    { label: "Projects completed", value: stats.projectsCompleted },
  ];

  return (
    <div className="pm-tab-panel">
      <div className="pm-stat-grid">
        {cards.map((card) => (
          <article key={card.label} className="pm-stat-card">
            <p className="pm-stat-label">{card.label}</p>
            <p className="pm-stat-value">{card.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
