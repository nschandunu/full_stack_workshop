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
        {task.title}
      </div>
    </div>
  );
}
