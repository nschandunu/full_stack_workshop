import React from "react";

const TYPE_META = {
  task_complete: { label: "DONE",    variant: "success" },
  comment:       { label: "COMMENT", variant: "info"    },
  task_create:   { label: "CREATED", variant: "neutral" },
  project_join:  { label: "JOINED",  variant: "neutral" },
  task_overdue:  { label: "OVERDUE", variant: "danger"  },
};

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function SkeletonItem() {
  return (
    <li className="at-item at-item--skeleton" aria-hidden="true">
      <div className="at-badge-wrap">
        <div className="sk-line" style={{ width: 60, height: 22 }} />
      </div>
      <div className="at-item-body">
        <div className="sk-line" style={{ width: "65%" }} />
        <div className="sk-line sk-line--sm" style={{ width: "35%", marginTop: 6 }} />
      </div>
    </li>
  );
}

/**
 * ActivityTab – chronological action log with type badges and timestamps.
 */
export default function ActivityTab({ activity = [], loading = false }) {
  return (
    <section
      id="panel-activity"
      role="tabpanel"
      aria-labelledby="tab-activity"
      className="at-root"
    >
      <div className="at-header">
        <p className="ot-section-eyebrow">History</p>
        <h3 className="ot-section-heading">Recent Activity</h3>
      </div>

      {loading ? (
        <ul className="at-list" aria-busy="true" aria-label="Loading activity">
          {[1, 2, 3, 4].map((i) => <SkeletonItem key={i} />)}
        </ul>
      ) : activity.length === 0 ? (
        <div className="at-empty">
          <p className="at-empty-icon" aria-hidden="true">&#128203;</p>
          <p className="at-empty-text">No activity recorded yet.</p>
        </div>
      ) : (
        <ul className="at-list">
          {activity.map((item) => {
            const meta = TYPE_META[item.type] || { label: "EVENT", variant: "neutral" };
            return (
              <li key={item.id} className="at-item">
                <div className="at-badge-wrap">
                  <span className={`at-badge at-badge--${meta.variant}`}>
                    {meta.label}
                  </span>
                </div>
                <div className="at-item-body">
                  <p className="at-desc">{item.description}</p>
                  <p className="at-meta">
                    <span className="at-project">{item.project}</span>
                    <span className="at-sep" aria-hidden="true">&middot;</span>
                    <time className="at-time" dateTime={item.timestamp}>
                      {timeAgo(item.timestamp)}
                    </time>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
