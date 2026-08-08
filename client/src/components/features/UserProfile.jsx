import { useEffect, useMemo, useState } from "react";
import "./UserProfile.css";

const initialProfile = {
  id: "user-3",
  name: "Rhea Bennett",
  username: "rhea.bennett",
  email: "rhea@collabboard.app",
  role: "member",
  avatarUrl: "",
  memberSince: "2024-03-22",
};

const mockBoards = [
  {
    id: "board-1",
    title: "Product Launch Sprint",
    completed: 19,
    inProgress: 3,
    blocked: 2,
    total: 24,
    createdAt: "2025-02-14",
    theme: "indigo",
    columns: [
      { label: "Done", value: 19, color: "#6366f1" },
      { label: "In progress", value: 3, color: "#0ea5e9" },
      { label: "Blocked", value: 2, color: "#f97316" },
    ],
  },
  {
    id: "board-2",
    title: "Design System Board",
    completed: 12,
    inProgress: 4,
    blocked: 0,
    total: 16,
    createdAt: "2025-06-06",
    theme: "teal",
    columns: [
      { label: "Done", value: 12, color: "#14b8a6" },
      { label: "In progress", value: 4, color: "#06b6d4" },
      { label: "Blocked", value: 0, color: "#f97316" },
    ],
  },
  {
    id: "board-3",
    title: "Client Collaboration",
    completed: 6,
    inProgress: 6,
    blocked: 1,
    total: 13,
    createdAt: "2025-10-02",
    theme: "rose",
    columns: [
      { label: "Done", value: 6, color: "#fb7185" },
      { label: "In progress", value: 6, color: "#f472b6" },
      { label: "Blocked", value: 1, color: "#f97316" },
    ],
  },
];

const formatMemberSince = (isoDate) =>
  new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));

const initialsFromName = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token[0])
    .join("")
    .toUpperCase();

const boardSummary = (boards) => {
  const completed = boards.reduce((sum, board) => sum + board.completed, 0);
  const total = boards.reduce((sum, board) => sum + board.total, 0);
  return { completed, total };
};

export default function UserProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [previewUrl, setPreviewUrl] = useState(initialProfile.avatarUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 2500);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const summary = useMemo(() => boardSummary(mockBoards), []);

  const handleOpenEdit = () => {
    setDraft(profile);
    setPreviewUrl(profile.avatarUrl);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setDraft(profile);
    setPreviewUrl(profile.avatarUrl);
    setIsEditing(false);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result?.toString() ?? "");
      setDraft((current) => ({ ...current, avatarUrl: reader.result?.toString() ?? "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setProfile((current) => ({ ...current, ...draft, avatarUrl: previewUrl }));
    setIsEditing(false);
    setSaved(true);
  };

  const avatarLabel = previewUrl ? "Profile picture preview" : initialsFromName(profile.name);
  const progressPct = Math.round((summary.completed / summary.total) * 100);

  return (
    <main className="user-profile-shell">
      <section className="profile-hero" aria-labelledby="profile-heading">
        <div className="hero-copy">
          <span className="tiny-label">CollabBoard profile</span>
          <h1 id="profile-heading">A creative space for your board pulse.</h1>
          <p>
            Track the boards that matter, keep your profile polished, and see your
            task momentum at a glance.
          </p>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-grid" />
          <div className="hero-signal" />
          <div className="hero-tokens">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className="profile-card">
        <div className="profile-summary">
          <div className="avatar-stack">
            {previewUrl ? (
              <img className="profile-avatar" src={previewUrl} alt={avatarLabel} />
            ) : (
              <div className="avatar-fallback" aria-hidden="true">
                {initialsFromName(profile.name)}
              </div>
            )}
          </div>

          <div className="summary-copy">
            <div className="role-pill">User</div>
            <h2>{profile.name}</h2>
            <p className="username">@{profile.username}</p>
            <div className="contact-row">
              <span>{profile.email}</span>
              <span className="member-since">Member since {formatMemberSince(profile.memberSince)}</span>
            </div>
          </div>

          <button type="button" className="edit-button" onClick={handleOpenEdit}>
            Edit Profile
          </button>
        </div>

        <div className="profile-details">
          <div className="detail-panel">
            <div>
              <p className="detail-label">Boards in play</p>
              <p className="detail-value">{mockBoards.length}</p>
            </div>
            <div>
              <p className="detail-label">Tasks completed</p>
              <p className="detail-value">{summary.completed}</p>
            </div>
            <div>
              <p className="detail-label">Completion rate</p>
              <p className="detail-value">{progressPct}%</p>
            </div>
          </div>

          <div className="status-strip" aria-hidden="true">
            <span style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </section>

      <section className="boards-section">
        <div className="section-header">
          <div>
            <p className="tiny-label">My Boards</p>
            <h3>Active collaboration spaces</h3>
          </div>
          <p className="section-copy">
            Every board shows a quick progress snapshot so you can scan focus and momentum.
          </p>
        </div>

        <div className="board-grid">
          {mockBoards.map((board) => {
            const boardProgress = Math.round((board.completed / board.total) * 100);
            return (
              <article key={board.id} className="board-card">
                <div className="board-header">
                  <div className={`board-badge board-badge--${board.theme}`} />
                  <div>
                    <p className="board-title">{board.title}</p>
                    <p className="board-meta">Created {formatMemberSince(board.createdAt)}</p>
                  </div>
                </div>

                <div className="board-chart" aria-hidden="true">
                  {board.columns.map((column) => (
                    <span
                      key={column.label}
                      className="board-chart-segment"
                      style={{
                        width: `${Math.max((column.value / board.total) * 100, 4)}%`,
                        background: column.color,
                      }}
                    />
                  ))}
                </div>

                <div className="board-counts">
                  <span>{board.completed} done</span>
                  <span>{board.inProgress} in progress</span>
                  <span>{board.blocked} blocked</span>
                </div>

                <div className="board-progress">
                  <div className="board-progress-bar" aria-label={`${boardProgress}% completed`}>
                    <span style={{ width: `${boardProgress}%` }} />
                  </div>
                  <p className="board-progress-label">{boardProgress}% complete</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {isEditing ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
          <div className="modal-panel">
            <div className="modal-header">
              <div>
                <p className="tiny-label">Edit profile</p>
                <h4 id="edit-profile-title">Update your profile details</h4>
              </div>
              <button type="button" className="modal-close" onClick={handleCloseEdit} aria-label="Close edit profile">
                ×
              </button>
            </div>

            <form className="editor-form" onSubmit={handleSave}>
              <div className="avatar-editor">
                <div className="avatar-preview-wrapper">
                  {previewUrl ? (
                    <img className="avatar-preview" src={previewUrl} alt="Avatar preview" />
                  ) : (
                    <div className="avatar-preview fallback">{initialsFromName(draft.name)}</div>
                  )}
                </div>
                <label className="avatar-upload-label" htmlFor="avatar-upload">
                  Upload a new avatar
                  <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>

              <label className="field-label">
                Full name
                <input
                  type="text"
                  name="name"
                  value={draft.name}
                  onChange={handleFieldChange}
                  required
                  autoComplete="name"
                />
              </label>
              <label className="field-label">
                Email address
                <input
                  type="email"
                  name="email"
                  value={draft.email}
                  onChange={handleFieldChange}
                  required
                  autoComplete="email"
                />
              </label>
              <div className="modal-actions">
                <button type="button" className="button button--ghost" onClick={handleCloseEdit}>
                  Cancel
                </button>
                <button type="submit" className="button button--primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {saved ? <div className="toast-notice">Profile saved successfully</div> : null}
    </main>
  );
}
