export default function TeamManagementTab({
  users,
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  onInvite,
  onEditRole,
  onToggleStatus,
  onRemove,
  roleOptions,
  departments,
}) {
  return (
    <div className="tab-panel team-panel">
      <div className="toolbar-row">
        <label className="search-field">
          <span className="sr-only">Search users</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users"
            aria-label="Search users"
          />
        </label>

        <div className="filter-group">
          <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} aria-label="Filter by role">
            <option value="All">All roles</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)} aria-label="Filter by department">
            <option value="All">All departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status">
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button type="button" className="primary-btn" onClick={onInvite}>
          Invite user
        </button>
      </div>

      <UserTable
        users={users}
        onEditRole={onEditRole}
        onToggleStatus={onToggleStatus}
        onRemove={onRemove}
      />
    </div>
  );
}
