import { useState, useEffect } from "react";
import styles from "./CreateTaskModal.module.css";

export default function CreateTaskModal({
  isOpen,
  columns = [],
  initialColumnId = "col-todo",
  onClose,
  onCreateTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState(initialColumnId);
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("user-1");
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setColumnId(initialColumnId || (columns[0]?.id ?? "col-todo"));
      setTitle("");
      setDescription("");
      setPriority("medium");
      setError("");
      setSubmitting(false);
    }
  }, [isOpen, initialColumnId, columns]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setSubmitting(true);
      await onCreateTask({
        title: title.trim(),
        description: description.trim(),
        columnId,
        priority,
        assignee,
        dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
      });
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className={styles.modalHeader}>
          <p className={styles.eyebrow}>Workspace / Task API</p>
          <h2 id="create-task-title" className={styles.title}>
            Create New Task
          </h2>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Title */}
          <div className={styles.formGroup}>
            <label htmlFor="task-title-input" className={styles.label}>
              Task Title <span className={styles.required}>*</span>
            </label>
            <input
              id="task-title-input"
              type="text"
              className={styles.input}
              placeholder="e.g. Implement WebSocket live sync"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
            />
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label htmlFor="task-desc-input" className={styles.label}>
              Description
            </label>
            <textarea
              id="task-desc-input"
              className={styles.textarea}
              placeholder="Add key deliverables, acceptance criteria, or context..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Column & Priority Row */}
          <div className={styles.row}>
            {/* Column selection */}
            <div className={styles.formGroup}>
              <label htmlFor="task-column-select" className={styles.label}>
                Column / Stage <span className={styles.required}>*</span>
              </label>
              <select
                id="task-column-select"
                className={styles.select}
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignee */}
            <div className={styles.formGroup}>
              <label htmlFor="task-assignee-select" className={styles.label}>
                Assignee
              </label>
              <select
                id="task-assignee-select"
                className={styles.select}
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                <option value="user-1">User 1 (Senuka)</option>
                <option value="user-2">User 2 (Kasun)</option>
                <option value="user-3">User 3 (Amal)</option>
                <option value="user-4">User 4 (Team)</option>
              </select>
            </div>
          </div>

          {/* Priority */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Priority</label>
            <div className={styles.priorityGroup}>
              <button
                type="button"
                className={`${styles.priorityButton} ${priority === "low" ? styles.priorityLowActive : ""}`}
                onClick={() => setPriority("low")}
              >
                Low
              </button>
              <button
                type="button"
                className={`${styles.priorityButton} ${priority === "medium" ? styles.priorityMediumActive : ""}`}
                onClick={() => setPriority("medium")}
              >
                Medium
              </button>
              <button
                type="button"
                className={`${styles.priorityButton} ${priority === "high" ? styles.priorityHighActive : ""}`}
                onClick={() => setPriority("high")}
              >
                High
              </button>
            </div>
          </div>

          {/* Due Date */}
          <div className={styles.formGroup}>
            <label htmlFor="task-due-date" className={styles.label}>
              Due Date
            </label>
            <input
              id="task-due-date"
              type="date"
              className={styles.input}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Form Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitting}
            >
              {submitting ? "Creating..." : "+ Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
