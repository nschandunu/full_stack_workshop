// @ts-check
import styles from "./TaskModal.module.css";
import { useEffect } from "react";
import { TaskPriority } from "../../lib/types.jsx";

/**
 * @typedef {import("../../lib/types.jsx").Task} Task
 */

/**
 * @param {Object} props
 * @param {Task | null} props.task
 * @param {() => void} props.onClose
 */
export default function TaskModal({ task, onClose }) {
  useEffect(() => {
    if (!task) return;

    /**
     * @param {KeyboardEvent} e
     */
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [task, onClose]);

  if (!task) {
    return null;
  }

  const badgeClass =
    task.priority === TaskPriority.enum.high
      ? styles.badgeHigh
      : task.priority === TaskPriority.enum.medium
        ? styles.badgeMedium
        : styles.badgeLow;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className={styles.title}>{task.title}</h2>
        {task.description && (
          <p className={styles.description}>{task.description}</p>
        )}
        <hr className={styles.divider} />
        <div className={styles.metaGroup}>
          <div>
            Priority:{" "}
            <span className={`${styles.badge} ${badgeClass}`}>
              {task.priority}
            </span>
          </div>
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
