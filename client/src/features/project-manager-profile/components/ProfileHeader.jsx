import { useState } from "react";
import AvatarUploader from "./AvatarUploader";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export default function ProfileHeader({ profile, isEditing, onEdit, onSave, onCancel, saving, onAvatarChange }) {
  const [showUploader, setShowUploader] = useState(false);

  return (
    <header className="pm-profile-header">
      <div className="pm-profile-header__content">
        <button type="button" className="pm-avatar-button" onClick={() => setShowUploader(true)} aria-label="Upload avatar">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt={`${profile.name} avatar`} className="pm-avatar-image" />
          ) : (
            <span className="pm-avatar-fallback">{initials(profile.name)}</span>
          )}
        </button>

        <div className="pm-profile-header__info">
          <div className="pm-profile-header__meta">
            <span className="pm-role-badge">Project Manager</span>
            <span className="pm-department-pill">{profile.department}</span>
          </div>
          <h1>{profile.name}</h1>
          <p className="pm-profile-title">{profile.jobTitle}</p>
          <p className="pm-profile-subtitle">@{profile.username} • Member since {profile.joinedDate}</p>
        </div>

        <div className="pm-profile-header__actions">
          {!isEditing ? (
            <button type="button" className="pm-primary-btn" onClick={onEdit}>Edit profile</button>
          ) : (
            <>
              <button type="button" className="pm-secondary-btn" onClick={onCancel} disabled={saving}>Cancel</button>
              <button type="button" className="pm-primary-btn" onClick={onSave} disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </button>
            </>
          )}
        </div>
      </div>

      {showUploader && (
        <AvatarUploader
          currentAvatar={profile.avatarUrl}
          name={profile.name}
          onAvatarChange={onAvatarChange}
          onClose={() => setShowUploader(false)}
        />
      )}
    </header>
  );
}
