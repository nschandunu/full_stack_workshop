import { useMemo } from 'react';
import { useKanban } from '../kanban/hooks/useKanban.js';
import '../kanban/kanban.css';
import '../overview.css';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const URGENCY_WINDOW_DAYS = 3;

const formatDueDate = (dueDate) => {
  if (!dueDate) {
    return 'No due date';
  }

  const parsedDate = new Date(dueDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return dueDate;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
};

const formatRelativeDays = (daysAway) => {
  if (daysAway === 0) {
    return 'Today';
  }

  if (daysAway === 1) {
    return 'Tomorrow';
  }

  if (daysAway > 1) {
    return `In ${daysAway} days`;
  }

  return `${Math.abs(daysAway)} days overdue`;
};

function OverviewPage() {
  const { tasks, columns, loading, error } = useKanban();

  const derived = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const counts = tasks.reduce(
      (accumulator, task) => {
        const status = columns.some((column) => column.id === task.status) ? task.status : 'todo';
        accumulator[status] += 1;
        return accumulator;
      },
      { todo: 0, doing: 0, done: 0 },
    );

    const totalTasks = tasks.length;
    const completionPercentage = totalTasks === 0 ? 0 : Math.round((counts.done / totalTasks) * 100);

    const workloadMap = tasks.reduce((accumulator, task) => {
      const assignee = task.assignee?.trim() || 'Unassigned';
      accumulator[assignee] = (accumulator[assignee] ?? 0) + 1;
      return accumulator;
    }, {});

    const workload = Object.entries(workloadMap)
      .map(([assignee, count]) => ({ assignee, count }))
      .sort((left, right) => right.count - left.count || left.assignee.localeCompare(right.assignee));

    const urgentTasks = tasks
      .map((task) => {
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const hasValidDueDate = dueDate && !Number.isNaN(dueDate.getTime());
        const daysUntilDue = hasValidDueDate ? Math.floor((dueDate - today) / DAY_IN_MS) : null;
        const isUrgentByPriority = (task.priority ?? '').toLowerCase() === 'high';
        const isUrgentByDate = hasValidDueDate && daysUntilDue <= URGENCY_WINDOW_DAYS;

        if (!isUrgentByPriority && !isUrgentByDate) {
          return null;
        }

        return {
          ...task,
          daysUntilDue,
          isUrgentByPriority,
          isUrgentByDate,
        };
      })
      .filter(Boolean)
      .sort((left, right) => {
        if (left.isUrgentByPriority !== right.isUrgentByPriority) {
          return Number(right.isUrgentByPriority) - Number(left.isUrgentByPriority);
        }

        if ((left.daysUntilDue ?? Number.POSITIVE_INFINITY) !== (right.daysUntilDue ?? Number.POSITIVE_INFINITY)) {
          return (left.daysUntilDue ?? Number.POSITIVE_INFINITY) - (right.daysUntilDue ?? Number.POSITIVE_INFINITY);
        }

        return left.title.localeCompare(right.title);
      });

    return { counts, completionPercentage, workload, urgentTasks };
  }, [columns, tasks]);

  if (loading) {
    return (
      <main className="overview-page overview-page--state">
        <p>Loading overview...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="overview-page overview-page--state">
        <p role="alert">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="overview-page">
      <header className="overview-page__header">
        <div>
          <p className="overview-page__eyebrow">Projects</p>
          <h1>Overview</h1>
        </div>
        <p className="overview-page__summary">
          Derived directly from the same in-memory task list used by the board.
        </p>
      </header>

      <section className="overview-grid">
        <article className="overview-panel overview-panel--summary">
          <div className="overview-panel__heading">
            <h2>Progress summary</h2>
            <p>Task counts and completion rate</p>
          </div>

          <div className="overview-summary-panel__counts">
            <span>{derived.counts.todo} To Do</span>
            <span>{derived.counts.doing} Doing</span>
            <span>{derived.counts.done} Done</span>
          </div>

          <div className="overview-summary-panel__progress" aria-label={`Completion ${derived.completionPercentage}%`}>
            <div className="overview-summary-panel__progress-bar" style={{ width: `${derived.completionPercentage}%` }} />
          </div>

          <p className="overview-summary-panel__progress-copy">{derived.completionPercentage}% complete</p>
        </article>

        <article className="overview-panel">
          <div className="overview-panel__heading">
            <h2>Team workload snapshot</h2>
            <p>Task count by assignee</p>
          </div>

          <ul className="overview-workload-list">
            {derived.workload.map((entry) => (
              <li key={entry.assignee}>
                <span>{entry.assignee}</span>
                <strong>{entry.count}</strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="overview-panel overview-panel--wide">
          <div className="overview-panel__heading">
            <h2>Priority / urgency callout</h2>
            <p>High-priority and near-due tasks</p>
          </div>

          {derived.urgentTasks.length > 0 ? (
            <ul className="overview-urgent-list">
              {derived.urgentTasks.map((task) => (
                <li key={task.id}>
                  <div className="overview-urgent-list__topline">
                    <strong>{task.title}</strong>
                    <span className={`overview-chip overview-chip--${(task.priority ?? 'medium').toLowerCase()}`}>
                      {task.priority ?? 'medium'}
                    </span>
                  </div>
                  <p>
                    {task.assignee || 'Unassigned'} · {task.dueDate ? formatDueDate(task.dueDate) : 'No due date'}
                    {task.daysUntilDue !== null ? ` · ${formatRelativeDays(task.daysUntilDue)}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="overview-panel__empty">No urgent tasks right now.</p>
          )}
        </article>
      </section>
    </main>
  );
}

export default OverviewPage;