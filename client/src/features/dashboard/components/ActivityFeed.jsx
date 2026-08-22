const activities = [
  {
    id: 1,
    user: "Senuka",
    action: "created a new task",
    target: "Implement authentication",
    time: "10 minutes ago",
  },
  {
    id: 2,
    user: "Kasun",
    action: "updated project status",
    target: "Mobile Application",
    time: "1 hour ago",
  },
  {
    id: 3,
    user: "Amal",
    action: "completed a task",
    target: "Marketing Website",
    time: "3 hours ago",
  },
  {
    id: 4,
    user: "Senuka",
    action: "created a project",
    target: "Project Management Platform",
    time: "Yesterday",
  },
];

const ActivityFeed = () => {
  return (
    <section className="activity-feed">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Updates</p>
          <h2>Recent Activity</h2>
        </div>

        <button type="button" className="section-action">
          View All
        </button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div className="activity-item" key={activity.id}>
            <div className="activity-avatar">
              {activity.user.charAt(0)}
            </div>

            <div className="activity-content">
              <p>
                <strong>{activity.user}</strong>{" "}
                {activity.action}{" "}
                <strong>{activity.target}</strong>
              </p>

              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityFeed;