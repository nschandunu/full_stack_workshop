import React from "react";

const fmt = (d) =>
  new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
    new Date(d)
  );

function StatCard({ label, value, tag, tagVariant = "neutral" }) {
  return (
    <div className="ot-card">
      <p className="ot-card-label">{label}</p>
      <p className="ot-card-value">{value}</p>
      {tag && (
        <span className={`ot-card-tag ot-card-tag--${tagVariant}`}>{tag}</span>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="ot-card ot-card--skeleton" aria-hidden="true">
      <div className="sk-line sk-line--sm" />
      <div className="sk-line sk-line--lg" />
      <div className="sk-line sk-line--sm" style={{ width: "40%" }} />
    </div>
  );
}

/**
 * OverviewTab – four stat cards, bio section, and quick-facts grid.
 */
export default function OverviewTab({ stats, profile, loading = false }) {
  return (
    <section
      id="panel-overview"
      role="tabpanel"
      aria-labelledby="tab-overview"
      className="ot-root"
    >
      {/* Stat cards */}
      <div className="ot-grid">
        {loading ? (
          [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard
              label="Active Projects"
              value={stats.activeProjects}
              tag="In progress"
              tagVariant="neutral"
            />
            <StatCard
              label="Tasks Completed"
              value={stats.tasksCompleted}
              tag="All time"
              tagVariant="success"
            />
            <StatCard
              label="Tasks Overdue"
              value={stats.tasksOverdue}
              tag={stats.tasksOverdue > 0 ? "Needs attention" : "All clear"}
              tagVariant={stats.tasksOverdue > 0 ? "danger" : "success"}
            />
            <StatCard
              label="Collaborators"
              value={stats.collaborators}
              tag="Across all projects"
              tagVariant="neutral"
            />
          </>
        )}
      </div>

      {/* Bio */}
      <div className="ot-section">
        <p className="ot-section-eyebrow">About</p>
        <h3 className="ot-section-heading">Bio</h3>
        {loading ? (
          <div>
            <div className="sk-line" style={{ marginBottom: 8 }} />
            <div className="sk-line" style={{ width: "80%" }} />
          </div>
        ) : profile.bio ? (
          <p className="ot-bio">{profile.bio}</p>
        ) : (
          <p className="ot-empty">No bio added yet.</p>
        )}
      </div>

      {/* Quick facts */}
      <div className="ot-section">
        <p className="ot-section-eyebrow">Details</p>
        <h3 className="ot-section-heading">Quick Facts</h3>
        <div className="ot-facts">
          {[
            { label: "Department", value: profile.department },
            { label: "Timezone", value: profile.timezone },
            { label: "Phone", value: profile.phone },
            { label: "Member since", value: profile.memberSince ? fmt(profile.memberSince) : null },
          ].map(({ label, value }) => (
            <div key={label} className="ot-fact-row">
              <span className="ot-fact-label">{label}</span>
              <span className="ot-fact-value">
                {loading ? (
                  <span className="sk-line" style={{ width: 100 }} />
                ) : (
                  value || <em className="ot-empty-inline">Not set</em>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
