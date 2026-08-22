import { useKanban } from '../kanban/hooks/useKanban.js';
import { useTaskAnalytics } from '../hooks/useTaskAnalytics.js';
import '../analytics.css';

const DONUT_RADIUS = 42;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

function DonutChart({ segments, total }) {
  let offset = 0;

  return (
    <svg className="analytics-donut__svg" viewBox="0 0 120 120" aria-hidden="true">
      {total === 0 ? (
        <circle cx="60" cy="60" r={DONUT_RADIUS} fill="none" stroke="#e0e0e0" strokeWidth="16" />
      ) : (
        segments.map((segment) => {
          const fraction = segment.count / total;
          const dashLength = fraction * DONUT_CIRCUMFERENCE;
          const dashOffset = -offset;
          offset += dashLength;

          return (
            <circle
              key={segment.key}
              cx="60"
              cy="60"
              r={DONUT_RADIUS}
              fill="none"
              stroke={segment.color}
              strokeWidth="16"
              strokeDasharray={`${dashLength} ${DONUT_CIRCUMFERENCE - dashLength}`}
              strokeDashoffset={dashOffset}
            />
          );
        })
      )}
    </svg>
  );
}

function DonutLegend({ segments }) {
  return (
    <ul className="analytics-donut__legend">
      {segments.map((segment) => (
        <li key={segment.key}>
          <span className="analytics-donut__swatch" style={{ background: segment.color }} />
          {segment.label}
          <span className="analytics-donut__count">({segment.count})</span>
        </li>
      ))}
    </ul>
  );
}

function CompletionRing({ percentage }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="analytics-completion">
      <svg className="analytics-completion__ring" viewBox="0 0 64 64">
        <circle className="analytics-completion__track" cx="32" cy="32" r={radius} />
        <circle
          className="analytics-completion__fill"
          cx="32"
          cy="32"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="analytics-completion__text">
        <span className="analytics-completion__pct">{percentage}%</span>
        <span className="analytics-completion__label">Complete</span>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const { tasks, columns, loading, error } = useKanban();
  const analytics = useTaskAnalytics(tasks, columns);

  if (loading) {
    return (
      <main className="analytics-page analytics-page--state">
        <p>Loading analytics…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="analytics-page analytics-page--state">
        <p role="alert">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="analytics-page">
      <header className="analytics-page__header">
        <div>
          <p className="analytics-page__eyebrow">Projects</p>
          <h1>Analytics</h1>
        </div>
        <p className="analytics-page__summary">
          Live metrics derived from the in-memory task list powering the board.
        </p>
      </header>

      {/* ---- summary stats ---- */}
      <section className="analytics-stats">
        <article className="analytics-stat">
          <span className="analytics-stat__label">Total tasks</span>
          <strong className="analytics-stat__value">{analytics.totalTasks}</strong>
        </article>
        <article className="analytics-stat analytics-stat--accent">
          <span className="analytics-stat__label">Completion</span>
          <strong className="analytics-stat__value">{analytics.completionPercentage}%</strong>
        </article>
        <article className="analytics-stat">
          <span className="analytics-stat__label">In progress</span>
          <strong className="analytics-stat__value">{analytics.statusCounts.doing}</strong>
        </article>
        <article className="analytics-stat analytics-stat--danger">
          <span className="analytics-stat__label">Overdue</span>
          <strong className="analytics-stat__value">{analytics.overdueTasks.length}</strong>
        </article>
      </section>

      {/* ---- charts grid ---- */}
      <section className="analytics-grid">

        {/* column distribution donut */}
        <article className="analytics-panel">
          <div className="analytics-panel__heading">
            <h2>Column distribution</h2>
            <p>Tasks across To Do, Doing, Done</p>
          </div>
          <div className="analytics-donut">
            <DonutChart segments={analytics.columnDistribution} total={analytics.totalTasks} />
            <DonutLegend segments={analytics.columnDistribution} />
          </div>
        </article>

        {/* priority breakdown donut */}
        <article className="analytics-panel">
          <div className="analytics-panel__heading">
            <h2>Priority breakdown</h2>
            <p>High, medium, and low priority tasks</p>
          </div>
          <div className="analytics-donut">
            <DonutChart segments={analytics.priorityBreakdown} total={analytics.totalTasks} />
            <DonutLegend segments={analytics.priorityBreakdown} />
          </div>
        </article>

        {/* completion ring */}
        <article className="analytics-panel">
          <div className="analytics-panel__heading">
            <h2>Completion rate</h2>
            <p>Percentage of tasks marked done</p>
          </div>
          <CompletionRing percentage={analytics.completionPercentage} />
        </article>

        {/* workload bar chart */}
        <article className="analytics-panel analytics-panel--wide">
          <div className="analytics-panel__heading">
            <h2>Workload by assignee</h2>
            <p>Task count per team member</p>
          </div>
          <ul className="analytics-bars">
            {analytics.workload.map((entry) => (
              <li key={entry.assignee} className="analytics-bar">
                <span className="analytics-bar__label">{entry.assignee}</span>
                <div className="analytics-bar__track">
                  <div
                    className="analytics-bar__fill"
                    style={{
                      width: `${(entry.count / analytics.maxWorkload) * 100}%`,
                      background: 'var(--color-accent)',
                    }}
                  />
                </div>
                <span className="analytics-bar__count">{entry.count}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* overdue tasks */}
        <article className="analytics-panel">
          <div className="analytics-panel__heading">
            <h2>Overdue tasks</h2>
            <p>Past-due and still open</p>
          </div>
          {analytics.overdueTasks.length > 0 ? (
            <ul className="analytics-overdue-list">
              {analytics.overdueTasks.map((task) => (
                <li key={task.id}>
                  <div className="analytics-overdue-list__topline">
                    <strong>{task.title}</strong>
                    <span className="analytics-chip analytics-chip--overdue">
                      {task.daysOverdue}d overdue
                    </span>
                  </div>
                  <p>
                    {task.assignee || 'Unassigned'} · {task.priority ?? 'medium'}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="analytics-panel__empty">No overdue tasks — great work!</p>
          )}
        </article>

      </section>
    </main>
  );
}

export default AnalyticsPage;
