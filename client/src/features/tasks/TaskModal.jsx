// @ts-check

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

  return <div>{task.title}</div>;
}
