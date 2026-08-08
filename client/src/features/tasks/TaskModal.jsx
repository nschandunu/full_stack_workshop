// @ts-check
// @ts-ignore
import styles from "./TaskModal.module.css";

/**
 * @typedef {import("../../lib/types.jsx").Task} Task
 */

/**
 * @param {Object} props
 * @param {Task | null} props.task
 * @param {() => void} props.onClose
 */
export default function TaskModal({ task, onClose }) {
  if (!task) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{task.title}</h2>
        {task.description && (
          <p className={styles.description}>{task.description}</p>
        )}
        <hr className={styles.divider} />
        <div className={styles.metaGroup}>
          <div>Priority: {task.priority}</div>
          {task.dueDate && <div>Due Date: {task.dueDate.slice(0, 10)}</div>}
          {task.assignee && <div>Assignee: {task.assignee}</div>}
        </div>
        <hr className={styles.divider} />
        <div className={styles.muted}>
          <div>Created: {task.createdAt.slice(0, 10)}</div>
          <div>Updated: {task.updatedAt.slice(0, 10)}</div>
        </div>
      </div>
    </div>
  );
}
