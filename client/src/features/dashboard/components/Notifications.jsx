import useDashboard from "../hooks/useDashboard";

const Notifications = () => {
  const { data } = useDashboard();

  if (!data) {
    return null;
  }

  return (
    <section className="notifications">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Alerts</p>
          <h2>Notifications</h2>
        </div>

        <button type="button" className="section-action">
          Mark All Read
        </button>
      </div>

      <div className="notification-list">
        {data.notifications.map((notification) => (
          <div
            className={`notification-item notification-${notification.type}`}
            key={notification.id}
          >
            <div className="notification-indicator" />

            <div className="notification-content">
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
              <span>{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notifications;