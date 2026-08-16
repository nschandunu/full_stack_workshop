import React from "react";

/**
 * EditableField – reusable input that toggles between a read-only paragraph
 * and an editable control (input | textarea | select).
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
  as = "input",       // "input" | "textarea" | "select"
  options = [],
  rows = 3,
}) {
  const id = `field-${name}`;
  const errId = `${id}-error`;

  return (
    <div className="ef-wrapper">
      <label className="ef-label" htmlFor={id}>
        {label}
        {required && (
          <span className="ef-required" aria-hidden="true"> *</span>
        )}
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
              className={`ef-control ef-textarea${error ? " ef-control--error" : ""}`}
            />
          ) : as === "select" ? (
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              aria-invalid={!!error}
              aria-describedby={error ? errId : undefined}
              className={`ef-control ef-select${error ? " ef-control--error" : ""}`}
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
              className={`ef-control${error ? " ef-control--error" : ""}`}
            />
          )}

          {error && (
            <p id={errId} className="ef-error" role="alert">
              {error}
            </p>
          )}
        </>
      ) : (
        <p className="ef-value">
          {value || <span className="ef-empty">Not set</span>}
        </p>
      )}
    </div>
  );
}
