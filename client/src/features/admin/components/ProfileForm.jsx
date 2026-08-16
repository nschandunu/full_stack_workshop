import React from "react";
import EditableField from "./EditableField";
import { DEPARTMENTS, TIMEZONES } from "../mockAdminData";

/**
 * ProfileForm – Form containing all admin profile fields with View vs Edit mode toggle.
 */
export default function ProfileForm({
  profile,
  draft,
  isEditing,
  onChange,
  errors,
}) {
  const current = isEditing ? draft : profile;

  return (
    <div className="ap-form-card">
      <div className="ap-card-header">
        <p className="ap-eyebrow">ADMIN DETAILS</p>
        <h2 className="ap-card-title">
          {isEditing ? "Edit Admin Profile Info" : "Profile Overview"}
        </h2>
      </div>

      <div className="ap-form-grid">
        <EditableField
          label="Full Name"
          name="name"
          value={current.name}
          isEditing={isEditing}
          onChange={onChange}
          error={errors.name}
          required
        />

        <EditableField
          label="Email Address"
          name="email"
          type="email"
          value={current.email}
          isEditing={isEditing}
          onChange={onChange}
          error={errors.email}
          required
        />

        <EditableField
          label="Phone Number"
          name="phone"
          type="tel"
          value={current.phone || ""}
          isEditing={isEditing}
          onChange={onChange}
          error={errors.phone}
          placeholder="+1 (555) 000-0000"
        />

        <EditableField
          label="Job Title"
          name="jobTitle"
          value={current.jobTitle || ""}
          isEditing={isEditing}
          onChange={onChange}
          error={errors.jobTitle}
        />

        <EditableField
          label="Department"
          name="department"
          value={current.department || DEPARTMENTS[0]}
          isEditing={isEditing}
          onChange={onChange}
          as="select"
          options={DEPARTMENTS}
        />

        <EditableField
          label="Timezone"
          name="timezone"
          value={current.timezone || TIMEZONES[0]}
          isEditing={isEditing}
          onChange={onChange}
          as="select"
          options={TIMEZONES}
        />
      </div>

      <div className="ap-bio-section">
        <EditableField
          label="Admin Bio & Responsibilities"
          name="bio"
          value={current.bio || ""}
          isEditing={isEditing}
          onChange={onChange}
          as="textarea"
          rows={4}
          placeholder="Describe your admin responsibilities and background..."
        />
      </div>
    </div>
  );
}
