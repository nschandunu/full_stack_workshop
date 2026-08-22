import React, { useState } from "react";
import AvatarUploader from "./AvatarUploader";

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

/**
 * ProfileHeader – sticky top section with cover strip, avatar, name,
 * role/department badges, job title, and edit / save / cancel controls.
 */
export default function ProfileHeader({
  profile,
  isEditing,
  isReadOnly,
  onEdit,
  onSave,
  onCancel,
  saving,
  onAvatarChange,
}) {
  const [showUploader, setShowUploader] = useState(false);

  return (
    <header className="ph-root">
      {/* Cover strip */}
      <div className="ph-cover" aria-hidden="true">
        <div className="ph-cover-pattern" />
      </div>

      <div className="ph-body">
        {/* Avatar */}
        <div className="ph-avatar-wrap">
          <button
            className="ph-avatar-btn"
            onClick={() => !isReadOnly && setShowUploader(true)}
            aria-label={isReadOnly ? "Profile photo" : "Change profile photo"}
            disabled={isReadOnly}
          >
            {profile.avatarUrl ? (
              <img
                className="ph-avatar-img"
                src={profile.avatarUrl}
                alt={`${profile.name}'s photo`}
              />
            ) : (
              <div className="ph-avatar-initials" aria-hidden="true">
                {initials(profile.name)}
              </div>
            )}
            {!isReadOnly && (
              <span className="ph-avatar-hover" aria-hidden="true">
                &#128247;
              </span>
            )}
          </button>
        </div>

        {/* Info */}
        <div className="ph-info">
          <div className="ph-badges">
            <span className="ph-badge ph-badge--role">{profile.role}</span>
            {profile.department && (
              <span className="ph-badge ph-badge--dept">{profile.department}</span>
            )}
            {isReadOnly && (
              <span className="ph-badge ph-badge--view">Viewing teammate</span>
            )}
          </div>

          <h1 className="ph-name">{profile.name}</h1>

          <p className="ph-sub">
            {profile.jobTitle || "No job title set"}
            {profile.location && (
              <span className="ph-location">
                {" "}
                &mdash; &#128205; {profile.location}
              </span>
            )}
          </p>

          <p className="ph-username">@{profile.username}</p>
        </div>

        {/* Actions */}
        <div className="ph-actions">
          {!isReadOnly && !isEditing && (
            <button className="up-btn up-btn--primary" onClick={onEdit} id="edit-profile-btn">
              Edit Profile
            </button>
          )}
          {isEditing && (
            <>
              <button
                className="up-btn up-btn--ghost"
                onClick={onCancel}
                disabled={saving}
                id="cancel-edit-btn"
              >
                Cancel
              </button>
              <button
                className={`up-btn up-btn--primary${saving ? " up-btn--loading" : ""}`}
                onClick={onSave}
                disabled={saving}
                id="save-profile-btn"
                aria-busy={saving}
              >
                {saving ? (
                  <span className="up-spinner" aria-label="Saving" />
                ) : (
                  "Save changes"
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Avatar uploader modal */}
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
