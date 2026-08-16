export default function ActivityTab({ activity }) {
  return (
    <div className="pm-tab-panel">
      <div className="pm-activity-list">
        {activity.map((item) => (
          <div key={item.id} className="pm-activity-item">
            <span className={`pm-activity-dot tone-${item.type}`} aria-hidden="true" />
            <div>
              <p className="pm-activity-title">{item.title}</p>
              <p className="pm-activity-detail">{item.detail}</p>
              <p className="pm-activity-time">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
