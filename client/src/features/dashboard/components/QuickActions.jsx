import { useNavigate } from "react-router-dom";

const QuickActions = ({ onNewTask }) => {
  const navigate = useNavigate();

  const handleAction = (id) => {
    if (id === "task") {
      onNewTask?.();
    } else if (id === "project") {
      navigate("/features/projects/overview");
    } else if (id === "team") {
      navigate("/profiles/admin");
    }
  };

  const actions = [
    {
      id: "project",
      label: "New Project",
      description: "Create a new project",
    },
    {
      id: "task",
      label: "New Task",
      description: "Add a task to a project",
    },
    {
      id: "team",
      label: "Add Member",
      description: "Invite someone to your team",
    },
  ];

  return (
    <section className="quick-actions">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Actions</p>
          <h2>Quick Actions</h2>
        </div>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => (
          <button
            type="button"
            className="quick-action"
            key={action.id}
            onClick={() => handleAction(action.id)}
          >
            <span className="quick-action__icon">
              +
            </span>

            <span className="quick-action__content">
              <strong>{action.label}</strong>
              <small>{action.description}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;