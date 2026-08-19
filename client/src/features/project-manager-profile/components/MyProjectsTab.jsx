export default function MyProjectsTab({ projects }) {
  return (
    <div className="pm-tab-panel">
      <div className="pm-project-grid">
        {projects.map((project) => (
          <article key={project.id} className="pm-project-card" tabIndex={0}>
            <div className="pm-project-card__header">
              <div>
                <p className="pm-project-status">{project.status}</p>
                <h3>{project.name}</h3>
              </div>
              <span className="pm-progress-pill">{project.progress}%</span>
            </div>

            <div className="pm-progress-bar" aria-label={`${project.name} progress`}>
              <span style={{ width: `${project.progress}%` }} />
            </div>

            <div className="pm-project-meta">
              <span>Deadline: {project.deadline}</span>
              <span>Team: {project.teamSize}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
