import { useEffect, useMemo, useState } from "react";
import "./UserProfile.css";

const mockProfile = {
  name: "Lena Cross",
  username: "lena.cross",
  email: "lena@collabboard.app",
  role: "member",
  avatarUrl: "",
  memberSince: "2024-02-18",
};

const mockBoards = [
  {
    id: "board-1",
    title: "Launch Campaign",
    createdAt: "2025-01-10",
    completed: 18,
    inProgress: 5,
    blocked: 1,
    total: 24,
    colors: ["#2563eb", "#4f46e5", "#0ea5e9"],
  },
  {
    id: "board-2",
    title: "Design Toolkit",
    createdAt: "2025-05-02",
    completed: 12,
    inProgress: 6,
    blocked: 2,
    total: 20,
    colors: ["#0ea5e9", "#38bdf8", "#6366f1"],
  },
  {
    id: "board-3",
    title: "Client Sprint",
    createdAt: "2025-08-16",
    completed: 10,
    inProgress: 8,
    blocked: 0,
    total: 18,
    colors: ["#4f46e5", "#7c3aed", "#c7d2fe"],
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
    .map((part) => part[0].toUpperCase())
    .join("");

export default function UserProfile() {
  const [profile, setProfile] = useState(mockProfile);
  const [draft, setDraft] = useState(mockProfile);
  const [previewAvatar, setPreviewAvatar] = useState(mockProfile.avatarUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 2400);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const totalCompleted = useMemo(
    () => mockBoards.reduce((sum, board) => sum + board.completed, 0),
    [],
  );

  const totalTasks = useMemo(
    () => mockBoards.reduce((sum, board) => sum + board.total, 0),
    [],
  );

  const boardProgress = Math.round((totalCompleted / totalTasks) * 100);

  const openEditor = () => {
    setDraft(profile);
    setPreviewAvatar(profile.avatarUrl);
    setIsEditing(true);
  };

  const closeEditor = () => {
    setDraft(profile);
    setPreviewAvatar(profile.avatarUrl);
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
      const result = reader.result?.toString() ?? "";
      setPreviewAvatar(result);
      setDraft((current) => ({ ...current, avatarUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    setProfile((current) => ({ ...current, ...draft, avatarUrl: previewAvatar }));
    setIsEditing(false);
    setSaved(true);
  };

  return (
    <div className="profile-page">
      <header className="profile-hero">
        <div className="hero-copy">
          <p className="eyebrow">CollabBoard profile</p>
          <h1>Keep your boards in motion with a more thoughtful profile.</h1>
          <p className="hero-description">
            This dashboard blends polished identity with board pulse visuals so the profile feels like part of the collaboration workflow,
            not just an account page.
          </p>
        </div>
        <div className="hero-signature" aria-hidden="true">
          <div className="signature-ring" />
          <div className="signature-bar signature-bar--one" />
          <div className="signature-bar signature-bar--two" />
          <div className="signature-dot" />
        </div>
      </header>

      <section className="profile-card">
        <div className="profile-top">
          <div className="avatar-block">
            {previewAvatar ? (
              <img className="avatar-image" src={previewAvatar} alt={`${profile.name} avatar`} />
            ) : (
              <div className="avatar-fallback">{initialsFromName(profile.name)}</div>
            )}
          </div>
          <div className="profile-copy">
            <span className="badge">User</span>
            <h2>{profile.name}</h2>
            <p className="meta-line username">@{profile.username}</p>
            <p className="meta-line email">{profile.email}</p>
            <p className="meta-line date">Member since {formatDate(profile.memberSince)}</p>
          </div>
          <button type="button" className="button button-edit" onClick={openEditor}>
            Edit Profile
          </button>
        </div>

        <div className="profile-summary">
          <div className="summary-item">
            <p className="summary-label">Active boards</p>
            <p className="summary-value">{mockBoards.length}</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Tasks completed</p>
            <p className="summary-value">{totalCompleted}</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Completion pace</p>
            <p className="summary-value monospace">{boardProgress}%</p>
          </div>
        </div>

        <div className="progress-band" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${boardProgress}%` }} />
        </div>
      </section>

      <section className="boards-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">My Boards</p>
            <h3>Boards that carry your collaboration momentum.</h3>
          </div>
          <p className="section-copy">
            Each board includes a progress bar and task distribution so the section feels alive and useful instead of static.
          </p>
        </div>

        <div className="boards-grid">
          {mockBoards.map((board) => {
            const progress = Math.round((board.completed / board.total) * 100);
            return (
              <article key={board.id} className="board-card">
                <div className="board-title-row">
                  <div className="board-pill" style={{ backgroundColor: board.colors[0] }} />
                  <div>
                    <p className="board-title">{board.title}</p>
                    <p className="board-meta">Launched {formatDate(board.createdAt)}</p>
                  </div>
                </div>

                <div className="board-chip-row">
                  <span style={{ backgroundColor: board.colors[0] }}>Done {board.completed}</span>
                  <span style={{ backgroundColor: board.colors[1] }}>Active {board.inProgress}</span>
                  <span style={{ backgroundColor: board.colors[2] }}>Blocked {board.blocked}</span>
                </div>

                <div className="board-progress-meter">
                  <div className="meter-track">
                    <div className="meter-fill" style={{ width: `${progress}%`, background: board.colors[0] }} />
                  </div>
                  <p className="meter-label monospace">{progress}% complete</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {isEditing ? (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="edit-profile-heading">
          <div className="modal-panel">
            <div className="modal-header">
              <div>
                <p className="eyebrow">Edit profile</p>
                <h4 id="edit-profile-heading">Update your display name and email</h4>
              </div>
              <button type="button" className="close-button" onClick={closeEditor} aria-label="Close edit form">
                ×
              </button>
            </div>
            <form className="editor-form" onSubmit={saveProfile}>
              <div className="avatar-upload-row">
                <div className="avatar-preview-shell">
                  {previewAvatar ? (
                    <img className="avatar-preview" src={previewAvatar} alt="Avatar preview" />
                  ) : (
                    <div className="avatar-preview fallback">{initialsFromName(draft.name)}</div>
                  )}
                </div>
                <label className="file-input-label">
                  Choose avatar
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} />
                </label>
              </div>

              <label className="field-row">
                <span>Name</span>
                <input name="name" value={draft.name} onChange={handleChange} required />
              </label>
              <label className="field-row">
                <span>Email</span>
                <input name="email" type="email" value={draft.email} onChange={handleChange} required />
              </label>

              <div className="modal-actions">
                <button type="button" className="button button-ghost" onClick={closeEditor}>
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

      {saved ? <div className="toast">Profile saved successfully</div> : null}
    </div>
  );
}
