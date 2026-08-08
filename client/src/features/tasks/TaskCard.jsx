// @ts-check
// @ts-ignore
import styles from "./TaskCard.module.css";

/**
 * @typedef {import("../../lib/types.jsx").Task} Task
 */

/**
 * @param {Object} props
 * @param {Task} props.task
 * @param {(taskId: string) => void} props.onOpen
 */

export default function TaskCard({ task, onOpen }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{task.title}</div>
      <div>{task.priority}</div>
      {task.dueDate && <div>{task.dueDate.slice(0, 10)}</div>}
      {task.assignee && <div>{task.assignee}</div>}
    </div>
  );
}