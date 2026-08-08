// @ts-check

/**
 * @typedef {import("../../lib/types.jsx").Task} Task
 */

/**
 * @param {Object} props
 * @param {Task} props.task
 * @param {(taskId: string) => void} props.onOpen
 */

export default function TaskCard({ task, onOpen }) {
  return <div>{task.title}</div>;
}