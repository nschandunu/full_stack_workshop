export default function SettingsTab({ settings, onToggleNotification, onTogglePermission, isSaving }) {
  return (
    <div className="tab-panel settings-panel">
      <div className="settings-grid">
        <div className="settings-card">
          <p className="section-label">Account</p>
          <label className="field-wrap">
            <span>Email</span>
            <input type="email" value={settings.email} readOnly />
          </label>
          <label className="field-wrap">
            <span>Password</span>
            <input type="password" value="••••••••" readOnly />
          </label>
        </div>

        <div className="settings-card">
          <p className="section-label">Notifications</p>
          <div className="toggle-list">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <label key={key} className="toggle-item">
                <span>{key}</span>
                <button
                  type="button"
                  className={`switch ${value ? "is-on" : ""}`}
                  onClick={() => onToggleNotification(key)}
                  aria-pressed={value}
                  aria-label={`Toggle ${key}`}
                  disabled={isSaving}
                >
                  <span />
                </button>
              </label>
            ))}
          </div>
        </div>

        <div className="settings-card wide">
          <p className="section-label">Role permissions</p>
          <div className="permissions-grid">
            {Object.entries(settings.permissions).map(([role, value]) => (
              <label key={role} className="permission-item">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => onTogglePermission(role)}
                  disabled={isSaving}
                />
                <span>{role}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
