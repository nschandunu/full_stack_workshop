import { useState } from "react";

export default function InviteUserModal({ isOpen, onClose, onSubmit, roles }) {
  const [form, setForm] = useState({ name: "", email: "", role: roles[0] || "Admin" });

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      department: "Operations",
      status: "Active",
    });
    setForm({ name: "", email: "", role: roles[0] || "Admin" });
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="invite-title">
      <div className="modal-card small">
        <div className="modal-header">
          <div>
            <p className="section-label">TEAM ACTION</p>
            <h3 id="invite-title">Invite user</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close invite modal">
            ×
          </button>
        </div>

        <form onSubmit={submit} className="invite-form">
          <label className="field-wrap">
            <span>Name</span>
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label className="field-wrap">
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label className="field-wrap">
            <span>Role</span>
            <select name="role" value={form.role} onChange={handleChange}>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              Send invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
