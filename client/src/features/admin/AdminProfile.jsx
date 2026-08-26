import { useEffect, useMemo, useState } from "react";
import "./AdminProfile.css";
import {
  adminActivity,
  adminProfile,
  adminSettings,
  adminStats,
  adminUsers,
  departments,
  roleOptions,
  timezones,
} from "./mockAdminData";
import { useAuth } from "../../context/AuthContext";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import OverviewTab from "./components/OverviewTab";
import TeamManagementTab from "./components/TeamManagementTab";
import ActivityTab from "./components/ActivityTab";
import SettingsTab from "./components/SettingsTab";
import InviteUserModal from "./components/InviteUserModal";
import ConfirmActionModal from "./components/ConfirmActionModal";
import EditableField from "./components/EditableField";

const emptyErrors = {
  name: "",
  email: "",
  phone: "",
  jobTitle: "",
  department: "",
  timezone: "",
};

export default function AdminProfile() {
  const { user: authUser } = useAuth();
  const initialProfile = { ...adminProfile, name: authUser?.name ?? adminProfile.name, email: authUser?.email ?? adminProfile.email };
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [avatarPreview, setAvatarPreview] = useState(adminProfile.avatarUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUserId, setPendingUserId] = useState(null);
  const [errors, setErrors] = useState(emptyErrors);
  const [settings, setSettings] = useState(adminSettings);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesDepartment = departmentFilter === "All" || user.department === departmentFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
  }, [users, search, roleFilter, departmentFilter, statusFilter]);

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

  const togglePermission = (role) => {
    setSettings((current) => ({
      ...current,
      permissions: {
        ...current.permissions,
        [role]: !current.permissions[role],
      },
    }));
  };

  const handleInviteSubmit = (value) => {
    setUsers((current) => [
      {
        id: `u-${Date.now()}`,
        name: value.name,
        email: value.email,
        role: value.role,
        department: value.department,
        status: value.status,
        avatarUrl: "",
      },
      ...current,
    ]);
    setInviteOpen(false);
    setToast("Invitation sent.");
  };

  const handleToggleStatus = (userId) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user,
      ),
    );
  };

  const handleRemoveUser = () => {
    setUsers((current) => current.filter((user) => user.id !== pendingUserId));
    setConfirmOpen(false);
    setPendingUserId(null);
    setToast("User removed.");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewTab stats={adminStats} profile={profile} />;
      case "Team Management":
        return (
          <TeamManagementTab
            users={filteredUsers}
            search={search}
            setSearch={setSearch}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onInvite={() => setInviteOpen(true)}
            onEditRole={(user) => {
              const nextRole = window.prompt("Select a new role:", user.role);
              if (!nextRole || !nextRole.trim()) return;
              setUsers((current) =>
                current.map((item) =>
                  item.id === user.id ? { ...item, role: nextRole.trim() } : item,
                ),
              );
              setToast("Role updated.");
            }}
            onToggleStatus={handleToggleStatus}
            onRemove={(userId) => {
              setPendingUserId(userId);
              setConfirmOpen(true);
            }}
            roleOptions={roleOptions}
            departments={departments}
          />
        );
      case "Activity":
        return <ActivityTab activities={adminActivity} />;
      case "Settings":
        return (
          <SettingsTab
            settings={settings}
            onToggleNotification={toggleNotification}
            onTogglePermission={togglePermission}
            isSaving={saving}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="admin-profile-page">
      <div className="page-shell">
        <header className="page-kicker">Projects</header>
        <h1 className="page-title">Admin Profile</h1>

        <ProfileHeader
          profile={profile}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          saving={saving}
          onAvatarChange={handleAvatarChange}
        />

        <div className="profile-card">
          <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

          {isEditing && (
            <section className="edit-panel">
              <div className="edit-panel__header">
                <h2>Profile details</h2>
              </div>
              <div className="edit-form-grid">
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
                  label="Phone"
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
                <div className="edit-form-grid__full">
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
          )}

          {!isEditing && renderTabContent()}
        </div>
      </div>

      <InviteUserModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onSubmit={handleInviteSubmit}
        roles={roleOptions}
      />

      <ConfirmActionModal
        isOpen={confirmOpen}
        title="Remove this user?"
        message="This user will be permanently removed from the workspace team list."
        confirmLabel="Remove user"
        onConfirm={handleRemoveUser}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingUserId(null);
        }}
      />

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
