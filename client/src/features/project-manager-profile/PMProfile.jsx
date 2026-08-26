import { useEffect, useMemo, useState } from "react";
import "./PMProfile.css";
import {
  departments,
  pmActivity,
  pmProfile,
  pmProjects,
  pmSettings,
  pmStats,
  pmTeam,
  timezones,
} from "./mockPMData";
import { useAuth } from "../../context/AuthContext";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import OverviewTab from "./components/OverviewTab";
import MyProjectsTab from "./components/MyProjectsTab";
import TeamTab from "./components/TeamTab";
import ActivityTab from "./components/ActivityTab";
import SettingsTab from "./components/SettingsTab";
import EditableField from "./components/EditableField";
import Toast from "./components/Toast";

const emptyErrors = {
  name: "",
  email: "",
  phone: "",
  jobTitle: "",
  department: "",
  timezone: "",
};

export default function PMProfile() {
  const { user: authUser } = useAuth();
  const initialProfile = { ...pmProfile, name: authUser?.name ?? pmProfile.name, email: authUser?.email ?? pmProfile.email };
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [avatarPreview, setAvatarPreview] = useState(pmProfile.avatarUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [loadingTab, setLoadingTab] = useState(true);
  const [projects] = useState(pmProjects);
  const [team] = useState(pmTeam);
  const [settings, setSettings] = useState(pmSettings);
  const [errors, setErrors] = useState(emptyErrors);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    setLoadingTab(true);
    const timer = window.setTimeout(() => setLoadingTab(false), 300);
    return () => window.clearTimeout(timer);
  }, [activeTab]);

  const totalTasks = useMemo(
    () => projects.reduce((sum, project) => sum + Math.max(project.progress, 0), 0),
    [projects],
  );

  const validateProfile = (currentDraft = draft) => {
    const nextErrors = { ...emptyErrors };

    if (!currentDraft.name.trim()) nextErrors.name = "Full name is required.";
    if (!currentDraft.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(currentDraft.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!currentDraft.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9()\-\s]{7,}$/.test(currentDraft.phone.trim())) {
      nextErrors.phone = "Use a valid phone format.";
    }
    if (!currentDraft.jobTitle.trim()) nextErrors.jobTitle = "Job title is required.";
    if (!currentDraft.department.trim()) nextErrors.department = "Department is required.";
    if (!currentDraft.timezone.trim()) nextErrors.timezone = "Timezone is required.";

    return nextErrors;
  };

  const handleEdit = () => {
    setDraft(profile);
    setAvatarPreview(profile.avatarUrl);
    setErrors(emptyErrors);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(profile);
    setAvatarPreview(profile.avatarUrl);
    setErrors(emptyErrors);
    setIsEditing(false);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleAvatarChange = (nextValue) => {
    setAvatarPreview(nextValue);
    setDraft((current) => ({ ...current, avatarUrl: nextValue }));
  };

  const handleSave = () => {
    const nextErrors = validateProfile();
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setToast("Please fix the highlighted fields.");
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setProfile({ ...draft, avatarUrl: avatarPreview || draft.avatarUrl });
      setSaving(false);
      setIsEditing(false);
      setToast("Profile saved successfully.");
    }, 900);
  };

  const toggleNotification = (key) => {
    setSettings((current) => ({
      ...current,
      notifications: {
        ...current.notifications,
        [key]: !current.notifications[key],
      },
    }));
  };

  const renderSkeleton = () => (
    <div className="pm-tab-panel pm-skeletons">
      <div className="pm-skeleton-grid">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="pm-skeleton-card" />
        ))}
      </div>
    </div>
  );

  const renderTabPanel = () => {
    if (loadingTab) return renderSkeleton();

    switch (activeTab) {
      case "Overview":
        return <OverviewTab stats={pmStats} />;
      case "My Projects":
        return <MyProjectsTab projects={projects} />;
      case "Team":
        return <TeamTab members={team} />;
      case "Activity":
        return <ActivityTab activity={pmActivity} />;
      case "Settings":
        return <SettingsTab settings={settings} onToggleNotification={toggleNotification} />;
      default:
        return null;
    }
  };

  return (
    <main className="pm-profile-page">
      <div className="pm-page-shell">
        <p className="pm-page-kicker">Projects</p>
        <h1 className="pm-page-title">Project Manager Profile</h1>

        <ProfileHeader
          profile={profile}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          saving={saving}
          onAvatarChange={handleAvatarChange}
        />

        <div className="pm-profile-card">
          <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

          {isEditing ? (
            <section className="pm-edit-panel">
              <div className="pm-edit-panel__title">
                <h2>Project manager details</h2>
              </div>

              <div className="pm-edit-form-grid">
                <EditableField
                  label="Full name"
                  name="name"
                  value={draft.name}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  error={errors.name}
                  required
                />
                <EditableField
                  label="Email"
                  name="email"
                  type="email"
                  value={draft.email}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  error={errors.email}
                  required
                />
                <EditableField
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={draft.phone}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  error={errors.phone}
                  required
                />
                <EditableField
                  label="Job title"
                  name="jobTitle"
                  value={draft.jobTitle}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  error={errors.jobTitle}
                  required
                />
                <EditableField
                  label="Department"
                  name="department"
                  value={draft.department}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  error={errors.department}
                  as="select"
                  options={departments}
                  required
                />
                <EditableField
                  label="Timezone"
                  name="timezone"
                  value={draft.timezone}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  error={errors.timezone}
                  as="select"
                  options={timezones}
                  required
                />
                <div className="pm-edit-form-grid__full">
                  <EditableField
                    label="Bio"
                    name="bio"
                    value={draft.bio}
                    isEditing={isEditing}
                    onChange={handleFieldChange}
                    as="textarea"
                    rows={4}
                  />
                </div>
              </div>
            </section>
          ) : (
            renderTabPanel()
          )}
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </main>
  );
}
