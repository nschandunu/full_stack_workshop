// @ts-check
import styles from "./TaskCard.module.css";
import { TaskPriority } from "../../lib/types.jsx";

/**
 * @typedef {import("../../lib/types.jsx").Task} Task
 */

/**
 * @param {Object} props
 * @param {Task} props.task
 * @param {(taskId: string) => void} props.onOpen
 */

export default function TaskCard({ task, onOpen }) {
  const badgeClass =
    task.priority === TaskPriority.enum.high
      ? styles.badgeHigh
      : task.priority === TaskPriority.enum.medium
        ? styles.badgeMedium
        : styles.badgeLow;

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(task.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(task.id);
        }
      }}
    >
      <div className={styles.title}>{task.title}</div>
      <span className={`${styles.badge} ${badgeClass}`}>{task.priority}</span>
      {task.dueDate && <div>{task.dueDate.slice(0, 10)}</div>}
      {task.assignee && <div>{task.assignee}</div>}
    </div>
  );
}