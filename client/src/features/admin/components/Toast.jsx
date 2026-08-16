import React from "react";

/**
 * Toast – Notification toast banner for success/error messages.
 */
export default function Toast({ message, type = "success" }) {
  if (!message) return null;

  return (
    <div
      className={`ap-toast ap-toast--${type}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="ap-toast-icon" aria-hidden="true">
        {type === "success" ? "✓" : "✕"}
      </span>
      <span>{message}</span>
    </div>
  );
}
