import React, { useCallback, useRef, useState } from "react";
import "./UserProfile.css";

import { mockUser, mockStats, mockActivity, mockSettings, TIMEZONES, DEPARTMENTS } from "./mockData";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs   from "./components/ProfileTabs";
import OverviewTab   from "./components/OverviewTab";
import ActivityTab   from "./components/ActivityTab";
import SettingsTab   from "./components/SettingsTab";
import EditableField from "./components/EditableField";

/* ── Validation ──────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\+\d\s\(\)\-]{7,20}$/;

function validateDraft(draft) {
  const e = {};
  if (!draft.name?.trim())     e.name     = "Name is required.";
  if (!draft.jobTitle?.trim()) e.jobTitle = "Job title is required.";
  if (draft.phone && !PHONE_RE.test(draft.phone))
    e.phone = "Enter a valid phone number (7–20 digits).";
  return e;
}

/* ── Component ───────────────────────────────────────────────────────────── */
export default function UserProfile({ isReadOnly = false }) {
  const [profile,   setProfile]   = useState({ ...mockUser });
  const [draft,     setDraft]     = useState(null);
  const [errors,    setErrors]    = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [settings,  setSettings]  = useState({ ...mockSettings });
  const [toast,     setToast]     = useState(null);

  const toastTimer = useRef(null);

  /* ── Toast ── */
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  /* ── Edit flow ── */
  const openEdit = () => {
    setDraft({ ...profile });
    setErrors({});
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(null);
    setErrors({});
    setIsEditing(false);
  };

  const handleDraftChange = (e) => {
    const { name, value } = e.target;
    setDraft((d) => ({ ...d, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const saveProfile = () => {
    const errs = validateDraft(draft);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    // Simulate network latency
    setTimeout(() => {
      setProfile({ ...draft });
      setDraft(null);
      setIsEditing(false);
      setSaving(false);
      showToast("Profile saved successfully!");
    }, 1100);
  };

  const handleAvatarChange = (dataUrl) => {
    if (isEditing && draft) {
      setDraft((d) => ({ ...d, avatarUrl: dataUrl }));
    } else {
      setProfile((p) => ({ ...p, avatarUrl: dataUrl }));
    }
    showToast("Photo updated!");
  };

  const displayProfile = isEditing && draft ? draft : profile;

  /* ── Render ── */
  return (
    <div className="up-page">
      <ProfileHeader
        profile={displayProfile}
        isEditing={isEditing}
        isReadOnly={isReadOnly}
        onEdit={openEdit}
        onSave={saveProfile}
        onCancel={cancelEdit}
        saving={saving}
        onAvatarChange={handleAvatarChange}
      />

      <div className="up-layout">
        {/* Edit panel — shown only during edit mode */}
        {isEditing && (
          <aside className="up-edit-panel" aria-label="Edit profile fields">
            <div className="up-edit-panel-inner">
              <p className="up-panel-eyebrow">Editing</p>
              <h2 className="up-panel-title">Profile Details</h2>
              <div className="up-panel-fields">
                <EditableField
                  label="Full name"
                  name="name"
                  value={draft.name}
                  isEditing
                  onChange={handleDraftChange}
                  error={errors.name}
                  required
                />
                <EditableField
                  label="Job title"
                  name="jobTitle"
                  value={draft.jobTitle || ""}
                  isEditing
                  onChange={handleDraftChange}
                  error={errors.jobTitle}
                  required
                />
                <EditableField
                  label="Department"
                  name="department"
                  value={draft.department || DEPARTMENTS[0]}
                  isEditing
                  onChange={handleDraftChange}
                  as="select"
                  options={DEPARTMENTS}
                />
                <EditableField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={draft.phone || ""}
                  isEditing
                  onChange={handleDraftChange}
                  error={errors.phone}
                  placeholder="+1 (555) 000-0000"
                />
                <EditableField
                  label="Timezone"
                  name="timezone"
                  value={draft.timezone || TIMEZONES[0]}
                  isEditing
                  onChange={handleDraftChange}
                  as="select"
                  options={TIMEZONES}
                />
                <EditableField
                  label="Bio"
                  name="bio"
                  value={draft.bio || ""}
                  isEditing
                  onChange={handleDraftChange}
                  as="textarea"
                  rows={4}
                  placeholder="Tell your teammates a bit about yourself…"
                />
              </div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className="up-main" id="main-content">
          <ProfileTabs active={activeTab} onChange={setActiveTab} />

          <div className="up-tab-body">
            {activeTab === "overview" && (
              <OverviewTab
                stats={mockStats}
                profile={displayProfile}
                loading={false}
              />
            )}
            {activeTab === "activity" && (
              <ActivityTab activity={mockActivity} loading={false} />
            )}
            {activeTab === "settings" && (
              <SettingsTab
                settings={settings}
                onChange={setSettings}
                isReadOnly={isReadOnly}
              />
            )}
          </div>
        </main>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`up-toast up-toast--${toast.type}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="up-toast-icon" aria-hidden="true">
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          {toast.message}
        </div>
      )}
    </div>
  );
}
