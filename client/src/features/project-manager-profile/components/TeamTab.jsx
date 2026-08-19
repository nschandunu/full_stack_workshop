export default function TeamTab({ members }) {
  return (
    <div className="pm-tab-panel">
      <div className="pm-team-list">
        {members.map((member) => (
          <div key={member.id} className="pm-team-item">
            <div className="pm-team-avatar" aria-hidden="true">
              {member.avatarUrl ? <img src={member.avatarUrl} alt="" /> : <span>{member.name.split(" ").map((part) => part[0]).slice(0,2).join("")}</span>}
            </div>
            <div className="pm-team-details">
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
            <span className="pm-task-count">{member.tasks} tasks</span>
          </div>
        ))}
      </div>
    </div>
  );
}
