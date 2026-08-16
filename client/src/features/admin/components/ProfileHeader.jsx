import { useState } from "react";
import AvatarUploader from "./AvatarUploader";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export default function ProfileHeader({
  profile,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  saving,
  onAvatarChange,
}) {
  const [showUploader, setShowUploader] = useState(false);

  return (
    <header className="profile-header">
      <div className="profile-header__content">
        <button
          type="button"
          className="profile-avatar-button"
          onClick={() => setShowUploader(true)}
          aria-label="Upload profile avatar"
        >
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt={`${profile.name} avatar`} className="profile-avatar-image" />
          ) : (
            <span className="profile-avatar-fallback">{initials(profile.name)}</span>
          )}
        </button>

        <div className="profile-header__copy">
          <div className="profile-header__meta-row">
            <span className="role-badge">Admin</span>
            <span className="department-pill">{profile.department}</span>
          </div>
          <h1>{profile.name}</h1>
          <p className="profile-title">{profile.jobTitle}</p>
          <p className="profile-subtitle">
            @{profile.username} • Member since {profile.joinedDate}
          </p>
        </div>

        <div className="profile-header__actions">
          {!isEditing ? (
            <button type="button" className="primary-btn" onClick={onEdit}>
              Edit profile
            </button>
          ) : (
            <>
              <button type="button" className="secondary-btn" onClick={onCancel} disabled={saving}>
                Cancel
              </button>
              <button type="button" className="primary-btn" onClick={onSave} disabled={saving}>
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
