export default function UserTable({ users, onEditRole, onToggleStatus, onRemove }) {
  return (
    <div className="user-table-wrap">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="user-cell">
                <div className="user-avatar" aria-hidden="true">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" />
                  ) : (
                    <span>{user.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                  )}
                </div>
                <div>
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
              </td>
              <td>{user.role}</td>
              <td>{user.department}</td>
              <td>
                <span className={`status-badge ${user.status === "Active" ? "is-active" : "is-inactive"}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <div className="row-actions">
                  <button type="button" className="mini-btn" onClick={() => onEditRole(user)}>
                    Edit role
                  </button>
                  <button type="button" className="mini-btn" onClick={() => onToggleStatus(user.id)}>
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <button type="button" className="mini-btn danger" onClick={() => onRemove(user.id)}>
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
