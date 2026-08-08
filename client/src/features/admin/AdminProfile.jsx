import { useEffect, useMemo, useState } from "react";
import "./AdminProfile.css";

const mockAdmin = {
  name: "Ava Mercer",
  username: "ava.mercer",
  email: "ava@collabboard.app",
  role: "admin",
  avatarUrl: "",
  memberSince: "2023-08-12",
};

const mockBoards = [
  {
    id: "admin-board-1",
    title: "Enterprise Migration",
    members: 14,
    completed: 21,
    inProgress: 8,
    blocked: 2,
    total: 31,
    createdAt: "2025-01-18",
    accent: "#dc2626",
  },
  {
    id: "admin-board-2",
    title: "Governance Review",
    members: 9,
    completed: 14,
    inProgress: 5,
    blocked: 1,
    total: 20,
    createdAt: "2025-04-05",
    accent: "#ef4444",
  },
  {
    id: "admin-board-3",
    title: "Roadmap Alignment",
    members: 18,
    completed: 26,
    inProgress: 9,
    blocked: 3,
    total: 38,
    createdAt: "2025-09-12",
    accent: "#f87171",
  },
];

const totalUsers = 1024;
const totalBoards = 87;

const formatDate = (dateString) =>
  new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

export default function AdminProfile() {
  const [profile, setProfile] = useState(mockAdmin);
  const [draft, setDraft] = useState(mockAdmin);
  const [avatarPreview, setAvatarPreview] = useState(mockAdmin.avatarUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 2500);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const totalTeamMembers = useMemo(
    () => mockBoards.reduce((sum, board) => sum + board.members, 0),
    [],
  );

  const coverage = useMemo(
    () => Math.round(mockBoards.reduce((sum, board) => sum + board.completed, 0) / mockBoards.reduce((sum, board) => sum + board.total, 0) * 100),
    [],
  );

  const handleOpen = () => {
    setDraft(profile);
    setAvatarPreview(profile.avatarUrl);
    setIsEditing(true);
  };

  const handleClose = () => {
    setDraft(profile);
    setAvatarPreview(profile.avatarUrl);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result?.toString() ?? "";
      setAvatarPreview(url);
      setDraft((current) => ({ ...current, avatarUrl: url }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setProfile((current) => ({ ...current, ...draft, avatarUrl: avatarPreview }));
    setIsEditing(false);
    setSaved(true);
  };

  return (
    <main className="admin-profile-page">
      <div className="admin-hero">
        <div>
          <p className="eyebrow">CollabBoard admin</p>
          <h1>Admin control with clarity and confident oversight.</h1>
          <p className="hero-copy">
            The Admin Profile blends executive metrics with board ownership details, preserving the same refined CollabBoard system language as the other profile screens.
          </p>
        </div>
        <div className="hero-mark">
          <span />
          <span />
          <span />
        </div>
      </div>

      <section className="admin-card">
        <div className="admin-top-row">
          <div className="avatar-shell">
            {avatarPreview ? (
              <img className="avatar-img" src={avatarPreview} alt={`${profile.name} avatar`} />
            ) : (
              <div className="avatar-placeholder">{initials(profile.name)}</div>
            )}
          </div>

          <div className="admin-copy">
            <span className="role-chip">Admin</span>
            <h2>{profile.name}</h2>
            <p className="meta mono">@{profile.username}</p>
            <p className="meta">{profile.email}</p>
            <p className="meta">Member since {formatDate(profile.memberSince)}</p>
          </div>

          <div className="admin-actions">
            <button type="button" className="button button-secondary" onClick={handleOpen}>
              Edit Profile
            </button>
            <button type="button" className="button button-tertiary">
              Manage Roles
            </button>
          </div>
        </div>

        <div className="admin-stats-grid">
          <article className="stat-card">
            <p className="stat-label">System users</p>
            <p className="stat-value">{totalUsers}</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">System boards</p>
            <p className="stat-value">{totalBoards}</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Team members</p>
            <p className="stat-value">{totalTeamMembers}</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Completion coverage</p>
            <p className="stat-value">{coverage}%</p>
          </article>
        </div>
      </section>

      <section className="boards-panel">
        <div className="boards-header">
          <div>
            <p className="eyebrow">Boards I Manage</p>
            <h3>Your owned collaboration spaces</h3>
          </div>
          <p className="boards-copy">
            Each board includes a quick status strip for tasks, plus the number of team members you oversee.
          </p>
        </div>

        <div className="boards-list">
          {mockBoards.map((board) => {
            const progress = Math.round((board.completed / board.total) * 100);
            return (
              <article key={board.id} className="board-card">
                <div className="board-head">
                  <div className="board-accent" style={{ backgroundColor: board.accent }} />
                  <div>
                    <h4>{board.title}</h4>
                    <p className="board-meta">Created {formatDate(board.createdAt)}</p>
                  </div>
                </div>

                <div className="board-chips">
                  <span>Members {board.members}</span>
                  <span>Done {board.completed}</span>
                  <span>Active {board.inProgress}</span>
                  <span>Blocked {board.blocked}</span>
                </div>

                <div className="board-bar" aria-hidden="true">
                  <div className="board-fill" style={{ width: `${progress}%`, backgroundColor: board.accent }} />
                </div>
                <div className="board-footer">
                  <p className="mono">{progress}% complete</p>
                  <p className="mono">{board.total} tasks</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {isEditing ? (
        <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="admin-edit-heading">
          <div className="modal-card">
            <div className="modal-top">
              <div>
                <p className="eyebrow">Edit profile</p>
                <h4 id="admin-edit-heading">Update admin details</h4>
              </div>
              <button type="button" className="close-btn" onClick={handleClose} aria-label="Close form">
                ×
              </button>
            </div>
            <form className="edit-form" onSubmit={handleSave}>
              <div className="avatar-upload-section">
                <div className="avatar-preview-shell">
                  {avatarPreview ? (
                    <img className="avatar-preview" src={avatarPreview} alt="Avatar preview" />
                  ) : (
                    <div className="avatar-preview fallback">{initials(draft.name)}</div>
                  )}
                </div>
                <label className="upload-label">
                  Upload new avatar
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>

              <label className="input-row">
                <span>Name</span>
                <input name="name" value={draft.name} onChange={handleChange} required />
              </label>
              <label className="input-row">
                <span>Email</span>
                <input name="email" type="email" value={draft.email} onChange={handleChange} required />
              </label>

              <div className="modal-actions">
                <button type="button" className="button button-ghost" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="button button-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {saved ? <div className="save-toast">Profile updated</div> : null}
    </main>
  );
}
