import useDashboard from "../hooks/useDashboard";

const MyTasks = () => {
  const { data } = useDashboard();

  if (!data) {
    return null;
  }

  return (
    <section className="my-tasks">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Tasks</p>
          <h2>My Tasks</h2>
        </div>

        <button type="button" className="section-action">
          View All
        </button>
      </div>

      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Project</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.tasks.map((task) => (
              <tr key={task.id}>
                <td className="task-name">{task.title}</td>

                <td>{task.project}</td>

                <td>{task.dueDate}</td>

                <td>
                  <span
                    className={`priority-badge priority-${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge status-${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyTasks;