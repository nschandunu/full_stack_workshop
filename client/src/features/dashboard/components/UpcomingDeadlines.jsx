import useDashboard from "../hooks/useDashboard";

const UpcomingDeadlines = () => {
  const { data } = useDashboard();

  if (!data) {
    return null;
  }

  return (
    <section className="upcoming-deadlines">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Schedule</p>
          <h2>Upcoming Deadlines</h2>
        </div>

        <button type="button" className="section-action">
          View Calendar
        </button>
      </div>

      <div className="deadline-list">
        {data.tasks.map((task) => (
          <div className="deadline-item" key={task.id}>
            <div className="deadline-date">
              <span>Due</span>
              <strong>{task.dueDate}</strong>
            </div>

            <div className="deadline-info">
              <h3>{task.title}</h3>
              <p>{task.project}</p>
            </div>

            <span
              className={`priority-badge priority-${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingDeadlines;