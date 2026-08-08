import useDashboard from "../hooks/useDashboard";

const RecentProjects = () => {
  const { data } = useDashboard();

  if (!data) {
    return null;
  }

  return (
    <section className="recent-projects">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Projects</p>
          <h2>Recent Projects</h2>
        </div>

        <button type="button" className="section-action">
          View All
        </button>
      </div>

      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Owner</th>
              <th>Tasks</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>

          <tbody>
            {data.projects.map((project) => (
              <tr key={project.id}>
                <td className="project-name">{project.name}</td>

                <td>{project.owner}</td>

                <td>
                  {project.completedTasks}/{project.tasks}
                </td>

                <td>
                  <span
                    className={`status-badge status-${project.status.toLowerCase()}`}
                  >
                    {project.status}
                  </span>
                </td>

                <td>
                  <div className="progress-cell">
                    <div className="progress-bar">
                      <div
                        className="progress-bar__fill"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>

                    <span>{project.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentProjects;