// @ts-check
import { useRef, useState } from "react";
import styles from "./TaskCard.module.css";
import { TaskPriority } from "../../lib/types.jsx";

/**
 * @typedef {import("../../lib/types.jsx").Task} Task
 */

/**
 * @param {Object} props
 * @param {Task} props.task
 * @param {(taskId: string) => void} props.onOpen
 * @param {(taskId: string, direction: -1 | 1) => void} [props.onMove]
 * @param {boolean} [props.canMoveLeft]
 * @param {boolean} [props.canMoveRight]
 */
export default function TaskCard({
  task,
  onOpen,
  onMove,
  canMoveLeft = false,
  canMoveRight = false,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOccurredRef = useRef(false);

  const badgeClass =
    task.priority === TaskPriority.enum.high
      ? styles.badgeHigh
      : task.priority === TaskPriority.enum.medium
        ? styles.badgeMedium
        : styles.badgeLow;

  const handleDragStart = (e) => {
    dragOccurredRef.current = true;
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      dragOccurredRef.current = false;
    }, 100);
  };

  const handleClick = () => {
    if (dragOccurredRef.current) return;
    onOpen(task.id);
  };

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.isDragging : ""}`}
      role="button"
      tabIndex={0}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(task.id);
        }
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.title}>{task.title}</div>
        <span className={`${styles.badge} ${badgeClass}`}>{task.priority}</span>
      </div>
      {task.dueDate && <div className={styles.metaText}>{task.dueDate.slice(0, 10)}</div>}
      {task.assignee && <div className={styles.metaText}>{task.assignee}</div>}

      <div className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
        {canMoveLeft && (
          <button
            type="button"
            className={styles.moveButton}
            onClick={(e) => {
              e.stopPropagation();
              onMove?.(task.id, -1);
            }}
            title="Move to previous column"
          >
            ← Move Left
          </button>
        )}
        {canMoveRight && (
          <button
            type="button"
            className={styles.moveButton}
            onClick={(e) => {
              e.stopPropagation();
              onMove?.(task.id, 1);
            }}
            title="Move to next column"
          >
            Move Right →
          </button>
        )}
      </div>
    </div>
  );
}