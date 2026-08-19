import { useMemo } from 'react';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function useTaskAnalytics(tasks, columns) {
  return useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const totalTasks = tasks.length;

    /* ---- column distribution ---- */
    const statusCounts = tasks.reduce(
      (acc, task) => {
        const status = columns.some((col) => col.id === task.status) ? task.status : 'todo';
        acc[status] += 1;
        return acc;
      },
      { todo: 0, doing: 0, done: 0 },
    );

    const columnDistribution = [
      { label: 'To Do', key: 'todo', count: statusCounts.todo, color: '#e0e0e0' },
      { label: 'Doing', key: 'doing', count: statusCounts.doing, color: '#f5b800' },
      { label: 'Done', key: 'done', count: statusCounts.done, color: '#0f172a' },
    ];

    /* ---- completion rate ---- */
    const completionPercentage = totalTasks === 0
      ? 0
      : Math.round((statusCounts.done / totalTasks) * 100);

    /* ---- priority breakdown ---- */
    const priorityCounts = tasks.reduce(
      (acc, task) => {
        const priority = (task.priority ?? 'medium').toLowerCase();
        const key = ['high', 'medium', 'low'].includes(priority) ? priority : 'medium';
        acc[key] += 1;
        return acc;
      },
      { high: 0, medium: 0, low: 0 },
    );

    const priorityBreakdown = [
      { label: 'High', key: 'high', count: priorityCounts.high, color: '#f0555a' },
      { label: 'Medium', key: 'medium', count: priorityCounts.medium, color: '#f5b800' },
      { label: 'Low', key: 'low', count: priorityCounts.low, color: '#afd4f5' },
    ];

    /* ---- workload by assignee ---- */
    const workloadMap = tasks.reduce((acc, task) => {
      const assignee = task.assignee?.trim() || 'Unassigned';
      acc[assignee] = (acc[assignee] ?? 0) + 1;
      return acc;
    }, {});

    const workload = Object.entries(workloadMap)
      .map(([assignee, count]) => ({ assignee, count }))
      .sort((a, b) => b.count - a.count || a.assignee.localeCompare(b.assignee));

    const maxWorkload = Math.max(...workload.map((w) => w.count), 1);

    /* ---- overdue tasks ---- */
    const overdueTasks = tasks
      .map((task) => {
        if (task.status === 'done') return null;
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        if (!dueDate || Number.isNaN(dueDate.getTime())) return null;
        const daysOverdue = Math.floor((today - dueDate) / DAY_IN_MS);
        if (daysOverdue <= 0) return null;
        return { ...task, daysOverdue };
      })
      .filter(Boolean)
      .sort((a, b) => b.daysOverdue - a.daysOverdue);

    return {
      totalTasks,
      statusCounts,
      columnDistribution,
      completionPercentage,
      priorityCounts,
      priorityBreakdown,
      workload,
      maxWorkload,
      overdueTasks,
    };
  }, [tasks, columns]);
}
