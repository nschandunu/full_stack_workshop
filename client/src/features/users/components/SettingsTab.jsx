import React, { useState } from "react";

/* ── Toggle switch ──────────────────────────────────────────────────────── */
function Toggle({ id, label, description, checked, onChange, disabled }) {
  return (
    <div className="st-toggle-row">
      <div className="st-toggle-info">
        <label className="st-toggle-label" htmlFor={id}>
          {label}
        </label>
        {description && <p className="st-toggle-desc">{description}</p>}
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`st-switch${checked ? " st-switch--on" : ""}${disabled ? " st-switch--disabled" : ""}`}
        aria-label={label}
      >
        <span className="st-switch-thumb" />
      </button>
    </div>
  );
}

/* ── Password sub-form ──────────────────────────────────────────────────── */
function PasswordForm({ onDone }) {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [errs, setErrs] = useState({});

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.current) e.current = "Required.";
    if (!form.next) e.next = "Required.";
    else if (form.next.length < 8) e.next = "Minimum 8 characters.";
    if (!form.confirm) e.confirm = "Required.";
    else if (form.next !== form.confirm) e.confirm = "Passwords do not match.";
    setErrs(e);
    return !Object.keys(e).length;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) {
      setForm({ current: "", next: "", confirm: "" });
      setErrs({});
      onDone?.();
    }
  };

  const fields = [
    { name: "current", label: "Current password" },
    { name: "next",    label: "New password" },
    { name: "confirm", label: "Confirm new password" },
  ];

  return (
    <form className="st-pwd-form" onSubmit={submit} noValidate>
      {fields.map(({ name, label }) => (
        <div key={name} className="ef-wrapper">
          <label className="ef-label" htmlFor={`pwd-${name}`}>{label}</label>
          <input
            id={`pwd-${name}`}
            name={name}
            type="password"
            value={form[name]}
            onChange={change}
            className={`ef-control${errs[name] ? " ef-control--error" : ""}`}
            aria-invalid={!!errs[name]}
          />
          {errs[name] && (
            <p className="ef-error" role="alert">{errs[name]}</p>
          )}
        </div>
      ))}
      <div className="st-pwd-actions">
        <button type="button" className="up-btn up-btn--ghost" onClick={onDone}>
          Cancel
        </button>
        <button type="submit" className="up-btn up-btn--primary">
          Update password
        </button>
      </div>
    </form>
  );
}

/**
 * SettingsTab – email field, change-password flow, and notification toggles.
 */
export default function SettingsTab({ settings, onChange, isReadOnly = false }) {
  const [emailErr, setEmailErr] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleEmail = (e) => {
    const val = e.target.value;
    onChange({ ...settings, email: val });
    setEmailErr(
      val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
        ? "Please enter a valid email address."
        : ""
    );
  };

  const setNotif = (key) => (val) =>
    onChange({ ...settings, notifications: { ...settings.notifications, [key]: val } });

  const notifItems = [
    { key: "emailOnAssign",  label: "Email on task assignment",    desc: "Get an email when a task is assigned to you." },
    { key: "emailOnComment", label: "Email on new comments",       desc: "Notifications when someone comments on your tasks." },
    { key: "emailOnDeadline",label: "Email before deadlines",      desc: "24-hour reminder before task due dates." },
    { key: "pushOnMention",  label: "Push notification on mention",desc: "Instant alert when you are @mentioned." },
    { key: "weeklyDigest",   label: "Weekly digest",               desc: "A summary of your week every Monday morning." },
    { key: "projectUpdates", label: "Project updates",             desc: "Stay informed about changes in your projects." },
  ];

  return (
    <section
      id="panel-settings"
      role="tabpanel"
      aria-labelledby="tab-settings"
      className="st-root"
    >
      {/* Account */}
      <div className="st-section">
        <p className="ot-section-eyebrow">Account</p>
        <h3 className="ot-section-heading">Login &amp; Security</h3>

        <div className="ef-wrapper">
          <label className="ef-label" htmlFor="settings-email">Email address</label>
          <input
            id="settings-email"
            type="email"
            value={settings.email}
            onChange={handleEmail}
            disabled={isReadOnly}
            className={`ef-control${emailErr ? " ef-control--error" : ""}`}
            aria-invalid={!!emailErr}
          />
          {emailErr && <p className="ef-error" role="alert">{emailErr}</p>}
        </div>

        {!isReadOnly && (
          <div className="st-pwd-toggle">
            <button
              className="st-link-btn"
              onClick={() => setShowPwd((p) => !p)}
              aria-expanded={showPwd}
            >
              {showPwd ? "Hide password fields" : "Change password"}
            </button>
          </div>
        )}

        {showPwd && !isReadOnly && (
          <PasswordForm onDone={() => setShowPwd(false)} />
        )}
      </div>

      {/* Notifications */}
      <div className="st-section">
        <p className="ot-section-eyebrow">Preferences</p>
        <h3 className="ot-section-heading">Notifications</h3>
        <div className="st-toggles">
          {notifItems.map(({ key, label, desc }) => (
            <Toggle
              key={key}
              id={`notif-${key}`}
              label={label}
              description={desc}
              checked={!!settings.notifications[key]}
              onChange={setNotif(key)}
              disabled={isReadOnly}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
