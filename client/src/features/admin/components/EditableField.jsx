import React from "react";

/**
 * EditableField – Reusable component supporting View vs Edit mode.
 * Styled with bold Kanban editorial borders and uppercase field labels.
 */
export default function EditableField({
  label,
  name,
  value,
  type = "text",
  isEditing = false,
  onChange,
  error,
  placeholder = "",
  required = false,
  as = "input", // "input" | "textarea" | "select"
  options = [],
  rows = 3,
}) {
  const id = `admin-field-${name}`;
  const errId = `${id}-err`;

  return (
    <div className="ap-field-wrap">
      <label className="ap-field-label" htmlFor={id}>
        {label}
        {required && <span className="ap-field-required" aria-hidden="true"> *</span>}
      </label>

      {isEditing ? (
        <>
          {as === "textarea" ? (
            <textarea
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              rows={rows}
              aria-invalid={!!error}
              aria-describedby={error ? errId : undefined}
              className={`ap-input ap-textarea${error ? " ap-input--error" : ""}`}
            />
          ) : as === "select" ? (
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              aria-invalid={!!error}
              aria-describedby={error ? errId : undefined}
              className={`ap-input ap-select${error ? " ap-input--error" : ""}`}
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={id}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              aria-invalid={!!error}
              aria-describedby={error ? errId : undefined}
              className={`ap-input${error ? " ap-input--error" : ""}`}
            />
          )}

          {error && (
            <p id={errId} className="ap-field-error" role="alert">
              {error}
            </p>
          )}
        </>
      ) : (
        <div className="ap-view-box">
          <p className="ap-view-value">
            {value || <span className="ap-view-empty">Not set</span>}
          </p>
        </div>
      )}
    </div>
  );
}
