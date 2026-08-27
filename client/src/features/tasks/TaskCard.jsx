// @ts-check
import { useState } from "react";
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
  const [isDragging, setIsDragging] = useState(false);

  const badgeClass =
    task.priority === TaskPriority.enum.high
      ? styles.badgeHigh
      : task.priority === TaskPriority.enum.medium
        ? styles.badgeMedium
        : styles.badgeLow;

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.isDragging : ""}`}
      role="button"
      tabIndex={0}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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