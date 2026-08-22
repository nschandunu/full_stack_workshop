export default function ActivityTab({ activities }) {
  return (
    <div className="tab-panel activity-panel">
      <div className="list-card">
        {activities.length === 0 ? (
          <div className="empty-state">No recent activity.</div>
        ) : (
          activities.map((item) => (
            <div key={item.id} className="activity-item">
              <div className={`activity-dot tone-${item.type}`} aria-hidden="true" />
              <div>
                <p className="activity-title">{item.title}</p>
                <p className="activity-meta">{item.user} • {item.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
