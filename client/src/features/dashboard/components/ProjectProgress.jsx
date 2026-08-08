import useDashboard from "../hooks/useDashboard";

const ProjectProgress = () => {
  const { data } = useDashboard();

  if (!data) {
    return null;
  }

  return (
    <section className="project-progress">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Performance</p>
          <h2>Project Progress</h2>
        </div>
      </div>

      <div className="project-progress-list">
        {data.projects.map((project) => (
          <div className="project-progress-item" key={project.id}>
            <div className="project-progress-info">
              <div>
                <h3>{project.name}</h3>
                <p>
                  {project.completedTasks} of {project.tasks} tasks completed
                </p>
              </div>

              <strong>{project.progress}%</strong>
            </div>

            <div className="project-progress-bar">
              <div
                className="project-progress-bar__fill"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectProgress;