import { useEffect, useMemo, useState } from "react";
import "./PMProfile.css";

const mockProfile = {
  name: "Noah Sinclair",
  username: "noah.sinclair",
  email: "noah@collabboard.app",
  role: "project manager",
  avatarUrl: "",
  memberSince: "2024-06-04",
};

const mockBoards = [
  {
    id: "pm-board-1",
    title: "Sprint Planning",
    members: 12,
    completed: 18,
    inProgress: 6,
    blocked: 2,
    total: 26,
    createdAt: "2025-02-14",
    accent: "#7c3aed",
  },
  {
    id: "pm-board-2",
    title: "Release Review",
    members: 8,
    completed: 14,
    inProgress: 4,
    blocked: 3,
    total: 21,
    createdAt: "2025-05-20",
    accent: "#a855f7",
  },
  {
    id: "pm-board-3",
    title: "Feature Refinement",
    members: 10,
    completed: 10,
    inProgress: 9,
    blocked: 1,
    total: 20,
    createdAt: "2025-10-08",
    accent: "#c084fc",
  },
];

const formatDate = (dateString) =>
  new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));

const initialsFromName = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0].toUpperCase())
    .join("");

export default function PMProfile() {
  const [profile, setProfile] = useState(mockProfile);
  const [draft, setDraft] = useState(mockProfile);
  const [avatarPreview, setAvatarPreview] = useState(mockProfile.avatarUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 2400);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const totalTeamMembers = useMemo(
    () => mockBoards.reduce((sum, board) => sum + board.members, 0),
    [],
  );

  const totalCompleted = useMemo(
    () => mockBoards.reduce((sum, board) => sum + board.completed, 0),
    [],
  );

  const totalTasks = useMemo(
    () => mockBoards.reduce((sum, board) => sum + board.total, 0),
    [],
  );

  const completionRate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  const openEditor = () => {
    setDraft(profile);
    setAvatarPreview(profile.avatarUrl);
    setIsEditing(true);
  };

  const closeEditor = () => {
    setDraft(profile);
    setAvatarPreview(profile.avatarUrl);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result?.toString() ?? "";
      setAvatarPreview(src);
      setDraft((current) => ({ ...current, avatarUrl: src }));
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
    <main className="pm-profile-page">
      <section className="pm-hero">
        <div className="hero-copy">
          <p className="eyebrow">Project Manager profile</p>
          <h1>Strategic delivery with elegant visibility.</h1>
          <p className="hero-text">
            This profile brings the same CollabBoard system language as UserProfile, tuned for PM oversight with board ownership and team totals.
          </p>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="pm-card">
        <div className="pm-top-row">
          <div className="avatar-wrap">
            {avatarPreview ? (
              <img className="avatar-img" src={avatarPreview} alt={`${profile.name} avatar`} />
            ) : (
              <div className="avatar-fallback">{initialsFromName(profile.name)}</div>
            )}
          </div>
          <div className="pm-copy">
            <span className="role-chip">Project Manager</span>
            <h2>{profile.name}</h2>
            <p className="meta mono">@{profile.username}</p>
            <p className="meta">{profile.email}</p>
            <p className="meta">Member since {formatDate(profile.memberSince)}</p>
          </div>
          <button type="button" className="button button-primary" onClick={openEditor}>
            Edit Profile
          </button>
        </div>

        <div className="pm-stats-row">
          <article className="stat-card">
            <p className="stat-label">Boards I manage</p>
            <p className="stat-value">{mockBoards.length}</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Team members</p>
            <p className="stat-value">{totalTeamMembers}</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Completion rate</p>
            <p className="stat-value monospace">{completionRate}%</p>
          </article>
        </div>
      </section>

      <section className="boards-section">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Boards I Manage</p>
            <h3>Current ownership and delivery focus.</h3>
          </div>
          <p className="section-copy">
            Each board is rendered with a task status strip and member count for a dashboard-style PM view.
          </p>
        </div>

        <div className="boards-grid">
          {mockBoards.map((board) => {
            const progress = board.total > 0 ? Math.round((board.completed / board.total) * 100) : 0;
            return (
              <article key={board.id} className="board-card">
                <div className="board-header">
                  <div className="board-indicator" style={{ backgroundColor: board.accent }} />
                  <div>
                    <h4>{board.title}</h4>
                    <p className="board-meta">Created {formatDate(board.createdAt)}</p>
                  </div>
                </div>
                <div className="board-tags">
                  <span>Members {board.members}</span>
                  <span>Done {board.completed}</span>
                  <span>Active {board.inProgress}</span>
                  <span>Blocked {board.blocked}</span>
                </div>
                <div className="board-track" aria-hidden="true">
                  <div className="board-progress" style={{ width: `${progress}%`, backgroundColor: board.accent }} />
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
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="pm-edit-heading">
          <div className="modal-panel">
            <div className="modal-header">
              <div>
                <p className="eyebrow">Edit profile</p>
                <h4 id="pm-edit-heading">Update your profile details</h4>
              </div>
              <button type="button" className="close-button" onClick={closeEditor} aria-label="Close editor">
                ×
              </button>
            </div>
            <form className="edit-form" onSubmit={handleSave}>
              <div className="avatar-edit-row">
                <div className="avatar-preview-shell">
                  {avatarPreview ? (
                    <img className="avatar-preview" src={avatarPreview} alt="Avatar preview" />
                  ) : (
                    <div className="avatar-preview fallback">{initialsFromName(draft.name)}</div>
                  )}
                </div>
                <label className="file-upload-label">
                  Upload avatar
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} />
                </label>
              </div>
              <label className="input-group">
                <span>Name</span>
                <input name="name" value={draft.name} onChange={handleChange} required />
              </label>
              <label className="input-group">
                <span>Email</span>
                <input name="email" type="email" value={draft.email} onChange={handleChange} required />
              </label>
              <div className="modal-actions">
                <button type="button" className="button button-secondary" onClick={closeEditor}>
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

      {saved ? <div className="toast-notice">Profile changes saved</div> : null}
    </main>
  );
}
