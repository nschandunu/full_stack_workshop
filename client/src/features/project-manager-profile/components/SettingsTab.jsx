export default function SettingsTab({ settings, onToggleNotification }) {
  return (
    <div className="pm-tab-panel">
      <div className="pm-settings-grid">
        <div className="pm-settings-card">
          <p className="pm-section-label">Account</p>
          <label className="pm-field-group">
            <span className="pm-field-label">Email</span>
            <input type="email" value={settings.email} readOnly className="pm-input" />
          </label>
          <label className="pm-field-group">
            <span className="pm-field-label">Password</span>
            <input type="password" value={settings.password} readOnly className="pm-input" />
          </label>
        </div>

        <div className="pm-settings-card">
          <p className="pm-section-label">Notifications</p>
          <div className="pm-toggle-list">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <label key={key} className="pm-toggle-item">
                <span>{key}</span>
                <button
                  type="button"
                  className={`pm-switch ${value ? "is-on" : ""}`}
                  onClick={() => onToggleNotification(key)}
                  aria-pressed={value}
                  aria-label={`Toggle ${key}`}
                >
                  <span />
                </button>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
